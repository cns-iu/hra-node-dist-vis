import { colorCategories } from '@deck.gl/carto';
import { COORDINATE_SYSTEM, Deck, OrbitView } from '@deck.gl/core';
import { LineLayer, PointCloudLayer } from '@deck.gl/layers';
import { batch, computed, effect, signal } from '@preact/signals-core';
import { ScaleBarLayer } from '@vivjs/layers';
import cartocolor from 'cartocolor';
import Papa from 'papaparse';
import DistanceEdgesWorker from './distance-edges.worker.js';

async function fetchCsv(url, papaOptions = {}) {
  return new Promise((resolve) => {
    Papa.parse(url, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      ...papaOptions,
      worker: true,
      download: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
}

function delay(t, val) {
  return new Promise((resolve) => setTimeout(resolve, t, val));
}

async function distanceEdges(nodes, type_field, target_type, maxDist) {
  const worker = new DistanceEdgesWorker();
  return new Promise((resolve) => {
    worker.onmessage = (e) => {
      if (e.data.status === 'processing') {
        console.log(`Computing edges; ${e.data.percentage}% complete.`);
      } else if (e.data.status === 'complete') {
        resolve(e.data.edges);
        worker.terminate();
      }
    };
    worker.postMessage({ nodes, type_field, target_type, maxDist });
  });
}

const template = document.createElement('template');
template.innerHTML = `<style>
#vis {
  width: 100%;
  height: 100%;
  position: relative !important;
}
</style>
<canvas id="vis"></canvas>
`;

class HraNodeDistanceVisualization extends HTMLElement {
  static observedAttributes = [
    'nodes',
    'edges',
    'color-map',
    'color-map-key',
    'color-map-value',
    'node-target-key',
    'node-target-value',
    'max-edge-distance',
  ];
  nodesUrl = signal();
  nodesData = signal();
  edgesUrl = signal();
  edgesData = signal();
  colorMapUrl = signal();
  colorMapData = signal();
  colorMapKey = signal();
  colorMapValue = signal();
  nodeTargetKey = signal();
  nodeTargetValue = signal();
  maxEdgeDistance = signal();
  viewState = signal();
  toDispose = [];
  initialized = false;
  edgesVersion = 0;

  nodes = signal([]);
  nodes$ = computed(async () => {
    let nodes = [];
    if (this.nodesData.value) {
      nodes = this.nodesData.value;
    } else if (this.nodesUrl.value) {
      nodes = await fetchCsv(this.nodesUrl.value);
    }

    for (const node of nodes) {
      node.position = [node.x ?? 0, node.y ?? 0, node.z ?? 0];
    }
    return nodes;
  });

  edges = signal([]);
  edges$ = computed(async () => {
    const nodes = this.nodes.value;
    const version = (this.edgesVersion += 1);

    if (nodes.length === 0) {
      return undefined;
    } else if (this.edgesData.value) {
      return this.edgesData.value;
    }

    const url = this.edgesUrl.value;
    await delay(100);
    if (version !== this.edgesVersion) {
      return undefined;
    }

    let edges = [];
    if (url) {
      edges = await fetchCsv(url, { header: false });
    } else {
      const nodeKey = this.nodeTargetKey.value;
      const nodeValue = this.nodeTargetValue.value;
      const maxDist = this.maxEdgeDistance.value;
      console.log('start', new Date());
      edges = await distanceEdges(nodes, nodeKey, nodeValue, maxDist);
      console.log('end', new Date());
    }

    return version === this.edgesVersion ? edges : undefined;
  });

  colorCoding = signal();
  colorCoding$ = computed(async () => {
    const nodes = this.nodes.value;
    let data;
    let colorDomain = [];
    let colorRange = [];
    if (this.colorMapData.value) {
      data = this.colorMapData.value;
    } else if (this.colorMapUrl.value) {
      data = await fetchCsv(this.colorMapUrl.value);
    }

    if (data) {
      for (const row of data) {
        colorDomain.push(row[this.colorMapKey.value]);
        const color = row[this.colorMapValue.value];
        if (Array.isArray(color)) {
          colorRange.push(color)
        } else if (color?.startsWith('[')) {
          colorRange.push(JSON.parse(color));
        } else {
          colorRange.push([255, 255, 255]);
        }
      }
    } else if (nodes.length > 0) {
      const nodeKey = this.nodeTargetKey.value;
      const nodeValues = new Set();
      for (const node of nodes) {
        nodeValues.add(node[nodeKey]);
      }
      colorDomain = Array.from(nodeValues).sort();
      const maxColors = Math.max(2, Math.min(11, colorDomain.length)) + '';
      const colorSchemes = Object.keys(cartocolor).filter((c) => cartocolor[c][maxColors]);
      colorRange = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
    } else {
      return undefined;
    }

    return {
      range: colorRange,
      create: (attr) =>
        colorCategories({
          attr,
          domain: colorDomain,
          colors: colorRange,
          othersColor: [255, 255, 255],
          nullColor: [255, 255, 255],
        }),
    }
  });

  positionScaling = computed(() => {
    let minDimSize = Number.MAX_VALUE;
    let maxDimSize = Number.MIN_VALUE;
    for (const node of this.nodes.value) {
      maxDimSize = Math.max(maxDimSize, ...node.position);
      minDimSize = Math.min(minDimSize, ...node.position);
    }
    const dimDifference = maxDimSize - minDimSize;
    const scale = ([x, y, z]) => [
      (x - minDimSize) / dimDifference,
      1 - (y - minDimSize) / dimDifference,
      (z - minDimSize) / dimDifference
    ];
    return (attr) => {
      return (d) => scale(attr(d));
    };
  });

  nodesLayer = computed(() => {
    if (this.colorCoding.value && this.nodes.value.length > 0) {
      const nodeKey = this.nodeTargetKey.value;
      return new PointCloudLayer({
        id: 'nodes',
        data: this.nodes.value,
        getPosition: this.positionScaling.value((d) => d.position),
        getColor: this.colorCoding.value.create((d) => d[nodeKey]),
        pickable: true,
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        pointSize: 1.5,
        updateTriggers: {
          getColor: this.colorCoding.value.range
        },
      });
    } else {
      return undefined;
    }
  });

  edgesLayer = computed(() => {
    if (this.colorCoding.value && this.edges.value.length > 0) {
      const nodeKey = this.nodeTargetKey.value;
      const nodes = this.nodes.value;
      return new LineLayer({
        id: 'edges',
        data: this.edges.value,
        getSourcePosition: this.positionScaling.value(([node_index, sx, sy, sz, tx, ty, tz]) => [sx, sy, sz]),
        getTargetPosition: this.positionScaling.value(([node_index, sx, sy, sz, tx, ty, tz]) => [tx, ty, tz]),
        getColor: this.colorCoding.value.create(([node_index]) => nodes[node_index][nodeKey]),
        pickable: false,
        coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
        getWidth: 1,
        updateTriggers: {
          getColor: this.colorCoding.value.range
        },
      });
    } else {
      return undefined;
    }
  });

  scaleBarLayer = computed(() => {
    return this.nodes.value.length > 0
      ? new ScaleBarLayer({
          id: 'scalebar',
          unit: 'µm',
          size: 1 / this.positionScaling.value(() => [1, 1, 1])()[0], // Scale 1µm the same way positions are scaled
          position: 'top-right',
          viewState: { ...this.viewState.value, width: this.$canvas.width - 136, height: this.$canvas.height - 32 },
          length: 0.1,
          snap: true,
        })
      : undefined;
  });

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.appendChild(template.content.cloneNode(true));
    this.$canvas = root.getElementById('vis');
    this.$canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  dispatch(eventName, payload = undefined) {
    let event;
    if (payload) {
      event = new CustomEvent(eventName, { detail: payload });
    } else {
      event = new Event(eventName);
    }
    this.dispatchEvent(event);
  }

  async connectedCallback() {
    let isHovering = false;
    let hoveredObject = undefined;
    this.deck = new Deck({
      canvas: this.$canvas,
      controller: true,
      views: [new OrbitView({ id: 'orbit', orbitAxis: 'Y' })],
      initialViewState: {
        orbitAxis: 'Y',
        camera: 'orbit',
        zoom: 9,
        minRotationX: -90,
        maxRotationX: 90,
        rotationX: 0,
        rotationOrbit: 0,
        dragMode: 'rotate',
        target: [0.5, 0.5],
      },
      onClick: (e) => e.picked ? this.dispatch('nodeClicked', e.object) : undefined,
      onViewStateChange: ({ viewState }) => (this.viewState.value = viewState),
      onLoad: () => (this.viewState.value = this.deck.viewState),
      onHover: (e) => {
        isHovering = e.picked;
        if (isHovering) {
          if (hoveredObject !== e.object) {
            this.dispatch('nodeHovering', e.object);
            hoveredObject = e.object;
          }
        } else {
          if (hoveredObject) {
            this.dispatch('nodeHovering', undefined);
            hoveredObject = undefined;
          }
        }
      },
      getCursor: (e) => (isHovering ? 'pointer' : e.isDragging ? 'grabbing' : 'grab'),
      layers: [],
    });

    this.trackDisposal(
      effect(() => {
        const layers = [this.nodesLayer.value, this.edgesLayer.value, this.scaleBarLayer.value].filter((l) => !!l);
        this.deck.setProps({ layers });
      })
    );

    this.trackDisposal(
      effect(async () => {
        this.nodes.value = [];
        this.nodes.value = await this.nodes$.value;
        this.dispatch('nodes', this.nodes.value);
      })
    );

    this.trackDisposal(
      effect(async () => {
        this.edges.value = [];
        const edges = await this.edges$.value;
        if (edges) {
          this.edges.value = edges;
          this.dispatch('edges', this.edges.value);
        }
      })
    );

    this.trackDisposal(
      effect(async () => {
        const colorCoding = await this.colorCoding$.value;
        if (colorCoding) {
          this.colorCoding.value = colorCoding;
        }
      })
    );

    batch(() => {
      this.nodesUrl.value = this.getAttribute('nodes');
      this.edgesUrl.value = this.getAttribute('edges');
      this.colorMapUrl.value = this.getAttribute('color-map');
      this.colorMapKey.value = this.getAttribute('color-map-key') || 'cell_type';
      this.colorMapValue.value = this.getAttribute('color-map-value') || 'cell_color';
      this.nodeTargetKey.value = this.getAttribute('node-target-key');
      this.nodeTargetValue.value = this.getAttribute('node-target-value');
      this.maxEdgeDistance.value = parseFloat(this.getAttribute('max-edge-distance'));
      this.initialized = true;
    });
  }

  attributesLookup = {
    nodes: this.nodesUrl,
    edges: this.edgesUrl,
    'color-map': this.colorMapUrl,
    'color-map-key': this.colorMapKey,
    'color-map-value': this.colorMapValue,
    'node-target-key': this.nodeTargetKey,
    'node-target-value': this.nodeTargetValue,
    'max-edge-distance': this.maxEdgeDistance,
  };

  attributeChangedCallback(name, _oldValue, newValue) {
    if (this.initialized) {
      if (name === 'max-edge-distance' && typeof newValue === 'string') {
        newValue = parseFloat(newValue);
      }
      this.attributesLookup[name].value = newValue;
    }
  }

  trackDisposal(disposable) {
    this.toDispose.push(disposable);
  }

  disconnectedCallback() {
    this.toDispose.forEach((dispose) => dispose());
    this.toDispose = [];
  }
}

window.customElements.define('hra-node-dist-vis', HraNodeDistanceVisualization);
