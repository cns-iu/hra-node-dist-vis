import { distanceEdges } from './distance-edges.js';

onmessage = function (msg) {
  const { nodes, type_field, target_type, maxDist } = msg.data;
  const edges = new Array(nodes.length);
  let index = 0;
  const reportStep = Math.floor(nodes.length / 10);
  for (const edge of distanceEdges(nodes, type_field, target_type, maxDist)) {
    edges[index] = edge;
    if (index % reportStep === 0) {
      const percentage = Math.round((index / nodes.length) * 100);
      postMessage({ status: 'processing', percentage, node_index: edge[0] });
    }
    index++;
  }
  postMessage({ status: 'complete', edges: edges.slice(0, index) });
};
