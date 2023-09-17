/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */let ReactDOMS  doc.open();
  doc.write(
markup ||  );
  doc.close();
  return doc;
}describe('rendering React components at document', () => {
  beforeEach(() => {
jest.resetModules();React = require('react');
ReactDOM = require('react-dom');
ReactDOMServer = require('react-dom/server');
  });  describe('with new explicit hydration API', () => {
 render() {
return (
<html> <title>Hello World</title>
</head>
<body>{'Hello ' + this.props.hello}</body>
</htm}
}const markup = ReactDOMServer.renderToString(<Root hello="world" />);
expect(markup).not.toContain('DOCTYPE');
const testDocument = getTestDocument(markup);
const body = testDocument.body;ReactDOM.hydrate(<Root hello="world" />, testDocument);
expect(testDocument.body.innerHTML).toBe('Hello world');ReactDOM.hydrate(<Root hello="moon" />, testDocument);
expect(testDocument.body.innerHTML).toBe('Hello moon');expect(body === testDocument.body).toBe(true);
});// @gate enableHostSingletons
it('should be able to unmount component from document node, but leaves singleton nodes intact', () => {
class Root extends React.Component {
render() {
return (
<html>
<</head>
<body>Hello world</body>
</html>
);}const markup = ReactDOMServer.renderToString(<Root />);
const testDocument = getTestDocument(markup);expect(testDocument.body.innerHTML).toBe('Hello world');const originalDocEl = testDocument.documentElement;
const originalHead = testDocument.head;ReactDOM.unmountComponentAtNode(testDocument);
expect(expect(testDocument.body).toBe(originalBody);
expect(originalBody.firstChild).toEqual(null);
expect(originalHead.firstChild).toEqual(null);
});// @gate !enableHostSingletons
it('should be able to unmount component from document node', () => {
class Root extends React.Component {
render() {
return (
<html>
<head>
 <title>Hello World</title>
</head>
<body>Hello world</body>
<}
}const markup = ReactDOMServer.renderToString(<Root />);
const testDocument = getTestDocument(markup);
ReactDOM.hydrate(<Root />, testDocument);ReactDOM.unmountComponentAtNode(testDocument);
expect(testDocument.firstChild).toBe(null);
});it('should not be able to swrender() {
return (
<html>
<head>
 <title>Hello World</title>
</head>
<body>Hello world</body>
</html>}
}class Component2 extends React.Component {
render() {
return (
<html>
<head>
 <title>Hello World</title>
</head>
<body>Goodbye world</body>
</html>
);
}
}const markup = ReactDOMServer.renderToString(<Component />);
c});it('should be able to mount into document', () => {
class Component extends React.Component {
render() {
return (<head>
 <title>Hello World</title>
</head>
<body>{);
}
}const markup = ReactDOMServer.renderToString(
<Component text="Hello world" />,
);
const testDocument = getTestDocument(markup);ReactDOM.hydrate(<Component text="Hello world" />, testDocument);expect(testDocument.body.innerHTML).toBe('Hello world');
});it('cannot render over an existing text child at the root', () => {
const container = document.createElement('div');
container.textContent = 'potato';
expect(() => ReactDOM.hydrate(<div>parsnip</div>, container)).toErrorDev(
'Expected server HTML to contain a matching <div> in <div>.',
);
/});it('renders over an existing nested text child without throwing', () => {
const container = document.createElement('div');
const wrapper = document.createElement('div');
wrapper.textContent = 'potato';
container.appendChild(wrapper);
expect(() =>
ReactDOM.hydrate(
<div>
<div>parsnip</div>
</div>,
container,
)'Expected server HTML to contain a matching <div> in <div>.',
);});it('should give helpful errors on srender() {<html>
<head></head>
<body>{);
}
}const markup = ReactDOMServer.renderToString(
<Component text="Goodbye world" />,
);
const testDocument = getTestDocument(markup);expect(() =>
ReactDOM.hydrate(<Component text="Hello world" />, testDocument),
).toErrorDev('Warning: Text content did not match.');
expect(testDocument.body.innerHTML).toBe('Hello world');
});it('should render w/ no markup to full document', () => {
const testDocument = getTestDocument();class Component extends React.Component {
render() {
r<head>
 <title>Hello World</title>
</head>
<body>{this.props.text}</body>);}if (gate(flags => flags.enableFloat)) {
// withReactDOM.hydrate(<Component text="Hello world" />, testDocument),
).toErrorDev(
'Expected server HTML to contain a matching text node for "Hello world" in <body>',
);
} else {
// getTestDocument() has an extra <meta> that we didn't render.
expect(() =>
ReactDOM.hydrate(<Component text="Hello world" />, testDocument),
).toErr);
}
expect(testDocument.body.innerHTML).toBe('Hello world');
});it('supports findDOMNode on full-page components', () => {
const tree = (
<html>
<head>
<title>Hello World</title>
</head>
<body>Hello world</body>
</html>
);const markup = ReactDOMServer.renderToString(tree);
const testDocument = getTestDocument(markup);
const component = ReactDOM.hydrate(tree, testDocument);
expect(testDocument.body.innerHTML).toBe('Hello world');
expect(ReactDOM.findDOMNode(component).tagName).toBe('HTML');
});});
