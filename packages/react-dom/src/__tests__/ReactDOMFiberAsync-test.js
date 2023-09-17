/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */let Schedulerlet waitFo  HTMLInputElement.prototype,
  'value',
).set;describe('ReactDOMFiberAsync', () => {
  let container;  beforeEach(() => {
container = document.createElement('div');
React = reReactDOMClient = require('react-dom/client');
act = require('internal-test-utils').act;
Scheduler = require('scheduler');const InternalTestUtils = require('internal-test-utils');
wawindow.event = undefined;
  });  afterEach  });  it('renders synchronously by default', () => {
const ops = [];
ReactDOM.render(<div>Hi</div>, container, () => {
ops.push(container.textContent);
});
ReactDOM.render(<div>Bye</div>, container, () => {
ops.push(container.textContent);expect(ops).toEqual(['Hi', 'Bye']);
  });  it('flushSync batches sync updates and flushes them at the end of the batch', () => {
const ops = [];state = {text: ''};
push(val) {
this.componentDidUpdate() {
ops.push(this.state.text);
}instance = this;
return <span>{this.state.text}</span>;
}
}ReactDOM.render(<Component />, container);instance.push('A');
expect(ops).toEqual(['A']);
expect(container.textContent).toEqual('A');ReactDOM.flushSync(() => {
instance.push('B');
instance.push('C');
// Not flushed yet
expec});
expect(container.textContent).toEqual('ABC');
expect(ops).texpect(container.textContent).toEqual('ABCD');
expect(ops).toEqual(['A', 'ABC', 'ABCD']);
  });  it('flushSync flushes updates even if nested inside another flushSync', () => {
const ops = [];
let instance;class Component extends React.Component {
state = {text: ''};
push(val) {
this.setState(state => ({text: state.text + val}));
}
componentDidUpdate() {
ops.push(this.state.text);
}
rendereturn <span>{this.state.text}</span>;}ReactDOM.render(<Component />, container);instance.push('A');
expect(ops).toEqual(['A']);
expect(container.textContent).toEqual('A');instance.push('C');
// Not flushed yet
expect(container.textContent).toEqual('A');
expect(ops).toEqual(['A']);ReactDOM.flushSync(() => {
instance.push('D');
});
// The nested flushSync caused everything to flush.
expect(container.textContent).toEqual('ABCD');
expect(ops).toEqual(['A', 'ABCD']);
});
expect(container.textContent).toEqual('ABCD');
expect(ops).toEqual(['A', 'ABCD']);
  });componentDidUpdate() {
ReactDOM.flushSync();
}return null;
}
}// Initial mount
ReactDOM.render(<Component />, container);
// Update
expect(() => ReactDOM.render(<Component />, container)).toErrorDev(
'flushSync was called from inside a lifecycle method',
);
  });  describe('concurrent mode', () => {
it('does not perform deferred updates synchronously', async () => {
const inputRef = React.createRef();
const asyncValueRef = React.createRef();
constconst nextValue = e.target.value;this.setState({
asyncValue: nextValue,
});expect(asyncValueRef.current.textContent).toBe('');
});
this.setState({
syncValue: nextValue,
});
};render() {<div>
<input
 ref={inputRef}
 onChange={this.handleChange}
 defaultValue=""
/>
<p ref={asyncValueRef}>{this.state.asyncValue}</p>
<p ref={syncValueRef}>{this.state.syncValue}</p>
</div>
);}
const root = ReactDOMClient.createRoot(container);
await act(() => root.render(<Counter />));
expect(asyncValueRef.current.textContent).toBe('');
expect(syncValueRef.current.textContent).toBe('');await act(() => {
setUntrackedInputValue.call(inputRef.current, 'hello');
inputRef.current.dispatchEvent(
new MouseEvent('input', {bubbles: true}),
);expect(asyncValueRef.current.textContent).toBe('');
expect(syncValueRef.current.textContent).toBe('hello');
});// Should flush both updates now.
expect(asyncValueRef.current.textContent).toBe('hello');
expect(syncValueRef.current.textContent).toBe('hello');
});it('top-level updates are concurrent', async () => {
constroot.render(<div>Hi</div>);
expect(container.textContent).toEqual('');
});
expect(container.textContent).toEqual('Hi');await act(() => {
root.render(<div>Bye</div>);});
expect(container.textContent).toEqual('Blet instance;
class Component extends React.Component {
state = {step: 0};
render() {
instance = this;
return <div>{this.state.step}</div>;
}
}const root = ReactDOMClient.createRoot(container);await act(() => {
root.render(<Component />);
expect(container.textContent).toEqual('');
});
expect(container.textContent).toEqual('0');await act(() => {
in});
expect(container.textContent).toEqual('1');
});it('flushSync flushes updates before end of the tick', async () => {
let instance;class Component extends React.Component {
state = {text: ''};
push(val) {
this.setState(state => ({text: state.text + val}));
}
componentDidUpdate() {
Scheduler.log(this.state.text);
}
render() {
instance = this;
return <span>{this.state.text}</span>;
}
}const root = ReactDOMClient.createRoot(container);
await act(() => root.render(<Component />));// Updates are async by default
instance.push('A');expect(container.textContent).toEqual('');ReactDOM.flushSync(() => {
instance.push('B');
instance.push('C');
// Not flushed yet
expect(container.textContent).toEqual('');
assertLog([]);
});
// Only the active updates have flushed
if assertLog(['ABC']);
} else {
expect(container.textContent).toEqual('BC');
assertLinstance.push('D');
if (gate(flags => flags.enableUnifiedSyncLane)) {
expect(container.textContent).toEqual('ABC');
} else {
expect(container.textContent).toEqual('BC');
}
assertLog([]);assertLog(['ABCD']);
expect(container.textContent).toEqual('ABCD');
});it('ignores discrete events on a pending removed element', async () => {
const disableButtonRef = React.createRef();
const submitButtonRef = React.createRef();function Form() {
const [setActive(false);
}return (
<div>
<button onClick={disableForm} ref={disableButtonRef}>
Disable
</button>
{active ? <button ref={submitButtonRef}>Submit</button> : null}
</div>
)await act(() => {});const disableButton = disableButtonRef.current;
expect(disableButton.tagName).toBe('BUTTON');const submitButton = submitButtonRef.current;
expect(submitButton.tagName).toBe('BUTTON');// Dispatch a click event on the Disable-button.
const firstEvent = document.createEvent('Event');
firstEvent.initEvent('click', true, true);expect(submitButton.current).toBe(undefined);
});it('ignores discrete events on a pending removed event listener', async () => {
const disableButtonRef = React.createRef();
const submitButtonRef = React.createRef();let formSubmitted = false;function Form() {
const [active, setActive] = React.useState(true);
functio}
function subm}
function disabledSubmitForm() {
// The form is disabled.
}
return (
<div>
<button onClick={disableForm} ref={disableButtonRef}>
Disable
</button>
<button
onClick={active ? submitForm : disabledSubmitForm}
ref={submitButtonRef}>
S</div>
);await act(() => {
root.render(<Form />);
});const disableButton = disableButtonRef.current;
expect(disableButton.tagName).toBe('BUTTONfirstEvent.initEvent('click', true, true);
await act(() => {
disableButton.dispatchEvent(firstEvent);
});// There should now be a pending update to disable the form.// This should not have flushed yet since it's in concurrent mode.
const submitButton = submitButtonRef.current;
expect(submitButton.tagName).toBe('BUTTON');// In the meantime, we can dispatch a new client event on the submit button.
const secondEvent = document.createEvent('Event');
secondEvent.initEvent('click', true, true);
// This should force the pending update to flush which disables the submit button before the event is invoked.
await act(() => {
submitButton.dispatchEvent(secondEvent);
});// Therefore the form should never have been submitted.
expect(formSubmitted).toBe(false);
});it('uses the newest discrete events on a pending changed event listener', async () => {
cconst [active, setActive] = React.useState(false);
function enableForm() {
setActive(true);
}
function submitForm() {
formSubmitted = true; // This should not get invoked
}
return (
<div>
<button onClick={enableForm} ref={enableButtonRef}>
Enable
</buttoSubmit
</button>
</div>}const root = ReactDOMClient.createRoot(container);
await act(() => {
root.render(<Form />);
});const enableButton = enableButtonRef.current;
efirstEvent.initEvent('click', true, true);
await act(() => {
enableButton.dispatchEvent(firstEvent);
});// There should now be a pending update to enable the form.// This should not have flushed yet since it's in concurrent mode.
const submitButton = submitButtonRef.current;
expect(submitButton.tagName).toBe('BUTTON');// In the meantime, we can dispatch a new client event on the submit button.
const secondEvent = document.createEvent('Event');
secondEvent.initEvent('click', true, true);
/submitButton.dispatchEvent(secondEvent);
});// Therefore the form should have been submitted.
expect(formSubmitted).toBe(true);
const {useState, useEffect} = React;function App({label}) {
const [step, setStep] = useState(0);if (step < 3) {
setStep(step + 1);}, [step]);// The component should keep re-rendering itself until `step` is 3.
return step === 3 ? 'Finished' : 'Unresolved';
}const containerA = document.createElement('div');
const containerB = document.createElReactDOM.render(<App label="A" />, containerA);
ReactDOM.render(<App label="B" />, containerB);
ReactDOexpect(containerB.textContent).toEqual('Finished');
expect(containerC.textContent).toEqual('Finished');
  });  it('updates flush without yielding Scheduler.log(props.text);}root.render(
<>
<Text text="A" />
<Text text="B" />
<Text text="C" />
</>,
);// Nothing should have rendered yet
expect(container.textContent).toEqual('');// Everything should render immediately in the next event
await waitForAll(['A', 'B', 'C']);
expect(container.textContent).toEqual('ABC');
  });  it('unmounted roots should never clear newer root content from a container', async () => {
const ref = React.createRef();function OldApp() {
const [value, setValue] = React.useState('old');
function hideOnClick() {
// Schedule a discrete update.
setValue('update');
// Synchronously unmount this root.
ReactDOM.flushSync(() => oldRoot.unmount());
}
return (
<button onClick={hideOnClick} ref={ref}>
{value}
</button>
)return <button ref={ref}>new</button>;
}const oldRoot = ReactDOMClient.createRoot(container);
await act(() => {
oldref.current.click();// The root should now be unmounted.
expect(container.textContent).toBe('');ReactDOM.flushSync(() => {
newRoot.render(<NewApp />);
});
ref.current.click();expect(container.textContent).toBe('new');
  });  it('should synchronously render the transition lane scheduled in a popState', async () => {
const [hasNavigated, setHasNavigated] = React.useState(falseScheduler.log(`popState`);
React.startTransition(() => {
setHasNavigated(true);setSyncState(true);
}
React.useEffect(() => {
window.addEventListener('popstate', onPopstate);
return () => {
window.removeEventListener('popstate', onPopstate);
};Scheduler.log(`render:${hasNavigated}/${syncState}`);
return null;
}await act(async () => {
root.render(<App />);
});const popStateEvent = new window.event = popStateEvent;
window.dispatchEvent(popStateEvent);
queueMicrotask(() => {
window.event = undefined;
});
});assertLog(['popState', 'render:true/true']);
await act(() => {
root.unmount();
});
  });  it('Should not flush transition lanes if there is no transition scheduled in popState', async () => {
let setHasNavigated;
function App() {
const [syncState, setSyncState] = React.useState(false);
const [hasNavigated, _setHasNavigated] = React.useState(false);
setHasNavigated = _setHasNavigated;
function onPopstate() {
setSyncState(true);
}React.useEffect(() => {
wwindow.removeEventListener('popstate', onPopstate);
};
}, []);Scheduler.log(`render:${hasNavigated}/${syncState}`);
retconst root = ReactDOMClient.createRoot(container);
await act(async () => {});
assertLog(['render:false/false']);React.startTransition(() => {
setHasNavigated(true);
});
await act(async () => {
conwindow.event = popStateEvent;queueMicrotask(() => {
window.event = undefined;
});assertLog(['render:false/true', 'render:true/true']);
await act(() => {
root.unmount();
});
  });  it('transition lane in popState should yield if it suspends', async () => {
const never = {then() {}};
const [text, setText] = React.useState('0');
_setText = setText;
if (shouldSuspend) {
Sched}
function onPopstate() {setShouldSuspend(val => !val);
});
}
React.useEffect(() => {
window.addEventListener('popstate', onPopstate);
return () => window.removeEventListener('popstate', onPopstate);
}, []);return text;
}const root = ReactDOMClient.createRoot(container);
a});
assertLog(['Child:false/0']);await act(() => {
const popStateEvent = new Event('popstate');window.dispatchEvent(popStateEvent);
queueMicrotask(() => {
window.event = undefined;
});
});_setText('1');
});
assertLog(['Child:false/1', 'Suspend!']);root.unmount();
  });