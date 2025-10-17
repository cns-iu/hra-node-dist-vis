import { createReadStream } from 'fs';
import { createGunzip } from 'zlib';
import Papa from 'papaparse';

export async function* readLines(inputFile) {
  let inputStream = !inputFile || inputFile === '-' ? process.stdin : createReadStream(inputFile, { autoClose: true });
  if (inputFile?.endsWith('.gz')) {
    inputStream = inputStream.pipe(createGunzip());
  }
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  for await (const chunk of inputStream) {
    buffer += decoder.decode(chunk, { stream: true });
    let lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      yield line;
    }
  }
  if (buffer.length > 0) {
    yield buffer;
  }
}

export async function* readCsv(input, options = { skipEmptyLines: true, header: true }) {
  if (options.header) {
    let header;
    const newOpts = { ...options, header: false };
    for await (const line of readLines(input)) {
      const row = Papa.parse(line, newOpts)?.data ?? [];
      if (row) {
        if (!header) {
          header = row[0];
        } else {
          const result = {};
          for (let i = 0; i < header.length; i++) {
            result[header[i]] = row[0][i];
          }
          yield result;
        }
      }
    }
  } else {
    return createReadStream(input).pipe(Papa.parse(Papa.NODE_STREAM_INPUT, options));
  }
}
