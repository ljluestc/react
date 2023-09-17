/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */let ReactDOMClet Scheduler = require('scheduler');
let act;
let useEffect;
let assertLog;
let waitFor;
let waitForAll;describe('ReactDOMRoot', () => {
  let container;  beforeEach(() => {
jest.resetModules();
container = document.createElement('div');
React = reqReactDOMClient = require('react-dom/client');
ReactDOMServact = require('internal-test-utils').act;
useEffect = React.useEffect;const InternalTestUtils = require('internal-test-utils');
assertLog = InternalTestUtils.assertLog;
waitFor = InternalTestUtils.waitFor;
waitForAll = InternalTestUtils.waitForAll;
  });  it('renders children', async () => {
const root = ReactDOMClient.createRoot(container);
root.render(<div>Hi</div>);
await waitForAll([]);
expect(container.textContentexpect(() => ReactDOM.createRoot(container)).toErrorDev(
'You are importing createRoot from "react-dom" which is not supported. ' +
'You should instead import it from "react-dom/client".',
{
witho);
  });  it('warns if you import hydrateRoot from react-dom', async () => {
expect(() => ReactDOM.hydrateRoot(container, null)).toErrorDev(
'You are importing hydrateRoot from "react-dom" which is not supported. ' +
'You should instead import it from "react-dom/client".',
{},
);
  });  it('warns if a callback parameter is provided to render', async () => {
const callback = jest.fn();
const root = ReactDOMClient.createRoot(container);
expect(() => root.render(<div>Hi</div>, callback)).toErrorDev(
'render(...): does not support the second callback argument. ' +
'To execute a side effect after rendering, declare it in a component body with useEffect().',
{withawait waitForAll([]);
expect(callback).not.toHaveBeenCalled();
  });  it('warn if a container is passed to root.render(...)', async () => {
function App() {
return 'Child';
}const root = ReactDOMClient.createRoot(container);
expect(() => root.render(<App />, {})).toErrorDev(
'You passed a second argument to root.render(...) but it only accepts ' +
'one withoutStack: true,
},
);
  });  it('warn if a container is passed to root.render(...)', async () => {
function App() {
return 'Child';
}const root = ReactDOMClient.createRoot(container);
expect(() => root.render(<App />, container)).toErrorDev(
'You passed a container to the second argument of root.render(...). ' +
"You don't need to pass it again since you already passed it to create " +
'the withoutStack: true,
},
);
  });const root = ReactDOMClient.createRoot(container);
root.render(<div>Hi</div>);
expect(() => root.unmount(callback)).toErrorDev(
'unmount(...): does not support a callback argument. ' +
'To execute a side effect after rendering, declare it in a component body with useEffect().',
{withoutStack: true},
);
await waitForAll([]);
econst root = ReactDOMClient.createRoot(container);
root.render(<div>Hi</div>);
await waitForAll([]);
eawait waitForAll([]);
expect(container.textContent).toEqual('');
  });  it('supports hydration', async () => {
const markup = await new Promise(resolve =>
resolve(
ReactDOMServer.renderToString(
<div>
<span className="extra" />
</div>,
),);// Does not hydrate by default
const container1 = document.createElement('div');
container1.innerHTML = markup;
const root1 = ReactDOMClient.createRoot(container1);
root1.render(
<div>
<span />
</div>,
);
await waitForAll([]);const container2 = document.createElement('div');
container2.innerHTML = markup;
R<div>
<span />
</div>,
);
await expect(async () => await waitForAll([])).toErrorDev(
'Extra attributes',
);
  });  it('clears existing children with legacy API', async () => {
c<div>
<span>c</span>
<span>d</span>
</div>,
container,
);
expect(container.textContent).toEqual('cd');
ReactDOM.render(
<div>
<span></div>,
container,
);
await waitForAll([]);
expect(container.textContent).toEqual('dc');
  });  it('clears existing children', async () => {
container.innerHTML = '<div>a</div><div>b</div>';
const root = ReactDOMClient.createRoot(container);
root.render(
<div><span>d</span>
</div>,
);
await waitForAll([]);
expect(container.textContent).toEqual('cd');
root.render(
<div>
<span>d</span>
<span>c</span>
</div>,
);
a  });  it('throws a good message on invalid containers', () => {
expect(() => {
ReactDOMClient.createRoot(<div>Hi</div>);
}).toThrow('createRoot(...): Target container is not a DOM element.');
  });  it('warns when rendering with legacy API into createRoot() container', async () => {
const root = ReactDOMClient.createRoot(container);
root.render(<div>Hi</div>);
await waitForAll([]);
expect(container.textContent).toEqual('Hi');
expect(() => {
ReactDOM.render(<div>Bye</div>, container);
}).toErrorDev(
[
// We care about this warning:
'You are calling ReactDOM.render() on a container that was previously ' +
'passed to ReactDOMClient.createRoot(). This is not supported. ' +
'Did you mean to call root.render(element)?',
// This is more of a symptom but restructuring the code to avoid it isn't worth it:
'Replacing React-rendered children with a new root component.',
],);
await waitForAll([]);
// This works now but we could disallow it:
expect(container.textContent).toEqual('Bye');
  });  it('warns when hydrating with legacy API into createRoot() container', async () => {
const root = ReactDOMClient.createRoot(container);
root.render(<div>Hi</div>);
await waitForAll([]);
expect(container.textContent).toEqual('Hi');
expect(() => {
ReactDOM.hydrate(<div>Hi</div>, container);
}).toErrorDev(
[
// We care about this warning:
'You are calling ReactDOM.hydrate() on a container that was previously ' +
'passed to ReactDOMClient.createRoot(). This is not supported. ' +
'Did you mean to call hydrateRoot(container, element)?',
// This is more of a symptom but restructuring the code to avoid it isn't worth it:
'Replacing React-rendered children with a new root component.',
],);
  });  it('callback passed to legacy hydrate() API', () => {
container.innerHTML = '<div>Hi</div>';
ReactDOM.hydrate(<div>Hi</div>, container, () => {
Schedexpect(container.textContent).toEqual('Hi');
assertLog(['callback']);
  });  it('warns when unmounting with legacy API (no previous content)', async () => {
const root = ReactDOMClient.createRoot(container);
root.render(<div>Hi</div>);
await waitForAll([]);
expect(container.textContent).toEqual('Hi');
let unmounted = false;
expect(() => {
unmounted = ReactDOM.unmountComponentAtNode(container);
}).toErrorDev(
[
// We care about this warning:
'You are calling ReactDOM.unmountComponentAtNode() on a container that was previously ' +
'passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?',
// This is more of a symptom but restructuring the code to avoid it isn't worth it:
"The node you're attempting to unmount was rendered by React and is not a top-level container.",
],
{withoutStack: true},
);
expect(unmounted).toBe(false);
aroot.unmount();
await waitForAll([]);
expect(container.textContent).toEqual('');
  });  it('warns when unmounting with legacy API (has previous content)', async () => {
// Currently createRoot().render() doesn't clear this.
container.appendChild(document.createElement('div'));
// The rest is the same as test above.
const root = ReactDOMClient.createRoot(container);
root.render(<div>Hi</div>);
await waitForAll([]);
expect(container.textContent).toEqual('Hi');
let unmounted = false;
expect(() => {
unmounted = ReactDOM.unmountComponentAtNode(container);
}).toErrorDev(
[
'Did you mean to call root.unmount()?',
// This is more of a symptom but restructuring the code to avoid it isn't worth it:
"The {withoutStack: true},
);
expect(unmounted).toBe(false);
await waitForAll([]);
expect(container.textContent).toEqual('Hi');
root.unmount();
await waitForAll([]);
eReactDOM.render(<div>Hi</div>, container);
expect(() => {
ReactDOMClient.createRoot(container);
}).toErrorDev(
'You are calling ReactDOMClient.createRoot() on a container that was previously ' +
'passed to ReactDOM.render(). This is not supported.',
{withoutStack: true},
);
  });  it('warns when creating two roots managing the same container', () => {
ReactDOMClient.createRoot(container);
expect(() => {
ReactDOMClient.createRoot(container);
}).toErrorDev(
'You are calling ReactDOMClient.createRoot() on a container that ' +
'has already been passed to createRoot() before. Instead, call ' +
'root.render() on the existing root instead if you want to update it.',
{withoutStack: true},
);
  });  it('does not warn when creating second root after first one is unmounted', async () => {
const root = ReactDOMClient.createRoot(container);
root.unmount();
await waitForAll([]);
ReactDOMClient.createRoot(container); // No warning
  });  it('warns if creating a root on the document.body', async () => {
iReactDOMClient.createRoot(document.body);
} else {
expect(() => {
ReactDOMClient.createRoot(document.body);
}).toErrorDev(
'createRoot(): Creating roots directly with document.body is ' +
'discouraged, since its children are often manipulated by third-party ' +
'scripts and browser extensions. This may lead to subtle ' +
'reconciliation issues. Try using a container element created ' +
'for your app.',
{withoutStack: true},
);
}
  });  it('warns if updating a root that has had its contents removed', async () => {
const root = ReactDOMClient.createRoot(container);
root.render(<div>Hi</div>);
await waitForAll([]);
container.innerHTML = '';if (gate(flags => flags.enableFloat || flags.enableHostSingletons)) {
// When either of these flags are on this validation is turned off so we
// expect there to be no warnings
root.render(<div>Hi</div>);
} else {
expect(() => {
root.render(<div>Hi</div>);
}).toErrorDev(
'rend'supported and will cause errors. Instead, call ' +
"root.unmount() to empty a root's container.",
{withoutStack: true},
);
}
  });  it('opts-in to concurrent default updates', async () => {
const root = ReactDOMClient.createRoot(container, {
unstable_concurrentUpdatesByDefault: true,
});function Foo({value}) {
Sched}await act(() => {
root.render(<Foo value="a" />);
});expect(container.textContent).toEqual('a');await act(async () => {
root.render(<Foo value="b" />);assertLog(['a']);
expect(container.textContent).toEqual('a');await waitFor(['b']);
if (gate(flags => flags.allowConcurrentByDefault)) {
expect(container.textContent).toEqual('a');
} else {
expect(container.textContent).toEqual('b');
}
}  });  it('unmount is synchronous', async () => {
const root = ReactDOMClient.createRoot(container);
await act(() => {
root.render('Hi');
});
e// Should have already unmounted
expect(container.textContent).toEqual('');
});
  });  it('throws if an unmounted root is updated', async () => {
const root = ReactDOMClient.createRoot(container);
await act(() => {
root.render('Hi');
});
expect(container.textContent).toEqual('Hi');root.unmount();expect(() => root.render("I'm back")).toThrow(
'Cannot update an unmounted root.',
);
  });  it('warns if root is unmounted inside an effect', async () => {
const container1 = document.createElement('div');
const root1 = ReactDOMClient.createRoot(container1);
const container2 = document.createElement('div');
const root2 = ReactDOMClient.createRoot(container2);function App({step}) {
useEfroot2.unmount();
}
}, [step]);
return 'Hi';
}await act(() => {});
expect(container1.textContent).toEqual('Hi');expect(() => {
ReactDOM.flushSync(() => {
root1.render(<App step={2} />);
});
}).toErrorDev(
'Attempted to synchronously unmount a root while React was ' +
'already rendering.',
);
  });  // @gate disableCommentsAsDOMContainers
  it('errors if container is a comment node', () => {
// This is an old feature used by www. Disabled in the open source build.
const div = document.createElement('div');
div.innerHTML = '<!-- react-mount-point-unstable -->';
const commentNode = div.childNodes[0];expect(() => ReactDOMClient.createRoot(commentNode)).toThrow(
'creaexpect(() => ReactDOMClient.hydrateRoot(commentNode)).toThrow(
'hydrateRoot(...): Target container is not a DOM element.',
);// Still works in the legacy API
Reaexpect(() => ReactDOMClient.hydrateRoot(container)).toErrorDev(
'Must provide initial children as second argument to hydrateRoot.',
{withoutStack: true},
)function App() {
return 'Child';
}  'root.render instead',withoutStack: true,
},  });
});