/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */  startWork,  abort,  createResources,
  createResponseState,
  createRootFormatContext,
} from 'react-dom-bindings/src/server/ReactFizzConfigDOMLegacy';import {Readable} from 'stream';type ServerOptions = {
  identifierPrefix?: string,
};class ReactMarkupReadableStream extendsstartedFlowing: boolean;
  constructor() {
// Calls the stream.Readable(options) constructor. Consider exposing built-in
// features like highWaterMark in the future.
super({});this.startedFlowing = false;  _destroy(err, callback) {
abort(this.request);
ca  _read(size) {
if (this.startedFlowing) {
  startFlowing(this.request, this);
}
  }
}function onError() {
  // Non-fatal errors are ignored.
}function renderToNodeStreamImpl(
  children: ReactNodeList,
  o): Readable {
  function onAllReady() {
// We wait until everything has loaded before starting to write.
// That way we only end up with fully resolved HTML even if we suspend.
des  }
  const destination = new ReactMarkupReadableStream();
  const resources = createResources();
  const request = createRequest(
children,
resources,
c  false,
  options ? options.identifierPrefix : undefined,
)Infinity,
onError,
onAllReady,
undefined,
undefined,
  );
  destination.request = request;
  startWork(request);
  return destination;
}function renderToNodeStream(
  children: ReactNodeList,
  options?: ServerOptions,
): Readable {
  if (__DEV__) {
console.error(
  'renderToNodeStream is deprecated. Use renderToPipeableStream instead.',
);
  }
  return renderToNodeStreamImpl(children, options, false);
}function renderToStaticNodeStream(
  children: ReactNodeList,
  options?: ServerOptions,
): Readable {
  return renderToNodeStreamImpl(children, options, true);
}export {renderToNodeStream, renderToStaticNodeStream};
