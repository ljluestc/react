/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */  createRequest,
  startWork,  abort,  createResources,  createRootFormatContext,
} from 'react-dom-bindings/src/server/ReactFizzConfigDOM';type Options = {
  identifierPrefix?: string,
  namespaceURI?: string,
  bootstrapScriptContent?: string,
  bootstrapScripts?: Array<string | Bootst  progressiveChunkSize?: number,
  signal?: AbortSignal,
  onError?: (error: mixed) => ?string,
  unstable_externalRuntimeSrc?: string | BootstrapScriptDescriptor,
};type StaticResult = {};function createFakeWritable(readable: any): Writable {
  // The current host config expects a Writable so we create
  // a fake writable for now to push into the Readable.
  return ({
write(chunk) {
  return readable.push(chunk);
},
end() {
  readable.push(null);
},
de},
  }: any);
}f  options?: Options,
): Promise<StaticResult> {
  return new Promise((resolve, reject) => {
const onFatalError = reject;function onAllReady() {
  const readable: Readable = new Readable({
read() {
  startFlowing(request, writable);
},
  });
  const writable = createFakeWritable(readable);  const result = {
prelude: readable,
  };
  resolve(result);
}
c  children,
  resources,
  createResponseState(
resources,
options ? options.identifierPrefix : undefined,
undefined,options ? options.bootstrapScripts : undefined,
options ? options.bootstrapModules : undefined,
options ? options.unstable_externalRuntimeSrc : undefined,
  ),
  createRootFormatContext(options ? options.namespaceURI : undefined),
  options ? options.progressiveChunkSize : undefined,
  options ? options.onError : undefined,  undefined,
  undefined,
  onFatalError,
);
if (options && options.signal) {
  const signal = options.signal;
  if (signal.aborted) {
abort(request, (signal: any).reason);
  } else {
const listener = () => {
  abort(request, (signal: any).reason);
  signal.removeEventListener('abort', listener);
};
signal.addEventListener('abort', listener);
  }
}
startWork(request);
  });
}export {prerenderToNodeStreams, ReactVersion as version};
