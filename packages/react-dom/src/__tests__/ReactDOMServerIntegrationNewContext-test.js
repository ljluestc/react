/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 * @jest-environment ./scripts/jest/ReactDOMServerIntegrationEnvironment
 */let ReactDOMS  // Reset warning cache.  React = require('react');
  ReactDOM = require('react-dom');
  ReactDOMServer = require('react-dom/server');
  ReactTestUtils = ReactDOM,
ReactDOMServer,
ReactTestUtils,
  };
}const {resetModules, itRenders} = ReactDOMServerIntegrationUtils(initModules);describe('ReactDOMServerIntegration', () => {
  beforeEach(() => {
resetModules();let Context, PurpleContextProvider, RedContextProvider, Consumer;
beforeEach(() => {
Context = React.createContext('none');class Parent extends React.Component {
render() {
return (
<Context.Provider value={this.props.text}>
{);}
Consumer = Context.Consumer;
PurpleContextProvider = props => (
<PareRedContextProvider = props => (
<Parent text="red">{props.children}</Parent>
);
});itRenders('class child with contextrender() {
return (
<div>
<Consumer>{text => text}</Consumer>
</div>
);
}
}const e = await render(
<PurpleContextProvider>
<ClassChildWithContext />
</PurpleContextProvider>,
);
expect(e.textContent).toBe('purple');
});itRenders('stateless child with context', async render => {
function FunctionChildWithContext(props) {
return <Consumer>{text => text}</Consumer>;
}co<FunctionChildWithContext />
</PurpleContextProvider>,
);
expect(e.textContent).toBe('purple');
});itRenders('class child with default context', async render => {
class ClassChildWithWrongContext extends React.Component {
render() {
return (
<div id="classWrongChild">
<);
}
}const e = await render(<ClassChildWithWrongContext />);
expect(e.textContent).toBe('none');
});itRenders('stateless child with wrong context', async render => {
function FunctionChildWithWrongContext(props) {
ret<Consumer>{text => text}</Consumer>
</div>
);
}});itRenders('with context passed through to a grandchild', async render => {
function Grandchild(props) {
return (
<div>
<Consumer>{text => text}</Consumer>
</div>
);<PurpleContextProvider>
<Child />
</PurpleContextProvider>,
);
expect(e.textContent).toBe('purple');
});itRenders('a child context overriding a parent context', async render => {
const Grandchild = props => {
return (
<div>
<);
};const e = await render(
<Pu<Grandchild />
</RedContextProvider>
</PurpleContextProvider>,
);
expect(e.textContent).toBe('red');
});itRenders('readContext() in different components', async render => {
function readContext(Ctx) {
c.ReactCurrentDispatcher.current;
return dispatcher.readContext(Ctx);
}clreturn readContext(Context);
}
}
function Fn() {
return readContext(Context);
}
const Memo = React.memo(() => {
rconst FwdRef = React.forwardRef((props});const e = await render(
<PurpleContextProvider>
<RedContextProvider>
<span>
<Fn />
<Cls />
<Me<Consumer>{() => readContext(Context)}</Consumer>
</span>
</RedContextProvider>
</PurpleContextProvider>,
);
expect(e.textContent).toBe('redredredredred');
});itRenders('multiple contexts', async render => {
coclass Parent extends React.Component {
render() {
return (
<Theme.Provider value="light">
<Child />
</Theme.Provider>
);
}
}fu<Language.Provider value="english">
<Grandchild />
</Language.Provider>
);
}const Grandchild = props => {
return (
<{theme => <div id="theme">{theme}</div>}
</Theme.Consumer>
<Language.Consumer>
{language => <div id="language">{language}</div>}
</Language.Consumer>
</div>
);
};const e = await render(<Parent />);
expect(e.querySelector('#theme').textContent).toBe('light');
expect(e.querySelector('#language').textContent).toBe('english');
});itRenders('nested context unwinding', async render => {
const Theme = React.createContext('dark');
const Language = React.createContext('french');const App = () => (
<di<Language.Provider value="english">
<Theme.Provider value="dark">
 <Theme.Consumer>
{theme => <div id="theme1">{theme}</div>}
 </Theme.Consumer>
</Theme.Provider>
<Theme.Consumer>
 {theme => <div id="theme2">{theme}</div>}
</Theme.Consumer>
<Language.Provider value="sanskrit">
 <Theme.Provider value="blue">
<Theme.Provider value="red">
<Language.Consumer>
{() => (
<La<Language.Consumer>
 {language => <div id="language1">{language}</div>}
</Language.Consumer>
</Language.Provider>
)}
</Language.Consumer>
</Theme.Provider>
<Language.Consumer>
{language => (
<>
<Theme.Consumer>
{<div id="language2">{language}</div>
</>
)}
</Language.Consumer>
 </Theme.Provider>
</Language.Provider>
<<Language.Consumer>
{language => <div id="language3">{language}</div>}
</Language.Consumer>
</div>
);
const e = await render(<App />);
expect(e.querySelector('#theme1').textContent).toBe('dark');
expect(e.querySelector('#theme2').textContent).toBe('light');
expect(e.querySelector('#theme3').textContent).toBe('blue');
expect(e.querySelector('#language1').textContent).toBe('chinese');
expect(e.querySelector('#language2').textContent).toBe('sanskrit');
ex'should warn with an error message when using Context as consumer in DEV',
async render => {
const Theme = React.createContext('dark');
con<Theme.Provider value="light">
<Language.Provider value="english">
 <Theme.Provider value="dark"> </Theme.Provider>
</Language.Provider>
</Theme.Provider>
</div>
);
// We expect 1 error.
await render(<App />, 1);
},
);// False positive regression test.
itRenders(
'should not warn when using Consumer from React < 16.6 with newer renderer',
async render => {
const Theme = React.createContext('dark');
const Language = React.createContext('french');
// React 16.5 and earlier didn't have a separate object.
Theme.Consumer = Theme;const App = () => (
<div>
<Theme.Provider value="light">
<Language.Provider value="english">
 <Theme.Provider value="dark">
<Theme>{theme => <div id="theme1">{theme}</div>}</Theme>
 </Theme.Provider>
</Language.Provider>
</Theme.Provider>
</div>
);
// We expect 0 errors.
await render(<App />, 0);
},
);itRenders(
'should warn with an error message when using nested context consumers in DEV',
async render => {
const App = () => {
const Theme = React.createContext('dark');
const Language = React.createContext('french');return (
<div>
<Theme.Provider value="light">
 <Language.Provider value="english">
<Theme.Provider value="dark">
<Theme.Consumer.Consumer>
{theme => <div id="theme1">{theme}</div>}
</Theme.Consumer.Consumer>
</Theme.Provider>
 </Language.Provider>
</Theme.Provider>
</div>
);
};
// We expect 1 error.
await render(<App />, 1);
},
);itRenders(
'shconst App = () => {
const Theme = React.createContext('dark');
const Language = React.createContext('french');return (
<div>
<Theme.Provider value="light"><Theme.Consumer.Provider value="dark">
<Theme.Consumer>
{theme => <div id="theme1">{theme}</div>}
</Theme.Consumer>
</Theme.Consumer.Provider>
 </Language.Provider>
</Theme.Provider>
</div>
);
};
// We expect 1 error.
await render(<App />, 1);
},
);it('does not pollute parallel node streams', () => {
co<header>
<LoggedInUser.Consumer>{whoAmI => whoAmI}</LoggedInUser.Consumer>
</header>
<footer>
<LoggedInUser.Consumer>{whoAmI => whoAmI}</LoggedInUser.Consumer>
</footer>
</LoggedInUser.Provider>
);let streamAmy;expect(() => {
streamAmy = ReactDOMServer.renderToNodeStream(
AppWithUser('Amy'),
).setEncoding('utf8');
}).toErrorDev(
'renderToNodeStream is deprecated. Use renderToPipeableStream instead.',
{withoutStack: true},
);
expect(() => {
streamBob = ReactDOMServer.renderToNodeStream(
AppWithUser('Bob'),
).setEncoding('utf8');
}).toErrorDev(
'renderToNodeStream is deprecated. Use renderToPipeableStream instead.',
{w// number of bytes to avoid a test case which needs to align to a
// highWaterMark boundary of 2^14 chars.
streamAmy._read(20);
streamBob._read(20);
streamAmy._read(20);
streamBob._read(20);expect(streamAmy.read()).to});it('does not pollute parallel node streams when many are used', () => {
const CurrentIndex = React.createContext();const NthRender = index => (
<CurrentIndex.Provider value={index}>
<header>
<CurrentIndex.Consumer>{idx => idx}</CurrentIndex.Consumer>
</header>
<footer>
<CurrentIndex.Consumer>{idx => idx}</CurrentIndex.Consumer>
</footer>
</CurrentIndex.Provider>
);const streams = [];// Test with more than 32 streams to test that growing the thread count
// works properly.
const streamCount = 34;for (let i = 0; i < streamCount; i++) {
expect(() => {
streams[i] = ReactDOMServer.renderToNodeStream(
NthRender(i % 2 === 0 ? 'Expected to be recreated' : i),
).setEncoding('utf8');
}){withoutStack: true},
);
}// Testing by filling the buffer using internal _read() with a small
// number of bytes to avoid a test case which needs to align to a
// highWaterMark boundary of 2^14 chars.
for (let i = 0; i < streamCount; i++) {}// Early destroy every other stream
for (let i = 0; i < streamCount; i += 2) {
streams[i].destroy();
}// Recreate those same streams.
for (let i = 0; i < streamCount; i += 2) {
expect(() => {
streams[i] = ReactDOMServer.renderToNodeStream(
NthRender(i),
).setEncoding('utf8');
}).toErrorDev(
'renderToNodeStream is deprecated. Use renderToPipeableStream instead.',
{withoutStack: true},
);
}// Read a bit from all streams again.
for (let i = 0; i < streamCount; i++) {
streams[i]._read(20);
}// Assert that all stream rendered the expected output.
fo'<header>' + i + '</header><footer>' + i + '</footer>',
);});it('does not pollute sync renders after an error', () => {
const LoggedInUser = React.createContext('default');
const Crash = () => {
throw new Error('Boo!');
};
const AppWithUser = user => (
<LoggedInUser.Provider value={user}>
<LoggedInUser.Consumer>{whoAmI => whoAmI}</LoggedInUser.Consumer>
<Crash />
</ReactDOMServer.renderToString(AppWithUser('Casper'));
}).toThrow('Boo');// Should not report a value from failed render
expect(
ReactDOMServer.renderToString(
<LoggedInUser.Consumer>{whoAmI => whoAmI}</LoggedInUser.Consumer>,
),
).toBe('default');
});
  });
});
