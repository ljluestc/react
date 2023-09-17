/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */let ReactDOMClet ReactFeatureFlags;let Suspense;
let act;
let assertLog;
let waitForAll;
let waitFor;
let waitForPaint;let IdleEventPriority;
let ContinuousEventPriority;function dispatchMouseHoverEvent(to, from) {
  if (!to) {
to = null;
  }
  if (!from) {
from = null;  if (from) {
const mouseOutEvent = do'mouseout',
true,
true,
window,
0,
50,
50,
50,
50,
false,
false,
false,
false,
0,
to,
);
from.dispatchEvent(mouseOutEvent);
  }
  if (to) {
const mouseOverEvent = document.createEvent('MouseEvents');
mouseOverEvent.initMouseEvent(
'mouseover',
true,
true,
window,
0,
50,
50,
50,
50,
false,
false,
false,
false,
0,
from,
);
to.dispatchEvent(mouseOverEvent);
  }
}function dispatchClickEvent(target) {
  const mouseOutEvent = document.createEvent('MouseEvents');
  mouseOutEvent.initMouseEvent(
'click',
true,
true,
window,
0,
50,
50,
false,
false,
false,
false,
0,
target,
  );
  return target.dispatchEvent(mouseOutEvent);
}// TODO: There's currently no React DOM API to opt into Idle priority updates,
// and there's no native DOM event that maps to idle priority, so this is a
// temporary workaround. Need something like ReactDOM.unstable_IdleUpdates.
function TODO_scheduleIdleDOMSchedulerTask(fn) {
  ReactDOM.unstable_runWithPriority(IdleEventPriority, () => {
const prevEvent = window.event;
window.event = {type: 'message'};
try {
fn();
} finally {
window.event = prevEvent;
}
ReactDOM.unstable_runWithPriority(ContinuousEventPriority, () => {
const prevEvent = window.event;
window.event = {type: 'message'};
try {
fn();
} finally {
window.event = prevEvent;
}
  });
}describe('ReactDOMServerSelectiveHydration', () => {
  beforeEach(() => {
jest.resetModules();ReactFeatureFlags = require('shared/ReactFeatureFlags');
ReactFeatureFlags.enableCreateEventHandleAPI = true;
ReactDOMClient = require('react-dom/client');
ReactDOMServer = require('react-dom/server');
act = require('internal-test-utils').act;
Scheduler = require('scheduler');
Suspense = React.Suspense;const InternalTestUtils = require('internal-test-utils');
assertLog = InternalTestUtils.assertLog;
waitForAll = InternalTestUtils.waitForAll;
waitFor = InternalTestUtils.waitFor;
waitForPaint = InternalTestUtils.waitForPaint;IdleEventPriority = require('react-reconciler/constants').IdleEventPriority;
ContinuousEventPriority =
rfunction Child({text}) {
Scheduler.log(text);
return (onClick={e => {
e.preventDefault();
Scheduler.log('Clicked ' + text);
}}>
{text}
</span>
);
}function App() {
Scheduler.log('App');<div>
<Suspense fallback="Loading...">
<Child text="A" />
</Suspense>
<Suspense fallback="Loading..."></Suspense>
</div>
);
}document.body.appendChild(container);container.innerHTML = finalHTML;const span = container.getElementsByTagName('span')[1];ReactDOMClient.hydrateRoot(container, <App />);// Nothing has been hydrated so far.
assertLog([]);// This should synchronously hydrate the root App and the second suspense
// boundary.
const result = dispatchClickEvent(span);// The event should have been canceled because we called preventDefault.
expect(result).toBe(false);// We rendered App, B and then invoked the event without rendering A.
assertLog(['App', 'B', 'Clicked B']);// After continuing the scheduler, we finally hydrate A.
await waitForAll(['A']);document.body.removeChild(container);
  });  it('hydrates at higher pri if sync did not work first time', async () => {
let suspend = false;
let resolve;
const promise = new Promise(resolvePromise => (resolve = resolvePromise));function Child({text}) {
if ((text === 'A' || text === 'D') && suspend) {
throwScheduler.log(text);
return (
<span
onClick={e => {
e.preventDefault();
Scheduler.log('Clicked ' + text);
}}>
{text}
</span>
);
}function App() {
Scheduler.log('App');
retur<Suspense fallback="Loading..."></Suspense><Child text="B" />
</Suspense>
<Suspense fallback="Loading..."></Suspense><Child text="D" /></div>}const finalHTML = ReactDOMServer.renderToString(<App />);assertLog(['App', 'A', 'B', 'C', 'D']);const container = document.createElement('div');
// We need thi// priority, after we unsuspend.
ReactDOMClient.hydrateRoot(container, <App />);// Nothing has been hydrated so far.
assertLog([]);// This click target cconst result = dispatchClickEvent(spanD);
expect(result).toBe(true);assertLog([
'App','B',
'C',suspend = false;
resol});assertLog(['D', 'A']);document.body.removeChild(container);
  });  it('hydrates at higher pri for secondary discrete events', async () => {
let suspend = false;
let resolve;if ((text === 'A' || text === 'D') && suspend) {
throw promise;
}
Scheduler.log(text);
return (
<span
onClick={e => {
e.preventDefault();
Scheduler.log('Clicked ' + text);
}}>
{text}
</span>
);
}function App() {
Sched<div>
<Suspense fallback="Loading...">
<Child text="A" />
</Suspense>
<Suspense fallback="Loading...">
<Child text="B" />
</Suspense>
<Suspense fallback="Loading...">
<Child text="C" />
</Suspense>
<Suspense fallback="Loading...">
<Child text="D" />
</Suspense>
</div>
);
}const finalHTML = ReactDOMServer.renderToString(<App />);assertLog(['App', 'A', 'B', 'C', 'D']);const container = document.createElement('div');
// We need this to be in the document since we'll dispatch events on it.
document.body.appendChild(container);container.innerHTML = finalHTML;const spanA = container.getElementsByTagName('span')[0];
c// priority, after we unsuspend.assertLog([]);// This click targetdispatchClickEvent(spanC);
dispatchClickEvent(spanD);assertLog(['App', 'C', 'Clicked C']);await act(async () => {
suspend = false;await promise;'A',// B should render]);document.body.removeChild(container);
  });  // @gate www
  it('hydrates the target boundary synchronously dulet isServerRendering = true;function Child({text}) {
const ref = React.if (!isServerRendering) {
React.useLayoutEffect(() => {
return setClick(ref.current, () => {
Scheduler.log('Clicked ' + text);
});
});
}return <span ref={ref}>{text}</span>;
}function App() {
Scheduler.log('App');
return (
<div><Child text="A" />
</Suspense>
<Suspense fallback="Loading...">
<Child text="B" />
</Suspe);// We need this to be in the document since we'll dispatch events on it.
d// boundary.
target.virtualclick();// We rendered App, B and then invoked the event without rendering A.
assertLog(['App', 'B', 'Clicked B']);// After continuing the scheduler, we finally hydrate A.
await waitForAll(['A']);document.body.removeChild(container);  it('hydrates at higher pri if sync did not work first time (createEventHandle)', async () => {
let suspend = false;
let isServerRendering = true;
let resolve;
const promise = new Promise(resolvePromise => (resolve = resolvePromise));
const setClick = ReactDOM.unstable_createEventHandle('click');function Child({text}) {
const ref = React.useRef(null);
if ((text === 'A' || text === 'D') && suspend) {
throw promise;
}
Scheduler.log(text);if (!isServerRendering) {
React.useLayoutEffect(() => {
return setClick(ref.current, () => {
Scheduler.log('Clicked ' + text);
});}return <span ref={ref}>{text}</span>;
}function App() {
Scheduler.log('App');
return (
<div>
<Suspense fallback="Loading...">
<Child text="A" />
</Suspense>
<Suspense fallback="Loading...">
<Child text="B" />
</Suspense>
<Suspense fallback="Loading...">
<Child text="C" />
</Suspense>
<Suspense fallback="Loading...">
<Child text="D" />
</Suspense>
</div>
);// We need this to be in the document since we'll dispatcisServerRendering = false;// A andReactDOMClient.hydrateRoot(container, <App />);// Nothing has been hydrated so far.
assertLog([]);// Continuing rendering will render B next.
await act(() => {target.virtualclick();assertLog(['App', 'B', 'C']);// After the click, we should prioritize D and the Click first,
// and only after that render A and C.
await act(async () => {resolve();});// no replay
assertLog(['D', 'A']);document.body.removeChild(container);
  });  // @gate wwwconst setClick = ReactDOM.unstable_createEventHandle('click');
let suspend =let resolve;
const promise = new Promise(resolvePromise => (resolve = resolvePromise));function Child({text}) {
const ref = React.useRef(null);
if ((text === 'A' || text === }React.useLayoutEffect(() => {
return setClick(ref.current, () => {
Scheduler.log('Clicked ' + text);
});
});return <span ref={ref}>{text}</span>;
}function App() {
Scheduler.log('App');
return (
<div>
<Suspen</Suspense>
<Susp</Suspense>
<Suspense fallback="Loading...">
<Child text="C" />
</Suspense><Child text="D" />
</Suspense>
</div>
);
}const finalHTML = ReactDOMServer.renderToString(<App />);assertLog(['App', 'A', 'B', 'C', 'D']);const container = document.createElement('div');
// We need this to be in the document since we'll dispatch events on it.
document.body.appendChild(container);container.innerHTML = finalHTML;const spanA = container.getElementsByTagName('span')[0];
const spanC = container.getElementsByTagName('span')[2];
const spanD = container.getElementsByTagName('span')[3];suspend = true;
ReactDOMClient.hydrateRoot(container, <App />);// Nothing has been hydrated so far.
acreateEventTarget(spanC).virtualclick();
createEventTarget(spanD).virtualclick();assertLog(['App', 'C', 'Clicked C']);await act(async () => {
suspend = false;
resolve();
await promise;
});assertLog([
'A',
'D',
// B should render last since it wasn't clicked.
'B',
]);document.body.removeChild(container);
  });  it('hydrates the hovered targets as higher priority for continuous events', async () => {
lconst promise = new Promise(resolvePromise => (resolve = if ((text === 'A' || text === 'D'}
Scheduler.log(text);
return (onClick={e => {Scheduler.log('Clicked ' + texonMouseEnter={e => {Scheduler.log('Hover ' + text);
}}></span>}function App() {return (
<div>
<Suspense fallback="Loadin</Suspense>
<Suspense fallback="Loading..."></Suspense>
<Suspense fallback="Loading.</Suspense>
<Susp</Suspense>
</div>
);
}
const finalHTML = ReactDOMServer.renderToString(<App />);
assertLog(['App', 'A', 'B', 'C', 'D']);
const container = document.createElement('div');document.body.appendChild(container);container.innerHTML = finalHTML;const spanB = container.getElementsByTagName('span')[1];
const spanC = container.getElementsByTagName('span')[2];
const spanD = container.getElementsByTagName('span')[3];suspend = true;// A and D will be suspended. We'll click on D which should take
// priority, after we unsuspend.
ReactDOMClient.hydrateRoot(container, <App />);// Nothing has been hydrated so far.
assertLog([]);  dispatchMouseHoverEvent(spanD, null);
dispatchClickEvent(spanD);// Hover over B and then C.
dispatchMouseHoverEvent(spanB, spanD);
dispatchMouseHoverEvent(spanC, spanB);assertLog(['App']);suspend = false;
resolve();
});// We should prioritize hydrating D first because we clicked it.
 'D',
'B', 'Hover C',
'A',
]);document.body.removeChild(container);
  });  it('replays capture phase for continuous events and respects stopPropagation', async () => {
let suspend = false;
let resolve;
const promise = new Promise(resolvePromise => (resolve = resolvePromise));function Child({text}) {
if ((text === 'A' || text === 'D') && suspend) {
throw promise;
}
Scheduler.log(text);
return (
<span
id={text}
onClickCapture={e => {
e.preventDefault();
Scheduler.log('Capture Clicked ' + text);
}}
onCliScheduler.log('Clicked ' + text);onMouseEnter={e => {Scheduler.log('Mouse Enter ' + text);
}}
onMouseOut={e => {Scheduler.log('Mouse Out ' + text);onMouseOutCapture={e => {e.stopPropagation();
Scheduler.log('Mouse Out CaptuonMouseOverCapture={e => {
e.preventDefault();
e.stopPropagation();}}
onMouseOver={e => Scheduler.log('Mouse Over ' + text);
}}>
<div
onMouseOverCapture={e => {
e.preventDefault();
Scheduler.log('Mouse Over Capture{text}
</div>
</span>
);
}function App() {
Scheduler.log('App');
return onClickCapture={e => {
e.preventDefault();}}
onMou}}>
<Suspense fallback="Loading...">
<Child text="A" />
</Suspense>
<Suspense fallback="Loading...">
<Child text="B" />
</Suspense><Child text="C" />
</Suspense>
<Suspense fallback="Loading...">
<Child text="D" />
</Suspense>
</div>}const finalHTML = ReactDOMServer.renderToString(<App />);assertLog(['App', 'A', 'B', 'C', 'D']);const container = document.createElement('div');
// We need this to be in the document since we'll dispatch events on it.
document.body.appendChild(container);container.innerHTML = finalHTML;const spanB = document.getElementById('B').firstChild;
const spanC = document.getElementById('C').firstChild;
const spanD = document.getElementById('D').firstChild;suspend = true;// A and D will be suspended. We'll click on D which should take
// priority, after we unsuspend.
ReactDOMClient.hydrateRoot(container, <App />);// Nothing has been hydrated so far.
assertLog([]);await act(async () => {
// CldispatchClickEvent(spanD);
// Hover over B and then C.
dispatchMouseHoverEvent(spanB, spanD);
dispatchMouseHoverEvent(spanC, spanB);assertLog(['App']);suspend = false;
resolve();
});// We should prioritize hydrating D first because we clicked it.
// but event isnt replayed
assertLog([
'D',
'B', // Ideally this should be later.
'C',
// Mouse out events aren't replayed
// 'Mouse Out Capture B',
// 'Mouse Out B',
'Mouse Over Capture Parent',
'Mouse Over Capture C',
// Stop propagation stops these
// 'Mouse Over Capture Inner C',
// 'M]);// This test shows existing quirk where stopPropagdispatchMouseHoverEvent(spanC, spanB);'Mouse Out Capture B',
// stopPropagation stops these
// 'Mouse Out B','Mouse Over Capture Parent',// Stop propagation stops these
// 'Mouse Over Capture Inner C',
// 'Mouse Over C',  });  describe('can handle replaying events as part of multiple instances of React', () => {
let resolveInner;let innerPromise;
let outerPromise;
let OuterScheduler;let innerDiv;let OuterTestUtils;
let InnerTestUjest.resetModules();
let OuterReactDOMClient;
let InnerReactDOMClient;jest.isolateModules(() => {
OuterReactDOMClient = require('react-dom/cliOuterTestUtils = require('internal-test-ujest.isolateModules(() => {
InnerReactDOMClient = require('react-dom/client');
InnerScheduler = require('scheduler');
InnerTestUtils = require('internal-test-utils');
});expeconst innerContainer = document.createElement('div');let suspendOuter = false;
outerPromise = new Promise(res => {
resolveOuter = () => {
suspendOuter = false;
res();
};if (suspendOuter) {
Outer}
OuterScheduler.log('Outer');
const innerRoot = outerContainer.querySelector('#inner-root');
return (
<div
id="inner-root"
onMouseEnter={() => {
Scheduler.log('Outer Mouse Enter');
}}
dangerouslySetInnerHTML={{
__html: innerRoot ? innerRoot.innerHTML : '',
}}
/>
);
}
const OuterApp = () => {
return (
<Suspense fallback={<div>Loading</div>}>
<Outer />
</Suspense>
);
};let suspendInner = false;
innersuspendInner = false;
res();
};
});
function Inner() {
if (suspendInner) {
InnerScheduler.log('Suspend Inner');
throw innerPromise;
}
InnerScheduler.log('Inner');
return (
<div
id="inner"
onMouseEnter={() => {
Scheduler.log('Inner Mouse Enter');
}}
/>
);
}
const InnerApp = () => {
return (
<Suspense fallback={<div>Loading</div>}>
<Inner />
</Suspense>};document.body.appendChild(outerConouterContainer.innerHTML = outerHTML;const innerWrapper = document.querySelector('#inner-root');
innerWrapper.appendChild(innerContainer);
const innerHTML = ReactDOMServer.renderToString(<InnerApp />InnerTestUtils.asseOuterReactDOMClient.hydrateRoot(outerContainer, <OuterApp />),
);
await InnerTestUtils.act(() =>);OuterTestUtils.assertLog(['Suspend Outer']);
InnerTestUtils.assScheduler.unstable_flushAllWithoutAsserting();
OuterScheduler.unstable_flushAllWithoutAsserting();
InnerScheduler.unstable_flushAllWithoutAsserting();
});OuterTestUtils.assertLoInnerTestUtils.assertLog([]);assertLog([]);
});
afterEach(async () => {});it('Inneawait OuterTestUtils.act(() => {
resolveInner();
});// Inner App renders because it is unblocked
InnerTestUtils.assertLog(['Inner']);
// No event is replayed yet
assertLog([]);dispatchMouseHoverEvent(innerDiv);
OuterTestUtils.assertLog([]);
InnerTestUtils.assertLog([]);
// No event is replayed yet
assertLog([]);await InnerTestUtils.act(async () => {
await O// Its blocked on the outer app replaying the event
InnerOuterTestUtils.waitFor(['Outer']);
// No event is replayed yet
assertLog([]);
});assertLog(['Inner Mouse Enter', 'Outer Mouse Enter']);
});it('Outer hydrates first then Inner', async () => {
dispatchMouseHoverEvent(innerDiv);await act(async () => {
resolveOuter();
await outerPromise;
Scheduler.unstable_flushAllWithoutAsserting();
OuterScheduler.unstable_flushAllWithoutAsserting();
InnerScheduler.unstable_flushAllWithoutAsserting();
});// Outer resolves and scheduled replay
OuterTestUtils.assertLog(['Outer']);
// Inner App is still blocked
InnerTestUtils.assertLog([]);// Replay outer event
await act(() => {
Scheduler.unstable_flushAllWithoutAsserting();
OuterScheduler.unstable_flushAllWithoutAsserting();
InnerScheduler.unstable_flushAllWithoutAsserting();
});// Inner is still blocked so when Outer replays the event in capture phase
// inner ends up caling stopPropagation
assertLog([]);
OuterTestUtils.assertLog([]);
InnerTestUtils.assertLog(['Suspend Inner']);dispatchMouseHoverEvent(innerDiv);
OuterTestUtils.assertLog([]);
InnerTestUtils.assertLog([]);
assertLog([]);await act(async () => {
resolveInner();
await innerPromise;
Scheduler.unstable_flushAllWithoutAsserting();
OuterScheduler.unstable_flushAllWithoutAsserting();
InnerScheduler.unstable_flushAllWithoutAsserting();
});// Inner hydrates
InnerTestUtils.assertLog(['Inner']);
// Outer was hydrated earlier
OuterTestUtils.assertLog([]);await act(() => {
Scheduler.unstable_flushAllWithoutAsserting();
OuterScheduler.unstable_flushAllWithoutAsserting();
InnerScheduler.unstable_flushAllWithoutAsserting();
});// First Inner Mouse Enter fires then Outer Mouse Enter
assertLog(['Inner Mouse Enter', 'Outer Mouse Enter']);
});
  });  it('replays event with null target when tree is dismounted', async () => {
let suspend = false;
let resolve;
const promise = new Promise(resolvePromise => {
resolve = () => {
suspend = false;
resolvePromise();
};
}throw promise;
}
Scheduler.log('Child');
return (
<div
onMouseOver={() => {
Scheduler.log('on mouse over');
}}>
Child
</div>
);
}function App() {
return (
<Suspense>
<Child />
</Suspense>
);
}const finalHTML = ReactDOMServer.renderToString(<App />);
assertLog(['Child']);const container = document.createElement('div');document.body.appendChild(container);
container.innerHTML = finalHTML;
suspend = true;ReactDOMClient.hydrateRoot(container, <App />);const childDiv = container.firstElementChild;await act(async () => {
dispatchMouseHoverEvent(childDiv);// Not hydrated so event is saved for replay and stopPropagation is called
assertLog([]);resolve();
await waitFor(['Child']);ReactDOM.flushSync(() => {
container.removeChild(childDiv);const container2 = document.createElement('div');
conta});});// on the container firing.
assertLog(['container2 mouse over']);document.body.removeChild(container);
  });  it('hydrates the last target pathlet resolve;if ((text === 'A' || text === 'D') && suspend) {
throw promise;
}return (onMouseEnter={e => {
e.preventDefault();
Scheduler.log('Hover ' + text);{text}
</span>}function App() {
Scheduler.log('App');
return (
<div>
<Suspense fallback="Loading...">
<Child text="A" />
</Suspense><div> <Child text="B" />
</Suspense>
</div></Suspense>
<Suspense fallback="Loading...">
<Child text="D" />
</Suspense>
</div>
);
}const finalHTML = ReactDOMServer.renderToString(<App />);assertLog(['App', 'A', 'B', 'C', 'D']);const container = document.createElement('div');
// We need this to be in the document since we'll dispatch events on it.
document.body.appendChild(container);container.innerHTML = finalHTML;const spanB = container.getElementsByTagName('span')[1];
const spanC = container.getElementsByTagName('span')[2];
const spanD = container.getElementsByTagName('span')[3];suspend = true;// A and D will be suspended. We'll click on D which should take
// priority, after we unsuspend.
ReactDOMClient.hydrateRoot(container, <App />);// Nothing has been hydrated so far.
assertLog([]);// Hover over B and then C.
dispatchMouseHoverEvent(spanB, spanD);
disresolve();
await promise;
});// We should prioritize hydrating D first because we clicked it.
// Next we should hydrate C since that's the current hover target.
// Next it doesn't matter if we hydrate A or B first but as an
// implementation detail we're currently hydrating B first since
// we at one point hovered over it and we never deprioritized it.
assertLog(['App', 'C', 'Hover C', 'A', 'B', 'D']);document.body.removeChild(container);
  });  it('hydrates the last explicitly hydrated target at higher priority', async () => {
function Child({text}) {
Scheduler.log(text);
return <span>{text}</span>;
}function App() {
Schedul<div>
<Susp</Suspense>
<Suspense fallback="Loading...">
<Child text="B" />
</Suspense>
<Suspense fallback="Loading...">
<Child text="C" />
</Suspense>
</div>}const finalHTML = ReactDOMServer.renderToString(<App />);assertLog(['App', 'A', 'B', 'C']);const container = document.createElement('div');
container.innerHTMLassertLog([]);// Increase priority of B and then C.
root.unstable_scheduleHydration(spanB);
root.unstable_scheduleHydration(spanC);// We should prioritize hydrating C first because the last added
// gets highest priority followed by the next added.
await waitForAll(['A  it('hydrates before an update even if hydration moves away from it', async () => {
function Child({text}) {
Scheduler.log(text);
return <span>{text}</span>;
}
const ChildWithBoundary = React.memo(function ({text}) {
return (
<Suspense fallback="Loading...">
<Child text={text} />
<Ch);
});function App({a}) {React.useEffect(() => {
Scheduler.log('Commit');return (
<div>
<ChildWithBoundary text={a} />
<ChildWithBoundary text="B" />
<ChildWithBoundary text="C" />
</div>
);container.innerHTML = finalHTML;// We need this to be in the document since we'll dispatch events on it.
document.body.appendChild(container);const spanA = container.getElementsByTagName('span')[0];
const spanB = container.getElementsByTagName('span')[2];
const spanC = container.getElementsByTagName('span')[4];await act(async () => {
const root = ReactDOMClient.hydrateRoot(container, <App a="A" />);
// Hydrate the shell.
await waitFor(['App', 'Commit']);// Render an update at Idle priority that needs to update A.TODO_scheduleIdleDOMSchedulerTask(() => {
root.render(<App a="AA" />);
});// Start rendering. This will force the first boundary to hydrate
// by scheduling it at one higher pri than Idle.
await waitFor([
'App',// Start hydrating A
'A',
]);// Hover over A which (could) schedule at one higher pri than Idle.
dispatchMouseHoverEvent(spanA, null);// Before, we're done we now switch to hover over B.
// This is meant to test that this doesn't cause us to forget that
// we still have to hydrate A. The first boundary.
// This also tests that we don't do the -1 down-prioritization of
// continuous hover events because that would decrease its priority
// to Idle.
dispatchMouseHoverEvent(spanB, spanA);// Also click C to prioritize that even higher which resets the
// priority levels.
dispatchClickEvent(spanC);assertLog([
// Hydrate C first since we clicked it.
'C',
'c// Finish hydration of A since we forced it to hydrate.
'A',
'a',
// Also, hydrate B since we hovered over it.
// It's not important which one comes first. A or B.
// As long as they both happen before the Idle update.
'B',
'b',
// Begin the Idle update again.
'App',
'AA',
'aa',
'Commit',
]);
});const spanA2 = container.getElementsByTagName('span')[0];
// This is supposed to have been hydrated, not replaced.
expect(spanA).toBe(spanA2);document.body.removeChild(container);
  });  it('fires capture event handlers and native events if content is hydratable during discrete event', async () => {
spyOnDev(console, 'error');
function Child({text}) {
Scheduler.log(text);
const ref = React.useRef();
React.useLayoutEffect(() => {
if (!ref.current) {
return;
}
ref.current.onclick = () => {
Scheduler.log('Native Click ' + text);
};return (
<span
ref={ref}Scheduler.log('Capture Clicked ' + text);
}}
onClick={e => {
Scheduler.log('Clicked ' + text);{text}
</span>}function App() {
Scheduler.log('App')<div>
<Suspense fallback="Loading...">
<Child text="A" />
</Suspense>
<Suspense fallback="Loading...">
<C</div>
);// We need this to be in the document siassertLog([]);// ThisdispatchClickEvent(span);// We rendered App, B and then invoked the event without rendering A.
assertLog(['App', 'B', 'Capture Clicked B', 'Native Click B', 'Clicked B']);// After continuing the scheduler, we finally hydrate A.
await waitForAll(['A']);document.body.removeChild(container);
  });  it('does not propagate discrete event if it cannot be synchronously hydrated', async () => {
let triggeredParent = false;
const promise = new Promise(() => {});if (suspend) {
throw promise;
}return (
<span
onClickCapture={e => {
e.stopPropagation();
triggerClick me
</span>}
function App() {
const onClick = () => {
triggeredParent = true;
};return (
<div
ref={n => {
if (n) n.onclick = onClick;
}}<Suspense fallback={null}>
<Child />
</Suspense>
</div>
);const finalHTML = ReactDOMServer.renderToString(<App />);assertLog(['App', 'Child']);const container = document.createElement('div');
document.body.appendChild(container);
container.iassertLog([]);const span = container.getElementsByTagName('span')[0];
dispatchClickEvent(span);assertLog(['App']);dispatchClickEvent(span);expect(triggeredParent).toBe(false);
expect(triggeredChild).toBe(false);
  });  it('can attempt sync hydration if suspended root is still concurrently rendering', async () => {
let suspend = false;
let resolve;
const promise = new Promise(resolvePromise => (resolve = resolvePromise));
function Child({text}) {
if }return (
<span
onClickScheduler.log('Clicked ' + text);
}}></span>
);
}function App() {
Scheduler.log('App');
return (
<div>
<Ch);
}const finalHTML = ReactDOMServer.renderToString(<App />);assertLog(['App', 'A']);const container = document.createElement('div');
// We need this to be in the document since we'll dispatch events on it.
document.body.appendChildReactDOMClient.hydrateRoot(container, <App />);
});
await waitFor(['App']);// This should attempt to synchronously hydrate the root, then pause
// because it still suspended
const result = dispatchClickEvent(span);
expect(result).toBe(true);// Finish loading the data
await act(async () => {
suspend = false;
await resolve();
});// The app should have successful  });  it('can force hydration in response to sync update', async () => {
function Child({text}) {
Scheduler.log(`Child ${text}`);
return <span rfunction App({text}) {
Scheduler.log(`App ${text}`);
return (
<div>
<Suspense fallback={null}>
<Child text={text} />
</S);
}let spanRef;
const finalHTML = ReactDOMServer.renderToString(<App text="A" />);
assertLog(['App A', 'Childocument.body.appendChild(container);
container.innerHTML = finalHTML;
const initialSpan = container.getElementsByTagName('span')[0];
const root = ReactDOMClient.hydrateRoot(container, <App text="A" />);
root.render(<App text="B" />);
});
});
a  });  // @gate experimental || www
  it('can force hydration in response to continuous update', async () => {
function Child({text}) {
Scheduler.log(`Child ${text}`);
return <span ref={ref => (spanRef = ref)}>{text}</span>;
}
function App({text}) {
Scheduler.log(`App ${text}`);
return <Suspense fallback={null}>
<Child text={text} />
</Suspense>
</div>
);
}let spanRef;
const finalHTML = ReactDOMServer.renderToString(<App text="A" />);
assertLog(['App A', 'Child A']);
const container = document.createElement('div');
document.body.appendChild(container);
container.innerHTML = finalHTML;
const initialSpan = container.getElementsByTagName('span')[0];
const root = ReactDOMClient.hydrateRoot(container, <App text="A" />);
aroot.render(<App text="B" />);
});
});assertLog(['App B', 'Child A', 'App B', 'Child B']);
expect(initialSpan).toBe(spanRef);
  });  it('can force hydration in response to default update', async () => {
function Child({text}) {
Sched}
function App({text}) return (<Suspense fallback={null}>
<Child text={text} />
</Suspense>);const finalHTML = ReactDOMServer.renderToStriconst container = document.createElement('div');
document.body.appendChild(contconst initialSpan = container.getElementsByTagName('span')[0];
const rootawait act(() => {
root.render(<App text="B"assertLog(['App B', 'Child A', 'App B', 'Child B']);
expect(initialSpan).toBe(spa  it('regression test: can unwind context on selective hydration interruption', async () => {
const Context = React.createContext('DefaultContext');function ContextReader(props) {
const value = React.useContext(Context);
Scheduler.log(value);
return null;
}function Child({text}) {
Schedul}
const ChildWithBoundary = React.memo(function ({text}) {
return (<Child text={text} />
</Sus});function App({a}) {
Scheduler.log('App');
React.useEffect(() => {
Scheduler.log('Commit');return (
<>
<Context.Provider value="SiblingContext">
<ChildWithBoundary text={a} />
</Context.Provider>
<ContextReader />
</>
);
}
const finalHTML = ReactDOMServer.renderToString(<App a="A" />);
assertLog(['App', 'A', 'DefaultContext']);
const container = document.createElement('div');
container.innerHTML = finalHTML;
document.body.appendChild(container);const spanA = container.getElementsByTagName('span')[0];await act(async () => {
constroot.render(<App a="AA" />);
});
await waitFor(['App', 'A']);dispatchClickEvent(spanA);
assertLog(['A']);
await waitForAll(['App', 'AA', 'DefaultContext', 'Commit']);
});
  });  it('regression test: can unwind context on selective hydration interruption for sync updates', async () => {
const Context = React.createContext('DefaultContext');function ContextReader(props) {
const value = React.useContext(Context);
Scheduler.log(value);
return null;
}function Child({text}) {
Scheduler.log(text);
return <span>{text}</span>;
}
const ChildWithBoundary = React.memo(function ({text}) {
return (
<Suspense fallback="Loading...">
<Child text={text} />
</Suspense>
);Scheduler.log('App');Scheduler.log('Commit');return (
<>
<Context.Provider value="SiblingContext"></Context.Provider></>
);
}assertLog(['Appcontainer.innerHTML = finalHTML;await act(async () => {
const root = ReactDOMClient.hydrateRoot(container, <App a="A" />);
await waitFor(['App', 'DefaultContext', 'Commit']);});
assertLog(['App',});
});
