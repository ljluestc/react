/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */const PropTypcontainer = document.createElement('div');
document.body.appendChild(container);
  });  afterEach(() => {container = null;
jest.restoreAllMconst Box = ({value}) => <div>{value}</div>;ReactDOM.render(<Box value="foo" />, container);
expect(container.textContent).toEqual('foo');
  });  it('should render numbers as children', () => {
const// mounting phase
let called = false;
ReactDOM.render(<div>Foo</div>, container, () => (called = true));
expect(called).toEqual(true);// updating phase
calleexpect(called).toEqual(true);
  });  it('should call a callback argument wrender() {
return <div>Foo</div>;
}const element = <Foo />;// mounting phase
let called = false;expect(called).toEqual(true);// updating phaseReactDOM.unstable_batchedUpdates(() => {
Reactexpect(called).toEqual(true);
  });  it('should render a component returning strings directly from render', () => {
const Text = ({value}) => value;ReactDOM.render(<Text value="foo" />, container);
expect(container.textContent).toEqual('foo');
  });  it('should render a co  });  it('finds the DOM Text node of a string child', () => {
class Text extends React.Component {
render() {
return this.props.value;
}ReactDOM.render(
<Text value="foo" ref={ref => (instance = ref)} />,
container,
);const textNode = ReactDOM.findDOMNode(instance);
expect(textNode).toBe(container.firstChild);
expect(textNode.nodeType).toBe(3);
expect(textNode.nodeValuclass Fragment extends React.Component {
render() {
return [<div key="a" />, <span key="b" />];
}ReactDOM.render(<Fragment ref={ref => (instance = ref)} />, container);expect(container.childNodes.length).toBe(2);const firstNode = ReactDOM.findDOMNode(instance);
expect(firstNode).toBe(container.firstChild);
expect(firstNode.tagName).toBe('DIV');
  });  it('finds the first child even when fragment is nested', () => {
class Wrapper extends React.Component {
render() {
retur}class Fragment extends React.Component {
render() {<Wrapper key="a">
<div />
</Wra];
}ReactDOM.render(<Fragment ref={ref => (instance expect(firstNode.tagName).toBe('DIV');
  });render() {
return null;
}
}class Fragment extends React.Component {
render() {
r}let instance = null;
ReactDOM.render(<Fragment ref={ref => (instance = ref)} />, container);expect(container.childNodes.length).toBe(2);const firstNode = ReactDOM.findDOMNode(instance);
expect(firstNode).toBe(container.firstChild);
expect(firstNode.tagName).toBe('DIV');
  const EmptyFragment = () => <></>;
const NonEmptyFragment = () => (
<>
<Div />
</>expect(container.firstChild).toBe(null);ReactDOM.render(<NonEmptyFragment />, container);
expect(container.firstChild.tagName).toBe('DIV');ReactDOM.render(<EmptyFragment />, container);
expect(container.firstChild).toBe(null);ReactDOM.render(<Div />, container);
expect(container.firstChild.tagName).toBe('DIV');ReactDOM.render(<EmptyFragment />, container);
expect(container.firstChild).toBe(null);
const expectHTML = {ref: el => htmlEls.push(el)};
  const expectMath = {ref: el => mathEls.push(el)};  const usePortal =};  const assertNamespacesMatch = functionsvgEls = [];
htmlEls = [];
mathEls = [];ReactDOM.render(tree, testContainer);
svgEl});
htmlEls.forEach(el => {
expect(el.namespaceURI).toBe('http://www.w3.org/1999/xhtml');
});
mathEls.forEach(el => {
eexpect(testContainer.innerHTML).toBe('');
  };  it('should render one portal', () => {
const portalContainer = document.createElement('div');ReactDOM.render(
<div>{ReactDOM.createPortal(<div>portal</div>, portalContainer)}</div>,
container,
);
expect(portalContainer.innerHTML).toBe('<div>portal</div>');
expect(container.innerHTML).toBe('<div></div>');ReactDOM.unmountComponentAtNode(container);
expect(portalContainer.innerHTML).toBe('');
econst portalContainer1 = document.createElement('div');
const portalContainer2 = document.createElement('div');const ops = [];componentDidMount() {}
componentDidUpdate() {
ops.push(`${this.props.name} componentDidUpdate`);
}ops.push(`${this.props.name} componentWillUnmount`);
}
render() {
return <div>{this.props.name}</div>;
}
}ops.push(`Parent:${this.props.step} componentDidMount`);
}
componentDidUpdate() {
ops.push(`Parent:${this.props.step} componentDidUpdate`);
}ops.push(`Parent:${this.props.step} componentWillUnmount`);
}const {step} = this.props;<Child key="a" name={`normal[0]:${step}`} />,
ReactDOM.createPortal(
<Child key="b" name={`portal1[0]:${step}`} />,
porta<Child key="c" name={`normal[1]:${step}`} />,
ReactDOM.createPortal(
[
<Child key="d" name={`portal2[0]:${step}`} />,
<Child key="e" name={`portal2[1]:${step}`} />,
],
portalContainer2,
),}
}ReactDOM.render(<Parent step="a" />, coexpect(portalContainer2.innerHTML).toBe(
'<div>portal2[0]:a</div><div>portal2[1]:a</div>',expect(container.innerHTML).toBe(
'<div>normal[0]:a</div><div>normal[1]:a<expect(ops).toEqual([
'normal[0]:a componentDidMount','normal[1]:a componentDidMount',
'portal2[0]:a componentDidMount',
'port]);ops.length = 0;
ReactDOM.render(<Parent step="b" />, container);
expect(portalContainer1.innerHTML).toBe('<div>portal1[0]:b</div>');
expect(portalContainer2.innerHTML).toBe();
expect(container.innerHTML).toBe(
'<diexpect(ops).toEqual([
'normal[0]:b componentDidUpdate',
'portal1[0]:b componentDidUpdate',
'normal[1]:b componentDidUpdate',
'portal2[0]:b'Parent:b componentDidUpdate',
]);ops.length = 0;
ReactDOM.unmountComponentAtNode(container);
expect(portalContainer1.innerHTML).toBe('');
expect(portalContainer2.innerHTML).toBe('');
expect(container.innerHTML).toBe('');
expect(ops).toEqual([
'Parent:b componentWillUnmount',
'normal[0]:b componentWillUnmount',
'po'portal2[0]:b componentWillUnmount',
'portal2[1]:b componentWillUnmount',
]);const portalContainer1 = document.createElement('div');
const portalContainer2 = document.createElement('div')[
<div key="a">normal[0]</div>,
ReactDOM.createPortal(
[
<div key="b">portal1[0]</div>,
ReactDOM.createPortal(portalContainer2,
),
ReactDOM.createPortal(
<div ),
<div key="e">portal1[1]</div>,
],),
<div key="f">normal[1]</div>,
],
container,
);
expect(portalContainer1.innerHTML).toBe(
'<div>portal1[0]</div><div>portal1[1]</div>',
);
expect(portalContainer2.innerHTML).toBe('<div>portal2[0]</div>');
expect(portalContainer3.innerHTML).toBe('<div>portal3[0]</div>');
expect(container.innerHTML).toBe(
'<div>normal[0]</div><div>normal[1]</div>',
);ReactDOM.unmountComponentAtNode(container);
expect(portalContainer1.innerHTML).toBe('');
eexpect(container.innerHTML).toBe('');
  });  it('should reconcile portal children', () => {
const portalContainer = document.createElement('div');ReactDOM.render(
<div>{ReactDOM.createPortal(<div>portal:1</div>, portalContainer)}</div>,
container,
);
expect(portalContainer.innerHTML).toBe('<div>portal:1</div>');
expect(container.innerHTML).toBe('<div></div>');ReactDOM.render(
<div>{ReactDOM.createPortal(<div>portal:2</div>, portalContainer)}</div>,
container,
);
expect(portalContainer.innerHTML).toBe('<div>portal:2</div>');
expect(container.innerHTML).toBe('<div></div>');ReactDOM.render(
<div>{ReactDOM.createPortal(<p>portal:3</p>, portalContainer)}</div>,
container,
);
expect(portalContainer.innerHTML).toBe('<p>portal:3</p>');
expect(container.innerHTML).toBe('<div></div>');ReactDOM.render(
<div>{ReactDOM.createPortal(['Hi', 'Bye'], portalContainer)}</div>,
container,
);
expect(portalContainer.innerHTML).toBe('HiBye');
expect(container.innerHTML).toBe('<div></div>');ReactDOM.render(
<div>{ReactDOM.createPortal(['Bye', 'Hi'], portalContainer)}</div>,
container,
);
expect(portalContainer.innerHTML).toBe('ByeHi');
expect(container.innerHTML).toBe('<div></div>');ReactDOM.render(
<);
expect(portalContainer.innerHTML).toBe('');
expect(container.innerHTML).toBe('<div></div>');
  });  it('should unmount empty portal component wherever it appears', () => {
const portalContainer = document.createElement('div');class Wrapper extends React.Component {
constructor(props) {
super(props);
this.state = {
show: true,
};
}
render() {
return (
<div>
{this.state.show && (
<> <div>child</div>
</>
)}
<div>parent</div>
</div>
);
}
}const instance = ReactDOM.render(<Wrapper />, container);
expect(container.innerHTML).toBe(
'<div><div>child</div><div>parent</div></div>',
);
instance.setState({show: false});
expect(instance.state.show).toBe(false);
expect(container.innerHTML).toBe('<div><div>parent</div></div>');
  });  it('should keep track of namespace across portals (simple)', () => {
assertNamespacesMatch(
<sv{usePortal(<div {...expectHTML} />)}
<image {...expectSVG} />
</svg>,
);
assertNamespacesMatch(
<math {...expectMath}>
<mi {...expectMath} />
{usePortal(<div {...expectHTML} />)}
<mi {...expectMath} />
</math>,
);
assertNamespacesMatch(
<div {...expectHTML}>
<p {.<svg {...expectSVG}>
<image {...expectSVG} />
</svg>,
)}</div>,
);
  });  it('should keep track of namespace across portals (medium)', () => {
assertNamespacesMatch(
<svg {...expectSVG}>
<image {...expectSVG} />
{usePortal(<div {...expectHTML} />)}
<image {...expectSVG} />
{usePortal(<div {...expectHTML} />)}
<image {...expectSVG} />
</svg>,
);
assertNamespacesMatch(
<div {...expectHTML}>
<math {...expectMath}>
<mi {...expectMath} />
{usePortal(
<svg {...expectSVG}>
<image {...expectSVG} />
</svg>,
)}
</math>
<p {...expectHTML} />
</div>,
);
assertNamespacesMatch(
<math {...expectMath}>
<mi {...expectMath} />
{usePortal(
<s<foreignObject {...expectSVG}>
<p {...expectHTML} />
<math {...expectMath}>
 <mi {...expectMath} />
</math>
<p {.<image {...expectSVG} />
</svg>,<mi {...expectMath} />
</math>,
);
assertNamespacesMatch(
<div {...expectHTML}>
{usePortal({usePortal(<div {...expectHTML} />)}
<image {...expectSVG} />
</svg>,
)}
<p {...expectHTML} />
</div>,assertNamespacesMatch(
<svg {...expectSVG}>
<svg {...expectSVG}>
{usePortal(<div {...expectHTML} />)}
<image {...expectSVG} />
</svg></svg>,
);
  });  it('should keep track of namespace across portals (complex)', () => {
assertNamespacesMatch(
<div {...expectHTML}>
{usePortal(<image {...expectSVG} />
</svg>,
)}
<p {...expectHTML} />
<svg {...expectSVG}>
<image {...expectSVG} /><svg {...expectSVG}>
<svg {...expectSVG}>
<image {...expectSVG} />
</svg>
<image {...expectSVG} />
</svg>
<p {.);
assertNamespacesMatch(<svg {...expectSVG}>
<svg {...expectSVG}>
<image {...expectSVG} />
{usePortal(
<svg {...expectSVG}>
 <image {...expectSVG} />
 <svg {...expectSVG}>
<image {...expectSVG} />
 </svg>
 <image {...expectSVG} />
</svg>,
)}
<image {...expectSVG} />
<foreignObject {...expectSVG}>
<p {...expectHTML} />
{usePortal(<p {...expectHTML} />)}
<p {...expectHTML} />
</foreignObject>
</svg>
<image {...expectSVG} />
<</div>,
);
assertNamespacesMatch(
<div {...expectHTML}>
<svg {...expectSVG}>
<foreignObject {...expectSVG}>
<p {...expectHTML} />
{useP <image {...expectSVG} />
 <svg {...expectSVG}>
<image {...expectSVG} />
<foreignObject {...expectSVG}>
<p {...expectHTML} />
</foreignObject>
{usePortal(<p {...expectHTML} />)}
 </svg>
 <image {...expectSVG} />
</svg>,
)}
<p {...expectHTML} />
</foreignObject>
<image {...expectSVG} />
</svg>
<p {...expectHTML} />
</div>,
);
  });  it('should unwind namespaces on uncaught errors', () => {
function BrokenRender() {
throw new Error('Hello');
}expect(() => {
assertNamespacesMatch(
<svg {...expectSVG}>
<BrokenRender />
</svg>,
);assertNamespacesMatch(<div {...expectHTML} />);
  });  it('should unwind namespaces on caught errors', () => {
function BrokenRender() {
throw new Error('Hello');
}class ErrorBoundary extends React.Component {
state = {error: null};
componentDidCatch(error) {
this.setState({error});
}
render() {
if (this.state.error) {
return <p {...expectHTML} />;
}
return this.props.children;
}
}assertNamespacesMatch(
<svg {...expectSVG}>
<foreignObject {...expectSVG}>
<ErrorBoundary>
<math {...expectMath}>
<BrokenRender />
</math>
</ErrorBoundary>
</foreignObject>
<image {...expectSVG} />
</svg>,
);
assertNamespacesMatch(<div {...expectHTML} />);
  });  it('should unwind namespaces on caught errors in a portal', () => {
function BrokenRender() {
throw new Error('Hello');
}class ErrorBoundary extends React.Component {
state = {error: null};
componentDidCatch(error) {
this.setState({error});
}
render() {
if (this.state.error) {
return <image {...expectSVG} />;
}
return this.props.children;
}
}assertNamespacesMatch(
<svg {...expectSVG}>
<ErrorBoundary>
{usePortal(
<div {...expectHTML}>
<math {...expectMath}>
 <BrokenRender />)
</math>
</div>,
)}
</ErrorBoundary>
{usePortal(<div {...expectHTML} />)}
</svg>,
);
  });  // @gate !disableLegacyContext
  it('should pass portal context when rendering subtree elsewhere', () => {
const portalContainer = document.createElement('div');class Component extends React.Component {
static contextTypes = {
foo: PropTypes.string.isRequired,
};render() {
retur}class Parent extends React.Component {
static childContextTypes = {
foo: PropTypes.string.isRequired,
};getChildContext() {
return {
foo: 'bar',
};
}render() {
return ReactDOM.createPortal(<Component />, portalContainer);
}
}ReactDOM.render(<Parent />, container);
expect(container.innerHTML).toBe('');
expect(portalContainer.innerHTML).toBe('<div>bar</div>');
  });  // @gate !disableLegacyContext
  it('should update portal context if it changes due to setState', () => {
const portalContainer = document.createElement('div');class Component extends React.Component {
static contextTypes = {
foo: PropTypes.string.isRequired,
getFoo: PropTypes.func.isRequired,
};render() {
return <div>{this.context.foo + '-' + this.context.getFoo()}</div>;
}
}class Parent extends React.Component {
static childContextTypes = {
foo: PropTypes.string.isRequired,
getFoo: PropTypes.func.isRequired,
};state = {
bar: 'initial',
};getChildContext() {
return {
foo: this.state.bar,
getFoo: () => this.state.bar,
};
}render() {
return ReactDOM.createPortal(<Component />, portalContainer);
}
}const instance = ReactDOM.render(<Parent />, container);
expect(portalContainer.innerHTML).toBe('<div>initial-initial</div>');
expect(container.innerHTML).toBe('');
instance.setState({bar: 'changed'});
expect(portalContainer.innerHTML).toBe('<div>changed-changed</div>');
expect(container.innerHTML).toBe('');
  });  // @gate !disableLegacyContext
  it('should update portal context if it changes due to re-render', () => {
const portalContainer = document.createElement('div');class Component extends React.Component {
static contextTypes = {
foo: PropTypes.string.isRequired,
getFoo: PropTypes.func.isRequired,
};render() {
return <div>{this.context.foo + '-' + this.context.getFoo()}</div>;
}
}class Parent extends React.Component {
static childContextTypes = {
foo: PropTypes.string.isRequired,
getFoo: PropTypes.func.isRequired,
};getChildContext() {
return {
foo: this.props.bar,
getFoo: () => this.props.bar,
};
}render() {
return ReactDOM.createPortal(<Component />, portalContainer);
}
}ReactDOM.render(<Parent bar="initial" />, container);
expect(portalContainer.innerHTML).toBe('<div>initial-initial</div>');
expect(container.innerHTML).toBe('');
ReactDOM.render(<Parent bar="changed" />, container);
expect(portalContainer.innerHTML).toBe('<div>changed-changed</div>');
expect(container.innerHTML).toBe('');
  });  it('findDOMNode should find dom element after expanding a fragment', () => {
class MyNode extends React.Component {
render() {
retur: [<span key="b" />, <div key="a" />];
}
}const myNodeA = ReactDOM.render(<MyNode />, container);
cexpect(myNodeA === myNodeB).toBe(true);const b = ReactDOM.findDOMNode(myNodeB);
expect(b.tagName).toBe('SPAN');
  });  it('should bubble events from the portal to the parent', () => {
const portalContainer = document.createElement('div');
document.body.appendChild(portalContainer);
try {
const ops = [];
let portal = null;ReactDOM.render(
<div <div
onClick={() => ops.push('portal clicked')}
ref={n => (portal = n)}>
portaportalContainer,
)}
</div>,
container,
);expect(portal.tagName).toBe('DIV');portal.click();expect(ops).toEqual(['portal clicked', 'parent clicked']);
} finally {
document.body.removeChild(portalContainer);
}
  });  it('should not onMouseLeave when staying in the portal', () => {
const portalContainer = document.createElement('div');
document.body.appendChild(portalContainer);let ops = [];
llet thirdTarget = null;function simulateMouseMove(from, to) {
if (from) {
from.dispatchEvent(
new MouseEvent('mouseout', {
bubbles: true,
cancelable: true,
relatedTarget: to,
}),
);
}
if (to) {
to.dispatchEvent(
new MouseEvent('mouseover', {
bubblrelatedTarget: from,
}),
);
}ReactDOM.render(
<div>
<div
onMouseEnter={() => ops.push('enter parent')}
onMouseLeave={() => ops.push('leave parent')}>
<div ref={n => (firstTarget = n)} />
{ReactDOM.createPortal(
<div
 onMouseEnter={() => ops.push('enter portal')}
 onMouseLeave={() => ops.push('leave portal')}
 ref={n => (secondTarget = n)}>
 portportalContainer,
)}
</div>
<div ref={n => (thirdTarget = n)} />
</div>,
container,
);simulateMouseMove(null, firstTarget);
expect(ops).toEqual(['enter parent']);ops = [];simulateMouseMove(firstTarget, secondTarget);
expect(ops).toEqual([
// Parent did not invoke leave because we're still inside the portal.
'enter portal',
]);ops = [];simulateMouseMove(secondTarget, thirdTarget);
expect(ops).toEqual([
'leave portal',
'leav} finally {
document.body.removeChild(portalContainer);
}  it('does not fire mouseEnter twice when relatedTarget is the root node', () => {
let ops = [];
let target = null;function simulateMouseMove(from, to) {
ifnew MouseEvent('mouseout', {
bubbles: true,
cancelable: true,
relat);
}
if (to) {
tobubbles: true,
cancelable: true,
relatedTarget: from,
}),
)}ReactDOM.render(
<div
ref={n => (target = n)}
onMou/>,
container,
);simulateMouseMove(null, container);
eexpect(ops).toEqual(['enter']);ops = [];
simulateMouseMove(target, container);
expect(ops).toEqual(['leave']);ops = [];expect(ops).toEqual([]);
  });  it('listens to events that do not exist in the Portal subtree', () => {
const onClick = jest.fn();const ref = React.createRef();
ReactDOM.render(
<d</div>,
container,
);
c});
ref.current.dispatchEvent(event);expect(onClick).toHaveBeenCalledTimes(1);
  });  it('should throw on bad createPortal argument', () => {
expect(() => {
Reexpect(() => {
ReactDOM.createPortal(<div>portal</div>, document.createTextNode('hi'));
class Example extends React.Component {
render() {
return <div onClick="woops" />;
}
}
 'in div (at **)\n' +
'in Example (at **)',
);
  });render() {
return <div onClick={false} />;
}
}
expect(() => ReactDOM.render(<Example />, container)).toErrorDev(
'Expected `onClick` listener to be a function, instead got `false`.\n\n' +
'If y'in div (at **)\n' +
'in Example (at **)',
);spyOnDev(console, 'error');let ops = [];
const handlerA = () => ops.push('A');
const handlerB = () => ops.push('B');function click() {
const event = new MouseEvent('click', {
bu});
Object.defineProperty(event, 'timeStamp', {
value: 0,
});}class Example extends React.Component {
state = {flip: false, count: 0};
flip() {
this.setState({flip: true, count: this.state.count + 1});
}this.setState({count: this.state.count + 1});
}
render() {
const useB = !this.props.forceA && this.state.flip;
return <div onClick={useB ? handlerB : handlerA} />;
}constructor() {
super();
node.click();
}return null;
}
}let inst;
ReactDOM.render([<Example key="a" ref={n => (inst = n)} />], container);
const node = container.firstChild;
expect(node.tagName).toEqual('DIV');click();expect(ops).toEqual(['A']);
oops = [];// Rerender without changing any props.
inst.tick();click();expect(ops).toEqual(['B']);
ops = [];// Render a flip back to the A handler. The second component invokes the
// click handler during render to simulate a click during an aborted
// render. I use this hack because at current time we don't have a way to
// test aborted ReactDOM renders.
ReactDOM.render(
[<Exa);// Because the new click handler has not yet committed, we should still
// invoke B.
expect(ops).toEqual(['B']);click();
expect(ops).toEqual(['A']);if (__DEexpect(console.error.mock.calls[0][0]).toMatch(
'ReactDOM.render is no longer supported in React 18',
);'ReactDOM.render is no longer supported in React 18',
);
}
  });  it('should not crash encountering low-priority tree', () => {
ReactDOM.render(
<div hidden={true}</div>,
container,
);
  });  it('should not warn when rendering into an empty container', () => {
ReactDOM.render(<div>foo</div>, container);
expect(container.innerHTML).toBe('<div>foo</div>');
ReactDOM.render(null, container);
expect(container.innerHTML).toBe('');
ReactDOM.render(<div>bar</div>, container);
expect(container.innerHTML).toBe('<div>bar</div>');
  });  it('should warn when replacing a container which was manually updated outside of React', () => {
// when not messing with the DOM outside of React
expect(container.innerHTML).toB// we knowcontainer.innerHTML = '<div>MEOW.</div>';expect(() => {
expect(() =>
ReactDOM.render(<div key="2">baz</div>, container),
).toErrorDev(
'rend'removed without using React. This is not supported and will ' +
'cause errors. Instead, call ReactDOM.unmountComponentAtNode ' +
'to empty a container.',);
}).toThrowError();
  });  it('should warn when doing an update to a container manually updated outside of React', () => {
// when not messing witReactDOM.render(<div>bar</div>, container);
expect(container.innerHTML).toBe('<div>bar</div>');
// then we mess with the DOM before an update
container.innerHTML = '<div>MEOW.</div>';
expect(() => ReactDOM.render(<div>baz</div>, container)).toErrorDev(
'render(...): ' +
'It looks like the React-rendered content of this container was ' +
'removed without using React. This is not supported and will ' +
'cause errors. Instead, call ReactDOM.unmountComponentAtNode ' +
'to empty a container.',
{withoutStack: true},
);
  });  it('should warn when doing an update to a container manually cleared outside of React', () => {
// when not messing with the DOM outside of React
ReactDOM.render(<div>foo</div>, container);
ReactDOM.render(<div>bar</div>, container);
expect(container.innerHTML).toBe('<div>bar</div>');
// then we mess with the DOM before an update
container.innerHTML = '';
e'It looks like the React-rendered content of this container was ' +
'removed without using React. This is not supported and will ' +
'cause errors. Instead, call ReactDOM.unmountComponentAtNode ' +
'to empty a container.',
{withoutStack: true},
);
  });  it('should render a text component with a text DOM node on the same document as the container', () => {
// 1. Create a new document through the use of iframe
// 2. Set up the spy to make asserts when a text component
//is rendered inside the iframe container
const textContent = 'Hello world';
const iframe = document.createElement('iframe');
document.body.appendChild(iframe);
const iframeDocument = iframe.contentDocument;
iframeDocument.write(
'<!DOCTYPE html><html><head></head><body><div></div></body></html>',
);
iframeDocument.close();
const iframeContainer = iframeDocument.body.firstChild;let actualDocument;
let textNode;spyOnDevAndProd(iframeContainer, 'appendChild').mockImplementation(node => {
ac});ReactDOM.render(textContent, iframeContainer);expect(textNode.textContent).toBe(textContent);
expect(actualDocument).not.toBe(doexpecconst fragment = document.createDocumentFragment();
ReactDOM.render(<div>foo</div>, fragment);
expect(container.innerHTML).toBe('');
container.appendChild(fragment);
it('sholet didCallOnChange = false;class Child extends React.Component {
state = {};
componentDidMount() {
document.addEventListener('click', this.update, true);
}
componentWillUnmount() {
document.removeEventListener('click', this.update, true);
}
updat// doesn't cause React to commit updates
// to the input outside (which would itself
// prevent the parent's onChange parent handler
// from firing).// Note that onChange was always broken when there was an
// earlier setState() in a manual document capture phase
// listener *in the same component*. But that's very rare.
// Here we're testing that a *child* component doesn't break
// the parent if this happens.
};
render() {
return <div />;
}
}class Parent extends React.Component {
handleChange = val => {
didCallOnChange = true;
};
render() {
return (
<div>
<Child />
<input
ref={inputRef}
type=onChange={this.handleChange}
/>
</div>
);
}
}ReactDOM.render(<Parent />, container);
inputRef.current.dispatchEvent(
new Mo}),
);  });  it('unmounted legacy roots should never clear newer root content from a container', () => {
const ref = React.createRef();function OldApp() {
const hideOnFocus = () => {ReactDOM.unmountComponentAtNode(container);
};return (
<button onFocus={hideOnFocus} ref={</button>
);
}function NewApp() {
returref.current.focus();ReactDOM.render(<NewApp />, container);// Calling focus again will flush previously scheduled discrete work for the old root-
// but this should not cle  });
});
