import { Readable } from 'stream'

/**
 * Converts a Node.js Readable into a web ReadableStream of Uint8Array.
 *
 * The returned stream yields the same chunks produced by `nodeStream`. Chunks
 * that are strings are converted to `Uint8Array` via `Buffer.from`; non-string
 * chunks are passed through as-is. If the underlying iterator throws, the
 * Node stream is destroyed and the web stream is error signaled. Cancelling
 * the web stream destroys the underlying Node stream.
 *
 * @param nodeStream - The Node.js Readable to adapt into a web ReadableStream
 * @returns A `ReadableStream<Uint8Array>` that mirrors `nodeStream`'s output
 */
export function nodeToWebStream(nodeStream: Readable): ReadableStream<Uint8Array> {
  const reader = nodeStream[Symbol.asyncIterator]();
  return new ReadableStream({
    async pull(controller) {
      try {
        const { value, done } = await reader.next();
        if (done) {
          controller.close();
        } else {
          controller.enqueue(typeof value === 'string' ? Buffer.from(value) : value);
        }
      } catch (err) {
        nodeStream.destroy();
        controller.error(err);
      }
    },
    cancel() {
      nodeStream.destroy();
    },
  });
}