/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */};function renderToString(  options?: ServerOptions,  return renderToStringImpl(
children,
op'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server',
  );
}function renderToStaticMarkup(
  children: ReactNodeList,
  options?: ServerOptions,
): string {
  return renderToStringImpl(
children,
options,
true,
'}function renderToNodeStream() {
  throw new Error(
'ReactDOMServer.renderToNodeStream(): The streaming API is not available ' +
  'in the browser. Use ReactDOMServer.renderToString() instead.',
  );
}function renderToStaticNodeStream() {
  throw new Error(
'ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available ' +
  'in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.',
  );
}  renderToStaticMarkup,
  renderToNodeStream,
  renderToStaticNodeStream,
  version,
};
