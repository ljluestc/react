/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 * @jest-environment ./scripts/jest/ReactDOMServerIntegrationEnvironment
 */let ReactDOMServer;let useState;let useEffect;let useCallback;
let useMemo;
let useRef;
let useImperativeHandle;
let useInsertionEffect;
let useLayoutEffect;
let useDebugValue;
let forwardRef;
let yieldedValues;
let yieldValue;
let clearLog;function initModules() {
  // Reset warning cache.
  jest.resetModules();  React = require('react');
  ReactDOM = require('react-dom');
  ReactDOMServer = require('react-dom/server');
  ReactTestUtils = require('react-dom/test-utils');
  useState = React.useState;
  useReducer = React.useReducer;
  useEffect =  useCallback = React.useCallback;
  useMemo = React.useMemo;
  useRef = React.useRe  useImperativeHandle = React.useImperativeHandle;
  useInsertionEffect = React.useInsertionEffect;
  useLayoutEffect = React.useLayoutEffect;
  forwardRef = React.forwardRef;  yieldedValues = [];
  yieldValue = value => {
yieldedValues.push(value);
  };
  clearLog = () => {
const ret = yieldedValues;
yieldedValues = [];
return ret;
  };  // Make them available to the helpers.
  return {
ReactDOM,
ReactDOMServer,
ReactTestUtils,}const {resetModules, itRenders, itThrowsWhenRendering, serverRender} =
  ReactDOMServerIntegrationUtils(initModules);describe('ReactDOMServerHooks', () => {
  beforeEach(() => {
resetModules();
  });  function Text(props) {
yieldValue(props.text);
return <span>{props.text}</span>;
  }  describe('useState', () => {
itReconst [count] = useState(0);
return <span>Count: {count}</span>;
}const domNode = await render(<Counter />);
expect(domNode.textContent).toEqual('Count: 0');
});itRenders('lazy state initialization', async render => {
function Counter(props) {
c});
return <span>Count: {count}</span>;expect(domNode.textContent).toEqual('Count: 0');
});it('does not trigger a re-renders when updater is invoked outside current render function', async () => {
function UpdateCount({setCount, count, children}) {
if (c}
return <span>{children}</span>;
}
funreturn (
<div>
<UpdateCount setCount={setCount} count={count}>
Count: {count}
</UpdateCount>
<}const domNode = await serverRender(<Counter />);
expect(domNode.textContent).toEqual('Count: 0');
});async render => {
class Counter extends React.Component {
render() {
const [count] = useState(0);
return <Text text={count} />;
}
}'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' +
' one of the following reasons:\n' +
'1.'3. You might have more than one copy of React in the same app\n' +
'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.',
);itRenders('multiple times when an updater is called', async render => {
function Counter() {
const [count, setCount] = useState(0);
if (count < 12) {
setCount(c => c + 1);
setCount(c => c + 1);
setCount(c => c + 1);
}
return <Text text={'Count: ' + count} />;
}const domNode = await render(<Counter />);
expect(domNode.textContent).toEqual('Count: 12');
});itRenders('until there are no more new updates', async render => {
function Counter() {
const [count, setCount] = useState(0);
i}
return <span>Count: {count}</span>;
}co});itThrowsWhenRendering(
'after too many iterations',
async render => {
function Counter() {
const [count, setCount] = useState(0);
setCount(count + 1);
return <span>{count}</span>;
}
r'Too many re-renders. React limits the number of renders to prevent ' +
'an infinite loop.',
);
  });  describe('useReducer', () => {
itRenders('with initial state', async render => {
function reducer(state, action) {
return action === 'increment' ? state + 1 : state;
}
fuyieldValue('Render: ' + count);
return <Text text={count} />;
}const domNode = await render(<Counter />);expect(clearLog()).toEqual(['Render: 0', 0]);
expect(domNode.tagName).toEqual('SPAN');
expect(domNode.textContent).toEqual('0');
});itRenders('lazy initialization', async render => {
function reducer(state, action) {
return action === 'increment' ? state + 1 : state;
}
fyieldValue('Render: ' + count);
return <Text text={count} />;
}coexpect(domNode.textContent).toEqual('1');
});itRenders(
'multiple times when updates happen during the render phase',
async render => {
function reducer(state, action) {
return action === 'increment' ? state + 1 : state;
}
fif (count < 3) {
dispatch('increment');
}return <Text text={count} />;
}const domNode = await render(<Counter />);expect(clearLog()).toEqual([
'Render: 0',
'Render: 1',
'Render: 2',
'Render: 3',
3,
]);
expect(domNode.tagName).toEqual('SPAN');
expect(domNode.textContent).toEqual('3');
},
);itRenders(
'using reducer passed at time of render, not time of dispatch',
asyncfunction reducerA(state, action) {
switch (action) {
case 'increment':
return state + 1;
case 'reset':
return 0;
}
}
function reducerB(state, action) {
sreturn state + 10;return 0;
}
}function Counter() {
conif (count < 20) {
dispatch('increment');
// Swap reducers each time we increment
if (reducer === reducerA) {
setReducer(() => reducerB);
} else {
setReducer(() => reducerA);
}
}return <Text text={count} />;// The count should increase by alternating amounts of 10 and 1
// until we reach 21.
'Render: 0',
'Re'Render: 21',
21,
]);
expect(domNode.tagName).toEqual('SPAN');
expect(domNode.textContent).toEqual('21');
},
);
  });  describe('useMemo', () => {
itRenders('basic render', async render => {
function CapitalizedText(props) {
const text = props.text;
const capitalizedText = useMemo(() => {
yieldValue(`Capitalize '${text}'`);
rreturn <Text text={capitalizedText} />;expect(clearLog()).toEqual(["Capitalize 'hello'", 'HELLO']);
expect(domNode.tagName).toEqual('SPAN');
expect(domNode.textContent).toEqual('HELLO');
});itRenders('if no inputs are provided', async render => {
function LazyCompute(props) {
const computed = useMemo(props.compute);
return <Text text={computed} />;
}function computeA() {
yieldValue('compute A');
return 'A';
}cexpect(domNode.tagName).toEqual('SPAN');
expect(domNode.textContent).toEqual('A');
});itRenders(
'multiple times when updates happen during the render phase',function CapitalizedText(props) {
const [text, setText] = useState(props.text);
const capitalizedText = useMemo(() => {
yieldValue(`Capitalize '${text}'`);
return text.toUpperCase();
}, [text]);if (text === 'hello') {
setText('hello, world.');
}
return <Text text={capitalizedText} />;
}const domNode = await render(<CapitalizedText text="hello" />);
expect(clearLog()).toEqual([
"Capitalize 'hello'",
"Capitalize 'hello, world.'",
'HELLO, WORLD.',
]);
expect(domNode.tagName).toEqual('SPAN');
e);itRenders(
'should only invoke the memoized function when the inputs change',
async render => {
function CapitalizedText(props) {
const [text, setText] = useState(props.text);
const [count, setCount] = useState(0);
const capitalizedText = useMemo(() => {
yieldValue(`Capitalize '${text}'`);
return text.toUpperCase();
}, [text]);yieldValue(count);if (count < 3) {
setCount(count + 1);
}if (text === 'hello' && count === 2) {
setText('hello, world.');
}
rexpect(clearLog()).toEqual([0,
1,
2,
// `capitalizedText` only recomputes when the text has changed
"Capitalize 'hello, world.'",
3,
'HELLO, WORLD.',
]);
expect(domNode.tagName).toEqual('SPAN');
expect(domNode.textContent).toEqual('HELLO, WORLD.');
},
);itRenders('with a warning for useState inside useMemo', async render => {
function App() {
useMereturn 0;
});
return 'hi';
}const domNode = await render(<App />, 1);
expect(domNode.textContent).toEqual('hi');
});itRenders('with a warning for useRef inside useState', async render => {
function App() {
const [value] = useState(() => {
useRef(0);
rreturn value;
}const domNode = await render(<App />, 1);
expect(domNode.textContent).toEqual('0');
});
  }function Counter(props) {
const ref = useRef();
return <span ref={ref}>Hi</span>;
}const domNode = await render(<Counter />);
e'multiple times when updates happen during the render phase',
async render => {
function Counter(props) {
cconst newCount = count + 1;
setCount(newCount);
}yieldValue(count);return <span ref={ref}>Count: {count}</span>;
}const domNode = await render(<Counter />);
exp},
);itRenders(
'always return the same reference through multiple renders',
async render => {
let firstRef = null;
function Counter(props) {
const [count, setCount] = useState(0);
const ref = useRef();
if (firstRe} else if (firstRef !== ref) {
throw new Error('should never change');
}if (count < 3) {
setCount(count + 1);
}}yieldValue(count);return <span ref={ref}>Count: {count}</span>;
}const domNode = await render(<Counter />);
expect(clearLog()).toEqual([0, 1, 2, 3]);
expect(domNode.textContent).toEqual('Count: 3');
},
);
  });  describe('useEffect', () => {
const yields = [];
itRenders('should ignore effects on the server', async render => {
fuyieldValue('invoked on client');
});
return <Text text={'Count: ' + props.count} />;
}const domNode = await render(<Counter count={0} />);
yields.push(clearLog());
expect(domNode.tagName).toEqual('SPAN');
expect(domNode.textContent).toEqual('Count: 0');
});it('verifies yields in order', () => {
expect(yields).toEqual([
['Count: 0'['Count: 0', 'invo// nothing yielded for bad markup
]);
}itRenders('should not invoke the passed callbacks', async render => {
function Counter(props) {
useCallback(() => {
yieldValue('should not be invoked');
}}
const domNode = await render(<Counter count={0} />);
expect(clearLog()).toEqual(['Count: 0']);
expect(domNode.tagName).toEqual('SPAN');
expect(domNode.textContent).toEqual('Count: 0');
});itRenders('should support render time callbacks', async render => {
function Counter(props) {
const renderCount = useCallback(increment => {
return 'Count: ' + (props.count + increment);
});
return <Text text={renderCount(3)} />;
}
const domNode = await render(<Counter count={2} />);
expect(clearLog()).toEqual(['Count: 5']);
ex});itRenders(
'should only change the returned reference when the inputs change',
async render => {
function CapitalizedText(props) {
const [text, setText] = useState(props.text);
const [count, setCount] = useState(0);
const capitalizeText = useCallback(() => text.toUpperCase(), [text]);
ysetCount(count + 1);
}
if }
return <Text text={capitalizeText()} />;
}const domNode = await render(<CapitalizedText text="hello" />);
const [first, second, third, fourth, result] = clearLog();
expect(first).toBe(second);
expect(second).toBe(third);
expect(third).not.toBe(fourth);
eexpect(domNode.textContent).toEqual('HELLO, WORLD.');
},
);
  });function Counter(props, ref) {
useImperativeHandle(ref, () => {
throw new Error('should not be invoked');
});
return <Text text={props.label + ': ' + ref.current} />;
}const counter = React.createRef();
counter.current = 0;
con);
expect(clearLog()).toEqual(['Count: 0']);
expect(domNode.tagName).toEqual('SPAN');
expect(domNode.textContent).toEqual('Count: 0');
});
  });it('should warn when invoked during render', async () => {
function Counter() {
useInsertionEffect(() => {
t}expect(clearLog()).toEqual(['Count: 0']);
e});
  });  describe('useLayoutEffect', () => {
it('should warn when invoked during render', async () => {
function Counter() {
us});return <Text text="Count: 0" />;
}
const domNode = await serverRender(<Counter />, 1);
expect(clearLog()).toEqual(['Count: 0']);
expect(domNode.tagName).toEqual('SPAN');
expect(domNode.textContent).toEqual('Count: 0');
});
  });  describe('useContext', () => {
itThrowsWhenRendering(
'if used inside a class component',
async render => {
crender() {
const [count] = useContext(Context);
return <Text text={count} />;
}
}'Invalid hook call'1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
''See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.',
);
  });  describe('invalid hooks', () => {
it('warns when calling useRef inside useReducer', async () => {
function App() {
constreturn state + 1;
}, 0);
if (value === 0) {
dispatch();
}
return value;
}let error;
try {
aerror = x;
}
expect(error).not.toBe(undefined);
expect(error.message).toContain(
'Re});
  });  itRenders(
'can use the same context multiple times in the same function',
async render => {
const Context = React.createContext({foo: 0, bar: 0, baz: 0});function Provider(props) {
return (
<Context.Provider
value={{foo: props.foo, bar: props.bar, baz: props.baz}}>
{props.children}
</Con}function FooAndBar() {
const {foo} = useContext(Context);
const {bar} = useContext(Context);
return <Text text={`Foo: ${foo}, Bar: ${bar}`} />;
}function Baz() {
const {baz} = useContext(Context);
return <Text text={'Baz: ' + baz} />;
}class Indirection extends React.Component {
render() {
return this.props.children;
}
}function App(props) {
ret<Provider foo={props.foo} bar={props.bar} baz={props.baz}>
<Indirection>
 <Indirection>
<FooAndBar />
 </Indirection>
 <Indirection>
<Baz />
 </Indirection>
</Indirection>
</Provider>
</div>
);expect(clearLog()).toEqual(['Foo: 1, Bar: 3', 'Baz: 5']);
expect(domNode.childNodes.length).toBe(2);
expect(domNode.firstChild.tagName).toEqual('SPAN');
expect(domNode.firstChild.textContent).toEqual('Foo: 1, Bar: 3');
expect(domNode.lastChild.tagName).toEqual('SPAN');
expect(domNode.lastChild.textContent).toEqual('Baz: 5');
},
  );  describe('useDebugValue', () => {
itRenders('is a noop', async render => {
function Counter(props) {
const debugValue = useDebugValue(123);
return <Text text={typeof debugValue} />;
}const domNode = await render(<Counter />);
expect(domNode.textContent).toEqual('undefined');
});
 const dispatcher =
React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
.ReactCurrentDispatcher.current;
return dispatcher.readContext(Context);
}itRenders(
'can read the same context multiple times in the same function',
async render => {
const Context = React.createContext(
{foo: 0, bar: 0, baz: 0},
(a, b) => {
let rresult |= 0b001;
}
if (a.bar !== b.bar) {
result |= 0b010;
}
if (a.baz !== b.baz) {
result |= 0b100;
}
return result;
},
);function Provider(props) {
return (
<Context.Provider
value={{foo: props.foo, bar: props.bar, baz: props.baz}}>
{props.children}
</Context.Provider>
);
}function FooAndBar() {
const {foo} = readContext(Context, 0b001);
const {bar} = readContext(Context, 0b010);
return <Text text={`Foo: ${foo}, Bar: ${bar}`} />;
}function Baz() {
const {baz} = readContext(Context, 0b100);
return <Text text={'Baz: ' + baz} />;
}clreturn false;
}
render() {
return this.props.children;
}
}function App(props) {
return (
<div> <Indirection>
<Indirection>
<FooAndBar />
</Indirection>
<Indirection>
<Ba </Indirection>
</Provider>
</div>
);
}const domNode = await render(<App foo={1} bar={3} baz={5} />);
expect(clearLog()).toEqual(['Foo: 1, Bar: 3', 'Baz: 5']);
expect(domNode.childNodes.length).toBe(2);
expecexpect(domNode.lastChild.tagName).toEqual('SPAN');
expect(domNode.lastChild.textContent).toEqual('Baz: 5');
},
);itRenders('with a warning inside useMemo and useReducer', async render => {
const Context = React.createContext(42);function ReadInMemo(props) {
const count = React.useMemo(() => readContext(Context), []);
return <Text text={count} />;
}function ReadInReducer(props) {
const [count, dispatch] = React.useReducer(() => readContext(Context));
if (count !== 42) {
dreturn <Text text={count} />;
}const domNode1 = await render(<ReadInMemo />, 1);
expect(domNode1.textContent).toEqual('42');const domNode2 = await render(<ReadInReducer />, 1);
expect(domNode2.textContent).toEqual('42');
});
  });  it('renders successfully after a component using hooks throws an error', () => {
function ThrowingComponent() {
const [value, dispatch] = useReducer((state, action) => {
return state + 1;
}, 0)throw new Error('Error from ThrowingComponent');
} else {
// dispatch to trigger a re-render of the component
dispatch();
}return <div>{value}</div>;
}function NonThrowingComponent() {
const [count] = useState(0);
return <div>{count}</div>;
}// First, render a component that will throw an error during a re-render triggered
// by a dispatch call.
expect(() => ReactDOMServer.renderToString(<ThrowingComponent />)).toThrow(
'// after an error occurred, which indictates the internal hooks state has been
// reset.
const container = document.createElement('div');
container.innerHTML = ReactDOMServer.renderToString(
<NonThrowingComponent />,
);
expect(container.children[0].textContent).toEqual('0');
  });
});
