import { Readable } from 'stream'

export function nodeToWebStream(nodeStream: Readable): ReadableStream<Uint8Array> {
  const reader = nodeStream[Symbol.asyncIterator]();
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await reader.next();
      if (done) {
        controller.close();
      } else {
        controller.enqueue(typeof value === 'string' ? Buffer.from(value) : value);
      }
    },
    cancel() {
      nodeStream.destroy();
    },
  });
}
