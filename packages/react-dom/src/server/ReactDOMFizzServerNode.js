/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */import type {Writable} from 'stream';
import type {BootstrapScriptDescriptor} from 'react-dom-bindings/src/server/ReactFizzConfigDOM';
import type {Destination} from 'react-server/src/ReactServerStreamConfigNode';import ReactVersion from 'shared/ReactVersion';import {
  createRequest,
  startWork,  abort,  createResources,
  createResponseState,
  createRootFormatContext,
} from 'react-dom-bindings/src/server/ReactFizzConfigDOM';function createDrainHandler(destination: Destination, request: Request) {
  return () => startFlowing(request, destination);
}function createAbortHandler(request: Requ  return () => abort(request, new Error(reason));
}type Options = {
  identifierPrefix?: string,
  namespaceURI?: string,
  nonce?: string,  bootstrapScripts?: Array<string | BootstrapScriptDescriptor>,
  bootstrapModules?: Array<string | BootstrapScriptDescriptor>,
onShellError?: (error: mixed) => void,
  onAllReady?: () => void,
  onError?: (error: mixed) => ?string,
// Cancel any pending I/O and put anything remaining into
  // client rendered mode.
  abort(reason: mixed): void,
  pipe<T: Writable>(destination: T): T,
};function createRequestImpl(children: ReactNodeList, options: void | Options) {
  const resources = createResources();
  return createRequest(
children,
resources,
createResponseState(
  resources,
  options ? options.identifierPrefix : undefined,
  options ? options.nonce : undefined,
options ? options.bootstrapModules : undefined,
  options ? options.unstable_externalRuntimeSrc : undefined,
),
createRootFormatContext(options ? options.namespaceURI : undefined),
options ? options.progressiveChunkSize : undefined,
opoptions ? options.onShellReady : undefined,
options ? options.onShellError : undefined,
undefined,
  );
}function renderToPipeableStream(
  children: ReactNodeList,
  options?: Options,
): PipeableStream {
  const request = createRequestImpl(children, options);
  let hasStartedFlowing = false;
  startWork(request);
  return {
pipe<T: Writable>(destination: T): T {
  if (hasStartedFlowing) {
throw new Error(
  'React currently only supports piping to one writable stream.',
);
  }
  hasStartedFlowing = true;
  startFlowing(request, destination);
  destination.on('drain', createDrainHandler(destination, request));
  destination.on(
'  request,
  'The destination stream errored while writing data.',
),
  );
  destination.on(
'close',
createAbortHandler(request, 'The destination stream closed early.'),
  );
  return destination;
},
abort(reason: mixed) {
  abort(request, reason);
},
  };
}export {renderToPipeableStream, ReactVersion as version};
