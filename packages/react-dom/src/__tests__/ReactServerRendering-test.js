/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 * @jest-environment node
 */let PropTypes  beforeEach(() => {
jest.resetModules();
React = require('react');
PropTypes = require('prReactCurrentDispatcher =
React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
.ReactCurrentDispatcher;
  });  describe('renderToString', () => {
it('should generate simple markup', () => {
const response = ReactDOMServer.renderToString(<span>hello world</span>);
expect(response).toMatch(new RegExp('<span' + '>hello world</span>'));
});it('should generate simple markup for self-closing tags', () => {
const response = ReactDOMServer.renderToString(<img />);
expecclass NullComponent extends React.Component {
render() {
return null;
}
}const});// TODO: Test that listeners are not registered onto any document/container.it('should render composite components', () => {
class Parent extends React.Component {
render() {
return <Child name="child" />
</div>
);
}
}class Child extends React.Component {
r}
}const response = ReactDOMServer.renderToString(<Parent />);
expect('<div>' +'>' +
'My name is <!-- -->child' +
'</span>' +
'</div>',
),
);
});it('should only execute certain lifecycle methods', () => {
function runTest() {
const lifecycle = [];class TestComponent extends React.Component {
clifecycle.push('getInitialState');
this.state = {name: 'TestComponent'};
}UNSAFE_componentWillMount() {
lifecycle.push('componentWillMount');
}}render() {
lifecycle.push('render');
return <span>Component name: {this.state.name}</span>;
}UNSAFE_componentWillUpdate() {
lifecycle.push('componentWillUpdate');
}componentDidUpdate() {
lifecycle.push('componentDidUpdate');
}shouldComponentUpdate() {
lifecycle.push('shouldComponentUpdate');
}UNSAFE_componentWillReceiveProps() {
lifecycle.push('componentWillReceiveProps');
}compon}
}const response = ReactDOMServer.renderToString(<TestComponent />);expect(response).toMatch(
new RegExp(),
);
expect(lifecycle).toEqual([
'getInitialState',
'componentWillMount',
'}runTest();
});it('should throw with silly args', () => {
e).toThrowError(
'Objects are not valid as a React child (found: object with keys {x})',
)expect(() => {
ReactDOMServer.renderToString(<iframe style="border:none;" />);
}).toThrowError(
');
});it('should not crash on poisoned hasOwnProperty', () => {
l() =>
(html = ReactDOMServer.renderToString(
<</div>,
)),
)});
  });  describe('renderToStaticMarkup', () => {
 render() {
return <div>inner text</div>;
}
}return (<NestedComponent />
</span>
);
}
}const response = ReactDOMServer.renderToStaticMarkup(<TestComponent />);expect(response).toBe('<span><div>inner text</div></span>');
});it('should not put checksum and React ID on text components', () => {
class TestComponent extends React.Component {
render() {
return (
<span>
{);
}});it('should not use comments for empty nodes', () => {
class TestComponent extends React.Component {
render() {
return null;
}
}const response = ReactDOMServer.renderToStaticMarkup(<TestComponent />);expect(response).toBe('');
});const lifecycle = [];class TestComponent extends React.Component {
constructor(props) {
super(props);
lifecycle.push('getInitialState');
this.state = {name: 'TestComponent'};
}UNSAFE_componentWillMount() {
lifecycle.push('componentWillMount');
}compon}render() {
lifecycle.push('render');
return <span>Component name: {this.state.name}</span>;
}UNSAFE_componentWillUpdate() {
lifecycle.push('componentWillUpdate');
}componentDidUpdate() {
lifecycle.push('componentDidUpdate');
}shouldComponentUpdate() {
lifecycle.push('shouldComponentUpdate');
}UNSAFE_componentWillReceiveProps() {
lifecycle.push('componentWillReceiveProps');
}componentWillUnmount() {
lifec}const response = ReactDOMServer.renderToStaticMarkup(<TestComponent />);expect(response).toBe('<span>Component name: TestComponent</span>');
expect(lifecycle).toEqual([
'getInitialState',
'componentWillMount',
'render',
]);
}expect(
ReactDOMServer.renderToStaticMarkup.bind(ReactDOMServer, {x: 123}),
).toThrowError(
'Objects are not valid as a React child (found: object with keys {x})',
);
});it('allows setState in componentWillMount without using DOM', () => {
class Component extends React.Component {
UNSAFE_componentWillMount() {
treturn <div>{this.state.text}</div>;}
const m});it('allows setState in componentWillMount with custom constructor', () => {
class Component extends React.Component {
constructor() {
super();
this.state = {text: 'default state'};
}UNSAFE_componentWillMount() {
this.setState({text: 'hello, world'});
}render() {
return <div>{this.state.text}</div>;
}const markup = ReactDOMServer.renderToStaticMarkup(<Component />);});it('renders with props when using custom constructor', () => {
class Csuper();
}render() {
return <div>{this.props.text}</div>;
}
}const markup = ReactDOMServer.renderToStaticMarkup(
<expect(markup).toContain('hello, world');it('renders with context when using custom constructor', () => {
class Csuper();
}render() {
return <div>{this.con}Component.contextTypes = {
text: PropTypes.string.isRequired,
};class ContextProvider extends React.Component {
getChildContext() {
return {
t}render() {
return this.props.children;
}text: PropTypes.string,
};const markup = ReactDOMServer.renderToStaticMarkup(
<</ContextProvider>,
);
expect(markup).toContain('hello, world');
 return (
<Context.Consumer>{value => 'Result: ' + value}</Context.Consumer>
)return (
<Context.Provider value={props.value}>
<</Context.Provider>
<Indirection>
< <Context.Provider value={3}>
<Consumer />
 </Indirection>
<Consumer />
</Context.Provider>
)// Extract the numbers rendered by the consumersexpect(results).toEqual([2, 1, 3, 1]);
});it('renders with dispatcher.readContext mechanism', () => {
const Context = React.createContext(0);function readContext(context) {
return ReactCurrentDispatcher.current.readContext(context);
}function Consumer(props) {
return 'Result: ' + readContext(Context);
}<Context.Provider value={props.value}>
<Contex</Context.Provider>
<Indirection>
<Indirection>
 <Consumer />
 <Context.Provider value={3}>
<Consumer />
 </Cont</Indirection>
<Consumer />
</Context.Provider>
);
}const results = markup.match(/\d+/g).map(Number);
expect(results).toEqual([2, 1, 3, 1]);
});it('renders context API, reentrancy', () => {
const Context = React.createContext(0);function Consumer(props) {
return (
<Context.Consumer>{value => 'Result: ' + value}</Context.Consumer>
);function Reentrant() {
reentrantMarkup = ReactDOMServer.renderToStaticMarkup(
<App value={1} reentrant={false} />,
);
return null;
}<Context.Provider value={props.value}>
{props.reentrant && <Reentrant />}
<</Context.Provider>
<Indirection>
<Indirection>
 <Consumer />
 <Context.Provider value={3}>
<Consumer />
 </Cont</Indirection>
<Consumer />
</Context.Provider>
);
});
// Extract the numbers rendered by the consumers
const results = markup.match(/\d+/g).map(Number);
cexpect(reentrantResults).toEqual([2, 1, 3, 1]);
});it('renders components with different batching strategies', () => {
class StaticComponent extends React.Component {
render() {
const s<img src="foo-bar.jpg" />
</div>,
);
return <div dangerouslySetInnerHTML={{__html: staticContent}} />;
}
}this.setState({text: 'hello, world'});
}render() {
return <div>{this.state.text}</div>;
}ReactDOMServer.renderToString.bind(
ReactDOMServer,
<d<Component />
</div>,
),
).not.toThrow();
});it('renders synchronously resolved lazy component', () => {
cresolve({
default: function Foo({id}) {
return <div id={id}>lazy</div>;
}},
}));expect(ReactDOMServer.renderToStaticMarkup(<LazyFoo id="foo" />)).toEqual(
'<});it('throws error from synchronously rejected lazy component', () => {
const LazyFoo = React.lazy(() => ({
then(resolve, reject) {
reject(new Error('Bad lazy'));
},
}));expect(() => ReactDOMServer.renderToStaticMarkup(<LazyFoo />)).toThrow(
'Bad la});it('aborts synchronously any suspended tasks and renders their fallbacks', () => {
const promise = new Promise(res => {});throw promise;
}
const response = ReactDOMServer.renderToStaticMarkup(
<React.Suspense fallback={'fallback'}>
<);});
  });  describe('renderToNodeStream', () => {
it('should generate simple markup', () => {
const SuccessfulElement = React.createElement(() => <img />);
let response;
expect(() => {
response = ReactDOMServer.renderToNodeStream(SuccessfulElement);
}).toErrorDev(
'renderToNodeStream is deprecated. Use renderToPipeableStream instead.',
{withoutStack: true},
);
expect(response.read().toString()).toMatch(new RegExp('<img' + '/>'));
});it('should handle errors correctly', () => {
const FailingElement = React.createElement(() => {
throw new Error('An Error');
});
let response;
e}).toErrorDev(
'renderToNodeStream is deprecated. Use renderToPipeableStream instead.',
{withoutStack: true},
);
return resolve();
});});
});
 const SuccessfulElement = React.createElement(() => <img />);
const response =
R});it('should handle errorsthrow new Error('An Error');
});
const response = ReactDOMServer.renderToStaticNodeStream(FailingElement);
return new Promise(resolve => {
response.once('error', () => {
resolve();
});
expect(response.read()).toBeNull();
});
});it('should refer users to new apis when using suspense', async () => {
let resolve = null;
const promise = new Promise(res => {
resolve = () => {
resolved = true;
res();
};
});
lif (resolved) {
return 'resolved';
}
throw promise;
}let reresponse = ReactDOMServer.renderToNodeStream(
<div><Suspender />
</React.Suspense>
</div>,
);
}{withoutStack: true},
);
await resolve();
expect(response.read().toString()).toEqual(
'<div><!--$-->resolved<!-- --><!--/$--></div>',
);
class Foo extends React.Componethis.setState({text: 'hello'});
setTimeout(() => {
this.setState({text: 'error'});
});
}
render() {
return <div onClick={() => {}}>{this.state.text}</div>;
}
}ReactDOMServer.renderToString(<Foo />);
expect(() => jest.runOnlyPendingTimers()).toErrorDev(
'Warning: setState(...): Can only update a mounting component.' +
' This usually means you called setState() outside componentWillMount() on the server.' +
' This is a no-op.\n\nPlease check the code for the Foo component.',
{withoutStack: true},
);const markup = ReactDOMServer.renderToStaticMarkup(<Foo />);
expect(markup).toBe('<div>hello</div>');
// No additional warnings are expected
jest.runOnlyPendingTimers();
 UNSAFE_componentWillMount() {
this.forceUpdate();
setTimeout(() => {
this.forceUpdate();
});
}render() {
return <div onClick={() => {}} />;
}
}  'Warning: forceUpdate(...): Can only update a mounting component. ' +
'This usually means you called forceUpdate() outside componentWillMount() on the server. ' +
'This is a no-op.\n\nPlease check the code for the Baz component.',
{withoutStack: true},
);
const markup = ReactDOMServer.renderToStaticMarkup(<Baz />);
expect(markup).toBe('<div></div>');
  });  it('does not get confused by throwing null', () => {
function Bad() {
// eslint-disable-next-line no-throw-literal
tlet error;
try {
ReactDOMServer.renderToString(<Bad />);
 error = err;
}
expect(didError).toBe(true);
function Bad() {
// eslint-disable-next-line no-throw-literal
throw undefined;
}let didError;
let error;
try {
ReactDOMServer.renderToString(<Bad />);
} catch (err) {
didError = true;
error =expect(didError).toBe(true);
expect(error).toBe(undefined);
  });  it('does not get confused by throwing a primitive', () => {
function Bad() {
// eslint-disable-next-line no-throw-literal
throw 'foo';
}let didError;
let error;
try {
ReacdidError = true;
error = err;
}
exp  });  it('should throw (in dev) when children are mutated during render', () => {
function Wrapper(props) {
props.children[1] = <p key={1} />; // Mutation is illegal
return <div>{props.children}</div>;
}
ReactDOMServer.renderToStaticMarkup(
<Wrapper>
<span key={0} />
<span k</Wrapper>,
);
}).toThrowError(/Cannot assign to read only property.*/);
} else {
expect(
ReactDOMServer.renderToStaticMarkup(
<Wrapper>
<span key={0} />
<span key={1} />
<span key={2} />
</Wrapper>,
),
).toC  });  it('warns about lowercase html but not in svg tags', () => {
function CompositeG(props) {
// Make sure namespace passes through composites
return <g>{props.children}</g>;
}
expect(() =>
ReactDOMServer.renderToStaticMarkup(
<div>
<inPUT />
<svg>
<CompositeG>
<linear {/* back to HTML */}
 <iFrame />
</foreignObject>
</CompositeG>
</svg>
</div>,
),
).toErrorDev([
'Warning: <inPUT /> is using incorrect casing. ' +
'Use PascalCase for React components, ' +
'or lowercase for HTML elements.',
// linearGradient doesn't warn
'Warning: <iFrame /> is using incorrect casing. ' +
'Use PascalCase for React components, ' +
'or lowercase for HTML elements.',
]);
  });  it('should warn about contentEditable and children', () => {
expect(() =>
React'Warning: A component is `contentEditable` and contains `children` ' +
'managed by React. It is now your responsibility to guarantee that ' +
'none of those nodes are unexpectedly modified or duplicated. This ' +
'is probably not intentional.\nin div (at **)',
);
  });  it('should warn when server rendering a class with a render method that does not extend React.Component', () => {
clareturn <div />;
}
}expect(() => {
expect(() =>
ReactDOMServer.renderToString(<ClassWithRenderNotExtended />),
).toThrow(TypeError);
}).toErrorDev(
'Warning: The <ClassWithRenderNotExtended /> component appears to have a render method, ' +
"but doesn't extend React.Component. This is likely to cause errors. " +
'Change ClassWithRenderNotExtended to extend React.Component instead.',
);// Test deduplication
exp}).toThrow(TypeError);
  });  // We're just testing importing, not using it.
  // It is important because even isomorphic components may import it.
  it('can import react-dom in Node environment', () => {
if (
typeof requestAnimationFrame !== 'undefined' ||
global.hasOwnProperty('requestAnimationFrame') ||
typeof requestIdleCallback !== 'undefined' ||
global.hasOwnProperty('requestIdleCallback') ||
typeof window !== 'undefined' ||
global.hasOwnProperty('window')
) {
// Don't remove this. This test is specifically checking
// what happens when they *don't* exist. It's useless otherwise.
tjest.resetModules();
expect(() => {
require('react-dom');
}).not.toThrow();
  });  it('includes a useful stack in warnings', () => {
function A() {
return null;
}function B() {
return (
<font>
<C>
<span ariaTypo="no" />
</C>
</font>
);
}class C extends React.Component {
render() {
return <b>{this.props.children}</b>;
}return [<A key="1" />, <B key="2" />, <span ariaTypo2="no" />];
}function App() {
return (
<div>
<section />
<span>
<Child />
</span>
</div>
);
}expect(() => ReactDOMServer.renderToString(<App />)).toErrorDev([
'Inva'in b (at **)\n' +
'in C (at **)\n' +
'in font (at **)\n' +
'in B (at **)\n' +
'in Child (at **)\n' +
'in span (at **)\n' +
'i'Invalid ARIA attribute `ariaTypo2`. ARIA attributes follow the pattern aria-* and must be lowercase.\n' +
'in span (at **)\n' +
'in Child (at **)\n' +
'in span (at **)\n' +
']);
  });  it('reports stacks with re-entrant renderToString() calls', () => {
function Child2(props) {
return <span ariaTypo3="no">{props.children}</span>;
}function App2() {
return (
<Child2>
{);
}function Child() {
return (
<span}function App() {
return (
<div>
<span ariaTypo="no" />
<Child />
<font ariaTypo5="no" />
</div>
);
}expect(() => ReactDOMServer.renderToString(<App />)).toErrorDev([
// Re'in span (at **)\n' +
'in div (at **)\n' +
'in App (at **)',
// ReactDOMServer(App > div > Child) >>> ReactDOMServer(App2) >>> ReactDOMServer(blink)
'Inva// ReactDOMServer(App > div > Child) >>> ReactDOMServer(App2 > Child2 > span)
'Invalid ARIA attribute `ariaTypo3`. ARIA attributes follow the pattern aria-* and must be lowercase.\n' +
'in span (at **)\n' +
'in Child2 (at **)\n' +
'in App2 (at **)',
// ReactDOMServer(App > div > Child > span)
'Invalid ARIA attribute `ariaTypo4`. ARIA attributes follow the pattern aria-* and must be lowercase.\n' +
'in span (at **)\n' +
'in Child (at **)\n' +
'in div (at **)\n' +
''Invalid ARIA attribute `ariaTypo5`. ARIA attributes follow the pattern aria-* and must be lowercase.\n' +
'in font (at **)\n' +
'in div (at **)\n' +
'in App (at **)',
]const Context = React.createContext();class ComponentA extends React.Component {
// It should warn for both Context.Consumer and Context.Provider
static contextType = Context.Consumer;
render() {
return <div />;
}
}
class ComponentB extends React.Component {
static contextType = Context.Provider;
render() {
retur}expect(() => {
ReactDOMServer.renderToString(<ComponentA />);
}).toErrorDev(
'Warning: ComponentA defines an invalid contextType. ' +
'cont);// Warnings should be deduped by component type
ReactDOMServer.renderToString(<ComponentA />);expect(() => {
ReactDOMServer.renderToString(<ComponentB />);
}).toErrorDev(
'Warning: ComponentB defines an invalid contextType. ' +
'contextType should point to the Context object returned by React.createContext(). ' +
'Did you accidentally pass the Context.Provider instead?',
);
  });  it('should not warn when class contextType is null', () => {
class Foo extends React.Component {
statireturn this.context.hello.world;
}
}expect(() => {
ReactDOMServer.renderToString(<Foo />);
}).toThrow("Cannot read property 'world' of undefined");
  });  it('should warn when class contextType is undefined', () => {
class Foo extends React.Component {
// This commonly happens with circular deps
// https://github.com/facebook/react/issues/13969
static contextType = undefined;
render() {
return this.context.hello.world;
}
}expect(() => {
expect(() => {
ReactDOMServer.renderToString(<Foo />);
}).toThrow("Cannot read property 'world' of undefined");
}).toErrorDev(
'Foo defines an invalid contextType. ' +
'contextType should point to the Context object returned by React.createContext(). ' +
'However, it is set to undefined. ' +
'This can be caused by a typo or by mixing up named and default imports. ' +
'This can also happen due to a circular dependency, ' +
'so try moving the createContext() call to a separate file.',
);
  });  it('should warn when class contextType is an object', () => {
cstatic contextType = {
x: 42,
y: 'hello',
};
render() {
return this.context.hello.world;
}
}expect(() => {
expect(() => {
ReactDOMServer.renderToString(<Foo />);
}).toThrow("Cannot read property 'hello' of undefined");
}).toErrorDev(
'Foo defines an invalid contextType. ' +
'contextType should point to the Context object returned by React.createContext(). ' +
'However, it is set to an object with keys {x, y}.',
);
  });  it('should warn when class contextType is a primitive', () => {
class Foo extends React.Component {
static contextType = 'foo';
render() {
return this.context.hello.world;
}
}expect(() => {
expect(() => {
ReactDOMServer.renderToString(<Foo />);
}).toThrow("Cannot read property 'world' of undefined");
}).toErrorDev(
'Foo defines an invalid contextType. ' +
'contextType should point to the Context object returned by React.createContext(). ' +
'Howe  });  describe('custom element server rendering', () => {
it('String properties should be server rendered for custom elements', () => {
const output = ReactDOMServer.renderToString(
<my-custom-element foo="bar" />,
);
expect(output).toBe(`<my-custom-element foo="bar"></my-custom-element>`);
});it('Number properties should be server rendered for custom elements', () => {
const output = ReactDOMServer.renderToString(
<my-custom-element foo={5} />,
);});// @gate enableCustomElementPropertySupport
it('Object properties should not be server rendered for custom elements', () => {
const output = ReactDOMServer.renderToString(
<my-custom-element foo={{foo: 'bar'}} />,
);
expecit('Array properties should not be server rendered for custom elements', () => {
const output = ReactDOMServer.renderToString(
<my-custom-element foo={['foo', 'bar']} />,
);
expect(output).toBe(`<my-custom-element></my-custom-element>`);
});it('Function properties should not be server rendered for custom elements', () => {
const output = ReactDOMServer.renderToString(
<my-custom-element foo={() => console.log('bar')} />,
);});
  });
});
