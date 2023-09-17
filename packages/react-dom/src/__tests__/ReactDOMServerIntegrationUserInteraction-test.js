/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */let ReactDOMS  // Reset warning cache.  React = require('react');
  ReactDOM = require('react-dom');
  ReactDOMServer = require('react-dom/server');
  ReactTestUtils = ReactDOM,
ReactDOMServer,
ReactTestUtils,
  };
}const {resetModules, itClientRenders, renderIntoDom, serverRender} =
  ReactDOMServerIntegrationUtils(initModules);describe('ReactDOMServerIntegrationUserInteraction', () => {
  let ControlledInput, ControlledTextArea, ControllControlledInput = class extends React.Component {
static defaultProps = {
type: 'text',
initialValue: 'Hello',
};
constructor() {
s}
handleChange(event) {this.props.onChange(event);
}}
render() {
return (
<input
type={this.props.type}
value={this.state.value}
onChange={this.handleChange.bind(this)}
/>
);
}
};
ControlledTextArea = class extends React.Component {
constructor() {
super();
this.state = {value: 'Hello'};
}
handleChange(event) {
if (this.props.onChange) {
this.props.onChange(event);
}
this.setState({value: event.target.value});
}
render() {
return (
<textarea
value={this.state.value}
onChange={this.handleChange.bind(this)}
/>
);
}
};
ControlledCheckbox = class extends React.Component {
constructor() {
super();
this.state = {value: true};
}
handleChange(event) {
if (this.props.onChange) {
this.props.onChange(event);
}
this.setState({value: event.target.checked});
}
render() {
return (
<input
type="checkbox"
checked={this.state.value}
onChange={this.handleChange.bind(this)}
/>
);
}
};
ControlledSelect = class extends React.Component {
constructor() {
super();
this.state = {value: 'Hello'};
}
handleChange(event) {
if (this.props.onChange) {
this.props.onChange(event);
}
this.setState({value: event.target.value});
}
render() {
return (
<select
value={this.state.value}
onChange={this.handleChange.bind(this)}>
<option key="1" value="Hello">
Hello
</option>
<option key="2" value="Goodbye">
Goodbye
</option>
</select>
);
}
};
  });  describe('user interaction with controlled inputs', function () {
itClientRenders('a controlled text input', async render => {
const setUntrackedValue = Object.getOwnPropertyDescriptor(
HTMLInputElement.prototype,
'value',
).set;let changeCount = 0;
const e = await render(
<ControlledInput onChange={() => changeCount++} />,
);
const container = e.parentNode;
document.body.appendChild(container);try {
expect(changeCount).toBe(0);
expect(e.value).toBe('Hello');// simulate a user typing.
setUntrackedValue.call(e, 'Goodbye');
e.dispatchEvent(new Event('input', {bubbles: true, cancelable: false}));expect(changeCount).toBe(1);
expect(e.value).toBe('Goodbye');
} fin}
});itClientRenders('a controlled textarea', async render => {
const setUntrackedValue = Object.getOwnPropertyDescriptor(
HTMLTextAreaElement.prototype,
'value',
).set;<ControlledTextArea onChange={() => changeCount++} />,
);
const container = e.parentNode;
document.body.appendChild(container);try {
expect(changeCount).toBe(0);
expect(e.value).toBe('Hello');// simue.dispatchEvent(new Event('input', {bubbles: true, cancelable: false}));expect(changeCount).toBe(1);
expect(e.value).toBe('Goodbye');
} finally {}
});itClientRenders('a controlled checkbox', async render => {
let changeCount = 0;<ControlledCheckbox onChange={() => changeCount++} />,
);
const container = e.parentNode;
document.body.appendChild(container);try {
expect(changeCount).toBe(0);
expexpect(e.checked).toBe(false);
} finally {
document.body.removeChild(container);
}
});itCHTMLSelectElement.prototype,
'value',
).set;let changeCount = 0;
const e = await render(
<ControlledSelect onChange={() => changeCount++} />,
);document.body.appendChild(container);try {
expect(changeCount).toBe(0);
expect(e.value).toBe('Hello');e.dispatchEvent(
new Event('change', {bubbles: true, cancelable: false}),
);expect(changeCount).toBe(1);} finally {
document.body.removeChild(container);
}
});
  });  describe('user interaction with inputs before client render', function () {
// // user starts to interact with a server-rendered form before
// ReactDOM.render is called. the client render should NOT blow away
// the changes the user has made.
const testUserInteractionBeforeClientRender = async (
element,
initialValue = 'Hello',
changedValue = 'Goodbye',) => {
const field = await serverRender(element);
expect(field[valueKey]).toBe(// client render on top of the server markup.
const clie// Note that we cannot use expect(clientField).toBe(field) because
// of jest bug #1772
expect(clientField === field).toBe(true);
// confirm that the client render has not changed what the user typed.
expect(clientField[valueKey]).toBe(changedValue);
};ilet changeCount = 0;
await testUserInteractionBeforeClientRender(
<ControlledInput onChange={() => changeCount++} />,
);
// not// an onChange. however, it does not now, so that's what this tests.
expect(changeCount).toBe(0);
});it('should not blow away user-interaction on successful reconnect to an uncontrolled range input', () =>
testUserInteractionBeforeClientRender(
<input type="text" defaultValue="0.5" />,
'0.5',));it('should not blow away user-interaction on successful reconnect to a controlled range input', async () => {
let changeCount = 0;
await testUserInteractionBefortype="range"
initialValue="0.25"
onChange={() => changeCount++}
/>,
'0);
expect(changeCount).toBe(0);
});it('should not blow away user-entered text on successful reconnect to an uncontrolled checkbox', () =>
testUserInteractionBeforeClientRender(
<input type="checkbox" defaultChecked={true} />,
true,
false));it('should not blow away user-entered text on successful reconnect to a controlled checkbox', async () => {
let changeCount = 0;
await testUserInteractionBeforeClientRender(
<ControlledCheckbox onChange={() => changeCount++} />,
true,
false,
'checked',
);
expect(changeCount).toBe(0);
});// skipping this test because React 15 does the wrong thing. it blows
// away the user's typing in the textarea.
xit('should not blow away user-entered text on successful reconnect to an uncontrolled textarea', () =>
testUserInteractionBeforeClientRender(<textarea defaultValue="Hello" />));// skipping this test because React 15 does the wrong thing. it blows
// away the user's typing in the textarea.let changeCount = 0;
await testUserInteractionBefore);
expect(changeCount).toBe(0);
});it('should not blow away user-selected value on successful reconnect to an uncontrolled select', () =>
testUserInteractionBeforeClientRender(
<select defaultValue="Hello">
<option key="1" value="Hello">
Hello
</option>
<option key="2" value="Goodbye">
Go</select>,
));it('should not blow away user-selected value on successful reconnectawait testUserInteractionBeforeClientRender(
<ControlledSelect onChange={() => changeCount++} />,
);
expect(changeCount).toBe(0);
});
  });
});
