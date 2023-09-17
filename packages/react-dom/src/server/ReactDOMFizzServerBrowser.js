/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */  createRequest,
  startWork,  abort,  createResources,
  createResponseState,
  createRootFormatContext,
} from 'react-dom-bindings/src/server/ReactFizzConfigDOM';type Options = {
  identifierPrefix?: string,
  namespaceURI?: string,  bootstrapScriptContent?: string,
  bootstrapScripts?: Array<string | BootstrapScriptDescriptor>,
  bootstrapModules?: Array<string | BootstrapScriptDescriptor>,
  progressiveChunkSize?: number,
  signal?: AbortSignal,  unstable_externalRuntimeSrc?: string | BootstrapScriptDescriptor,
};// TODO: Move to sub-classing ReadableStream.
type ReactDOMServerReadableStream = ReadableStream & {
  allReady: Promise<void>,
};function renderToReadableStream(
  children: ReactNodeList,
  options?: Options,
): Promise<ReactDOMServerReadableStream> {
  return new Promise((resolve, reject) => {
let onFatalError;
let onAllReady;
  onFatalError = rej;
});function onShellReady() {
const stream: ReactDOMServerReadableStream = (new ReadableStream(
{pull: (controller): ?Promise<void> => {
startFlowing(request, controller);
},
cancel: (reason): ?Promise<void> => {
abort(request);
},
},
// $FlowFixMe[prop-missing] size() methods are not allowed on byte streams.
{highWaterMark: 0},
): any);
// TODOresolve(stream);
}
function onShellError(error: mixed) {
// If the shell errors the caller of `renderToReadableStream` won't have access to `allReady`.
// However, `allReady` will be rejected by `onFatalError` as well.
// So we need to catch the duplicate, uncatchable fatal error in `allReady` to prevent a `UnhandledPromiseRejection`.
allReady.catch(() => {});
reject(error);
}
const resources = createResources();
const request = createRequest(
children,
resources,
createResponseState(
resources,
options ? options.identifierPrefix : undefined,
options ? options.nonce : undefined,
options ? options.bootstrapScriptContent : undefined,
options ? options.bootstrapScripts : undefined,
options ? options.bootstrapModules : undefined,
options ? options.unstable_externalRuntimeSrc : undefined,
),
createRootFormatContext(options ? options.namespaceURI : undefined),
options ? options.progressiveChunkSize : undefined,
options ? options.onError : undefined,
onAllReady,
onShellReady,
onShellError,
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
}export {renderToReadableStream, ReactVersion as version};
