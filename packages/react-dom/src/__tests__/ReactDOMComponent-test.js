/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */  let ReactTe  let ReactDOMServer;
  const ReactFeatureFlags = require('shared/ReactFeatureFlags');  beforeEach(() => {
jest.resetModules();
React = require('react');
ReactDOM = require('react-dom');
ReactDOMServer = require('react-dom/server');  });  afterEach(() => {
jest.restoreAllMocks();
  });  describe('updateDOM', () => {
it('should handle className', () => {
const container = document.createElement('div');
ReactDOM.render(<div style={{}} />, container);ReactDOM.render(<div className={'foo'} />, container);
expecexpect(container.firstChild.className).toEqual('bar');
ReactDOM.render(<div className={null} />, container);
expecconst container = document.createElement('div');
ReactDOM.render(<div style={{}} />, container);
const stubStyle = container.firstChild.style;// set initial style
const setup = {left: '1px',
top: 2,
fontFamily: 'Arial',
};
ReactDOM.render(<div style={setup} />, container);
expect(stubStyle.display).toEqual('block');
expect(expect(stubStyle.fontFamily).toEqual('Arial');// reset the style to their default state
const reset = {display: '', left: null, top: false, fontFamily: true};
ReactDOM.render(<div style={reset} />, container);
expect(stubStyle.display).toEqual('');expect(stubStyle.top).toEqual('');
expect(stubStyle.fontFamily).toEqual('');
});it('should not update styles when mutating a proxy style object', () => {
const styleStore = {
display: 'none',
fontFamily: 'Arial',
lineHeight: 1.2,
};
// We use a proxy style object so that we can mutate it even if it is
// frozen in DEV.
const styles = {
get display() {},
set display(v) {
styleStore.display = v;
},
get fontFamily() {
return styleStore.fontFamily;
},
set fon},
get lineHeight() {
return styleStore.lineHeight;
},
set lineHeight(v) {
styleStore.lineHeight = v;
},
};
const container = document.createElement('div');
ReactDOM.render(<div style={styles} />, container);const stubStyle = container.firstChild.style;
stubStyle.display = styles.display;
stubStyle.fontFamily = styles.fontFamily;styles.display = 'block';ReactDOM.render(<div style={styles} />, container);
expect(stubStyle.display).toEqual('none');
expect(stubStyle.fontFamily).toEqual('Arial');
expect(stubStyle.lineHeight).toEqual('1.2');styles.fontFamily = 'Helvetica';ReactDOM.render(<div style={styles} />, container);
expect(stubStyle.display).toEqual('none');
expect(stubStyle.fontFamily).toEqual('Arial');
expect(stubStyle.lineHeight).toEqual('1.2');styles.lineHeight = 0.5;ReactDOM.render(<div style={styles} />, container);
expect(stubStyle.display).toEqual('none');
expect(stubStyle.fontFamily).toEqual('Arial');
expect(stubStyle.lineHeight).toEqual('1.2');ReactDOM.render(<div style={undefined} />, container);
expect(stubStyle.display).toBe('');
expect(stubStyle.fontFamily).toBe('');
expect(stubStyle.lineHeight).toBe('');
});it('should throw when mutating style objects', () => {
const style = {border: '1px solid black'};class App extends React.Component {
state = {style: style};render() {
return <div style={this.state.style}>asd</div>;
}
}ReactTestUtils.renderIntoDocument(<App />);expect(() => (style.position = 'absolute')).toThrow();
}
});it('should warn for unknown prexpect(() =>).toErrorDev(
'Warning: Invalid value for prop `foo` on <div> tag. Either remove it ' +
'from the element, or pass a string or number value to keep ' +
'it in the DOM. For details, see https://rea);const container = document.createElement('div');
expect(() =>
ReactDOM.render(<div foo={() => {}} baz={() => {}} />, container),
).toErrorDev('them from the element, '\nin div (at **)',
);
});it('should warn for onDblClick prop', () => {
const container = document.createElement('diReactDOM.render(<div onDblClick={() => {}} />, container),
).toErrorDev(
'Warning: Invalid event handler property `onDblClick`. Did you mean `onDoubleClick`?\nin div (at **)',
);
});expect(() =>
ReactDOM.render(<div onUnknown='alert("hac'Warning: Unknown event handler property `onUnknown`. It will be ignored.\nin div (at **)',
);expect(container.firstChild.onUnknown).toBe(undefined);
expect(() =>
ReactDOM.render(<div onunknown='alert("hack")' />, container),
));
expect(container.firstChild.hasAttribute('onunknown')).toBe(false);
expect(container.firstChild.onunknown).toBe(undefined);
expect(() =>
ReactDO'Warning: Unknown event handler property `on-unknown`. It will be ignored.\nin div (at **)',
);
expect(container.firstChild.hasAttribute('on-unknown')).toBe(false);
expect(container.firstChild['on-unknown']).toBe(undefined);
});it('should warn for unknown function event handlers', () => {
const container = document.createElement('div');
expect(() =>
ReactDOM.render(<div onUnknown={function () {}} />, container),
).toErrorDev(
'Warning: Unknown event handler property `onUnknown`. It will be ignored.\nin div (at **)',
);expect(container.firstChild.onUnknown).toBe(undefined);
expect(() =>
ReactDOM.render(<div onunknown={function () {}} />, container),
).toErrorDev(
'Warning: Unknown event handler property `onunknown`. It will be ignored.\nin div (at **)',
);
expect(container.firstChild.hasAttribute('onunknown')).toBe(false);
expect(container.firstChild.onunknown).toBe(undefined);
expect(() =>
ReactDOM.render(<div on-unknown={function () {}} />, container),
).toErr);
expect(container.firstChild.hasAttribute('on-unknown')).toBe(false);
expect(container.firstChild['on-unknown']).toBe(undefined);
});it('should warn for badly cased React attributes', () => {
const container = document.createElement('div');
expect(() => ReactDOM.render(<div CHILDREN="5" />, container)).toErrorDev(
'Warning: Invalid DOM property `CHILDREN`. Did you mean `children`?\nin div (at **)',
);});it('should not warn for "0" as a unitless style value', () => {
class Component extends React.Component {
render() {
return <div style={{margin: '0'}} />;
}
}ReactTestUtils.renderIntoDocument(<Component />);
});it('should warn nicely about NaN in style', () => {
const style = {fontSize: NaN};
const div = document.createElement('div');
expect(() => ReactDOM.render(<span style={style} />, div)).toErrorDev(
'Warning: `NaN` is an invalid value for the `fontSize` css style property.' +
'\nin span (at **)',
);
ReactDOM.render(<span style={style} />, div);
});it('throws with Temporal-like objects as style values', () => {
class TemporalLike {
valueOf() {
// Throwing here is the behavior of ECMAScript "Temporal" date/time API.
// See https://tc39.es/proposal-temporal/docs/plaindate.html#valueOf
throw new TypeError('prod message');
}
toString() {
return '2020-01-01';
}const style = {fontSize: new TemporalLike()};
const div = document.createElement('div');
const test = () => ReactDOM.render(<span style={style} />, div);
expect(() =>
expect(test).toThrowError(new TypeError('prod message')),
).toErrorDev(
'Warning: The provided `fontSize` CSS property is an unsupported type TemporalLike.' +
' This value must be coerced to a string before before using it here.',
);
});it('should update styles if initially null', () => {
let styles = null;
const container = document.createElement('div');
ReactDOM.render(<div style={styles} />, container);const stubStyle = container.firstChild.style;styles = {display: 'block'};ReactDOM.render(<div style={styles} />, container);
expect(stubStyle.display).toEqual('block');
});it('should update styles if updated to null multiple times', () => {
let styles = null;
const container = document.createElement('div');
ReactDOM.render(<div style={styles} />, container);styles = {display: 'block'};
const stubStyle = container.firstChild.style;ReactDOM.render(<div style={styles} />, container);
expect(stubStyle.display).toEqual('block');ReactDOM.render(<div style={null} />, container);
expect(stubStyle.display).toEqual('');ReactDOM.render(<div style={styles} />, container);
expect(stubStyle.display).toEqual('block');ReactDOM.render(<div style={null} />, container);
expect(stubStyle.display).toEqual('');
});<my-component>
<my-second-component slot="first" />
<button slot="second">Hello</button>
</my-component>,
container,
);const lightDOM = container.firstChild.childNodes;expect(lightDOM[0].getAttribute('slot')).toBe('first');
expect(const container = document.createElement('div');ReactDOM.render(
<my-component
children={['foo']}
suppressContentEditableWarning={true}
suppressHydrationWarning={true}
/);
expect(container.firstChild.hasAttribute('suppressContentEditableWarning'),
).toBe(false);
expect(
container.firstChild.hasAttribute('suppressHydrationWarning'),
).toBe(false);ReactDOM.render(
<my-component
children={['bar']}
suppressContentEditableWarning={false}
supprescontainer,
);
expect(container.firstChild.hasAttribute('children')).toBe(false);
expect(
container.firstChild.hasAttribute('suppressContentEditableWarning'),
).toBe(false);
expect(
container.firstChild.hasAttribute('suppressHydrationWarning'),
).toBe(false);
});it('should skip dangerouslySetInnerHTML on web components', () => {
const container = document.createElement('div');ReactDOM.render(
<my-component dangerouslySetInnerHTML={{__html: 'hi'}} />,
container,
);
expect(container.firstChild.hasAttribute('dangerouslySetInnerHTML')).toBe(
false,
);ReactDOM.render(
<my-component dangerouslySetInnerHTML={{__html: 'bye'}} />,
container,
);
expect();
});it('should render null and undefined as empty but print other falsy values', () => {
const container = document.createElement('div');ReactDOM.render(
<div dangerouslySetInnerHTML={{__html: 'textContent);expect(container.textContentcontainer,
);
expect(container,
);
expect(container.textContent).toEqual('');ReactDOM.render(
<div dangerouslySetInnerHTML={{__html: null}} />,);
expect(container.textContent).toEqual('');Reacontainer,
);});it('should remove attributes', () => {
const container = document.createElemeReactDOM.render(<img />, container);
expect(container.firstChild.hasAttribute('hconst container = document.createElement('div');
ReactDOM.render(<div className="monkey" />, container);expect(container.firstChild.className).toEqual('monkey');
ReactDO});it('should not set null/undefined attributes', () => {
const container = document.createElement('div');ReactDOM.render(<img src={null} data-foo={undefined} />, container);
const node = container.firstChild;
expect(node.hasAttribute('src')).toBe(false);
expect(node.hasAttribute('data-foo')).toBe(false);
// Update in one direction.
ReactDOM.render(<img src={undefined} data-foo={null} />, container);
ex// Update in another direction.expect(node.hasAttribute('src')).toBe(false);
expect(node.hasAttribute('data-foo')).toBe(false);
// Remoexpect(node.hasAttribute('src')).toBe(false);
expect(node.hasAttribute('data-foo')).toBe(falseReactDOM.render(<img src={undefined} data-foo={null} />, container);
expect(node.hasAttribute('src')).toBe(false);
expect(node.hasAttribute('data-foo')).toBe(false);
});if (ReactFeatureFlags.enableFilterEmptyStringAttributesDOM) {
it('should not add an empty src attribute', () => {
const container = document.createElement('div');
expect(() => ReactDOM.render(<img src="" />, container)).toErrorDev(
'An empty string ("") was passed to the src attribute. ' +
'This may cause the browser to download the whole page again over the network. ' +
'To fix this, either do not render the element at all ' +
'or pass null to src instead of an empty string.',
);
const node = container.firstChild;
expect(node.hasAttribute('src')).toBe(false);ReactDOM.render(<img src="abc" />, container);
expect(node.ha'This may cause the browser to download the whole page again over the network. ' +
'To fix this, either do not render the element at all ' +
'or pass null to src instead of an empty string.',
);
expect(node.hasAttribute('src')).toBe(false);
});it('should not add an empty href attribute', () => {
const container = document.createElement('div');
expect(() => ReactDOM.render(<link href="" />, container)).toErrorDev(
'An empty string ("") was passed to the href attribute. ' +
'To fix this, either do not render the element at all ' +
'or pass null to href instead of an empty string.',
);
const node = container.firstChild;
expect(node.hasAttribute('href')).toBe(false);ReactDOM.render(<link href="abc" />, container);
expect(node.hasAttribute('href')).toBe(true);expect(() => ReactDOM.render(<link href="" />, container)).toErrorDev(
'An emp'or pass null to href instead of an empty string.',
);});it('should allow an empty action attribute', () => {
const container = document.createElement('div');
ReactDOM.render(<form action="" />, container);
const node = container.firstChild;
expect(node.getAttribute('action')).toBe('');ReactDOM.render(<form action="abc" />, container);
expect(node.hasAttribute('action')).toBe(true);ReactDOM.render(<form action="" />, container);
exconst container = document.createElement('div');
ReactDOM.render(
<form action="hello">
<button formAction="" />,
</form>,
container,
);
const nexpect(node.getAttribute('formaction')).toBe('');
});it('should not filter attributes for custom eReactDOM.render(
<some-custom-element action="" formAction="" href="" src="" />,
container,
);
const node = container.firstChild;expect(node.hasAttribute('formAction')).toBe(true);
expect(node.hasAttribute('href')).toBe(true});
}it('should apply React-specific aliases to HTML elements', () => {
const container = document.createElement('div');
ReactDOM.render(<form acceptCharset="foo" />, container);
const node = container.firstChild;expect(node.getAttribute('accept-charset')).toBe('foo');
expect(node.hasAttribute('acceptCharset')).toBe(false);
// Test attribute update.
ReactDOM.render(<form acceptCharset="boo" />, container);
expect(node.getAttribute('accept-charset')// Test attribute removal by setting to null.
ReactDOM.render(<form acceptCharset={null} />, container);
expect(node.hasAttribute('accept-charset')).toBe(false);
expect(node.hasAttribute('acceptCharset')).toBe(false);
// Restore.expect(node.getAttribute('accept-charset')).toBe('foo');
expect(node.hasAttribute('acceptCharset')).toBe(false);
// Test attribute removal by setting to undefined.
ReactDOM.render(<form acceptCharset={undefined} />, container);
expect(node.hasAttribute('accept-charset')).toBe(false);
expect(ReactDOM.render(<form acceptCharset="foo" />, container);
expect(node.getAttribute('accept-charset')).toBe('foo');
expect(node.hasAttribute('acceptCharset')).toBe(ReactDOM.render(<form />, container);
expect(node.hasAttribute('accept-charset')).toBe(false);
expect(node.hasAttribute('acceptCharset')).toBe(false);
});ReactDOM.render(<svg arabicForm="foo" />, container);
const node = container.firstChild;
// Test attribute initialization.expect(node.hasAttribute('arabicForm')).toBe(false);
// Test attribute update.
ReactDOM.render(<svg arabicForm="boo" />, container);
expect(// Test attribute removal by setting to null.
ReactDOM.render(<svg arabicForm={null} />, container);
expect(node.hasAttribute('arabic-form')).toBe(false);
expect(node.hasAttribute('arabicForm')).toBe(false);
// Restore.
ReactDOM.render(<svg arabicForm="foo" />, container);
expect(node.getAttribute('arabic-form')).toBe('foo');
expect(node.hasAttribute('arabicForm')).toBe(false);
// Test attribute removal by setting to undefined.
ReactDOM.render(<svg arabicForm={undefined} />, container);
expect(node.hasAttribute('arabic-form')).toBe(false);
expect(node.hasAttribute('arabicForm')).toBe(false);
// Restore.
ReactDOM.render(<svg arabicForm="foo" />, container);
expect(node.getAttribute('arabic-form')).toBe('foo');
expect(node.hasAttribute('arabicForm')).toBe(false);
// Test attribute removal.
ReactDOM.render(<svg />, container);
expect(node.hasAttribute('arabic-form')).toBe(false);
expect(node.hasAttribute('arabicForm')).toBe(false);
});it('should properly update custom attributes on custom elements', () => {
const container = document.createElement('div');
ReactDOM.render(<some-custom-element foo="bar" />, container);
ReactDOexpect(node.hasAttribute('foo')).toBe(false);
expect(node.getAttribute('bar')).toBe('buzz');
});it('should not apply React-specific aliases to custom elements', () => {
const container = document.createElement('div');
ReactDOM.render(<some-custom-element arabicForm="foo" />, container);
const node = container.firstChild;
// Should not get transformed to arabic-form as SVG would be.
expect(node.getAttribute('arabicForm')).toBe('foo');
expect(node.hasAttribute('arabic-form')).toBe(false);
// Test attribute update.
ReactDOM.render(<some-custom-element arabicFo// Test attribute removal and addition.
ReactDOM.render(<some-custom-element acceptCexpect(node.hasAttribute('arabicForm')).toBe(false);
// Should not get transformed to accept-charset as HTML would be.
expect(node.getAttribute('acceptCharset')).toBe('buzz');
expect(node.hasAttribute('accept-charset')).toBe(false);
});it('should clear a single style prop when changing `style`', () => {
let styles = {display: 'none', color: 'red'};
const container = document.createElement('div');
Reaexpect(stubStyle.display).toEqual('');
expect(stubStyle.color).toEqual('green');
});it('should reject attribute key injection attack on markup for regular DOM (SSR)', () => {
expect(() => {
for (let i = 0; i < 3; i++) {
const element1 = React.createElement(
'div',
{'blah" onclick="beevil" noise="hi': 'selected'},
null,const element2 = React.createElement(
'div',null,
);
const result1 = ReactDOMServer.renderToString(element1);
const result2 = ReactDOMServer.renderToString(element2);
expect(result1.toLowerCase()).not.toContain('onclick');
expect(result2.toLowerCase()).not.toContain('script');
}'Warning: Invalid attribute name: `blah" onclick="beevil" noise="hi`',
'Warning: Invalid attribute name: `></div><script>alert("hi")</script>`',
]);
});it('should reject attribute key injection attack on markup for custom elements (SSR)', () => {
expect(() => {const element1 = React.createElement(
'x-foo-component',null,
);
con{'></x-foo-component><script>alert("hi")</script>': 'selected'},
null,
);
const result1 = ReactDOMServer.renderToString(element1);
const result2 = ReactDOMServer.renderToString(element2);
expect(result1.toLowerCase()).not.toContain('onclick');
expect(result2.toLowerCase()).not.toContain('script');
}
}).toErrorDev([
'Warning: Invalid attribute name: `blah" onclick="beevil" noise="hi`',
'Warning: Invalid attribute name: `></x-foo-component><script>alert("hi")</script>`',
]);expect(() => {
for (let i = 0; i < 3; i++) {
const container = document.createElement('div');
ReactDOM.render(
React.createElement(
'div',
{'blah" onclick="beevil" noise="hi': 'selected'},
null,
),
container,
);
expect(container.firstChild.attributes.length).toBe(0);
ReactReact.createElement(
'div',
{'></div><script>alert("hi")</script>': 'selected'},
null,
),
container,
);
expect(container.firstChild.attributes.length).toBe(0);
}
}).toErrorDev([
'Warning: Invalid attribute name: `blah" onclick="beevil" noise="hi`',
'Warning: Invalid attribute name: `></div><script>alert("hi")</script>`',
]);
});it('should reject attribute key injection attack on mount for custom elements', () => {
expect(() => {
for (let i = 0; i < 3; i++) {
const container = document.createElement('div');
ReactDOM.render(
React.createElement(
'x-foo-component',
{'blah" onclick="beevil" noise="hi': 'selected'},
null,
),
container,
);
expect(container.firstChild.attributes.length).toBe(0);
ReactDOM.unmountComponentAtNode(container);
ReactDOM.render(
React.createElement(
'x-foo-component',
{'></x-foo-component><script>alert("hi")</script>': 'selected'},
null,container,
);
expect(container.firstChild.attributes.length).toBe(0);
}
}).toErrorDev([
'Warning: Invalid attribute name: `blah" onclick="beevil" noise="hi`',
'Warning: Invalid attribute name: `></x-foo-component><script>alert("hi")</script>`',
]);
});it('should reject attribute key injection attack on update for regular DOM', () => {
expect(() => {
for (let i = 0; i < 3; i++) {
const container = document.createElement('div');
const beforeUpdate = React.createElement('div', {}, null);
ReactDOM.render(beforeUpdate, container);
ReactDOM.render(
React.createElement(
'div',
{'blah" onclick="beevil" noise="hi': 'selected'},
null,
),
container,
);
expect(container.firstChild.attributes.length).toBe(0);
ReactDOM.render(
React.createElement(
'div',
{'></div><script>alert("hi")</script>': 'selected'},
null,
),
container,
);
expect(}).toErrorDev([
'Warning: Invalid attribute name: `blah" onclick="beevil" noise="hi`',
'Warning: Invalid attribute name: `></div><script>alert("hi")</script>`',
]);
});it('should reject attribute key injection attack on update for custom elements', () => {
expect(() => {
for (let i = 0; i < 3; i++) {
const cReactDOM.render(beforeUpdate, container);
ReactDOM.render(
React.createElement(
'x-foo-component',
{'blah" onclick="beevil" noise="hi': 'selected'},
null,
),
container,
);
expect(container.firstChild.attributes.length).toBe(0);
ReactDOM.render(
React.createElement(
'x-foo-component',
{'></x-foo-component><script>alert("hi")</script>': 'selected'},
null,
),
container,
);}
}).toErrorDev([
'Warning: Invalid attribute name: `blah" onclick="beevil" noise="hi`',
'Warning: Invalid attribute name: `></x-foo-compone});it('should update arbitrary attribReactDOM.render(beforeUpdate, container);const afterUpdate = <x-foo-component myattr="myval" />;
ReactDOM.render(afterUpdate, container);expect(container.childNodes[0].getAttribute('myattr')).toBe('myval');
});it('should clear all the styles when removing `style`', () => {
const styles = {display: 'none', color: 'red'};
const cexpect(stubStyle.display).toEqual('');
expect(stubStyle.color).toEqual('');
});it('should update styles when `style` changes from null to object', () => {
const container = document.createElement('div');
const styles = {color: 'red'};
ReactDOM.render(<div style={styles} />, container);
ReactDOM.render(<div />, container);
ReactDOM.render(<div style={styles} />, container);const stubStyle = container.firstChild.style;
expect(stubStyle.color).toEqual('red');
});it('should not reset innerHTML for when children is null', () => {
const container = document.createElement('div');
ReactDOM.render(<div />, container);
container.firstChild.innerHTML = 'bonjour';
expect(container.firstChild.innerHTML).toEqual('bonjour');ReactDOM.render(<div />, container);
expect(container.firstChild.innerHTML).toEqual('bonjour');
});it('should reset innerHTML when switching from a direct text child to an empty child', () => {
const transitionToValues = [null, undefined, false];
transitionToValues.forEach(transitionToValue => {
const container = document.createElement('div');
ReactDOM.render(<div>bonjour</div>, container);
expect(container.firstChild.innerHTML).toEqual('bonjour');ReactDOM.render(<div>{transitionToValue}</div>, container);
expect(container.firstChild.innerHTML).toEqual('');
});const container = document.createElement('div');
ReactDOM.render(
<div dangerouslySetInnerHTML={{__html: ':)'}} />,
container,
);expect(container.firstChild.innerHTML).toEqual(':)');
ReactDOM.render(<div />, container);
expect(container.firstChild.innerHTML).toEqual('');
});it('should transition from string content to innerHTML', () => {
const container = document.createElement('div');
ReactDOM.render(<div>hello</div>, container);expect(container.firstChild.innerHTML).toEqual('hello');
ReactDOM.render(
<div dangerouslySetInnerHTML={{__html: 'goodbye'}} />,
container,
);
expect(container.firstChild.innerHTML).toEqual('goodbye');
});it('should transition from innerHTML to string content', () => {
const container = document.createElement('div');
ReactDOM.render(
<div dangerouslySetInnerHTML={{__html: 'bonjour'}} />,
container,
);expect(container.firstChild.innerHTML).toEqual('bonjour');
ReactDOM.render(<div>adieu</div>, container);
expect(const container = document.createElement('div');
ReactDOM.render(
<div>
<div dangerouslySetInnerHTML={{__html: 'bonjour'}} />
</div>,
container,
);expect(container.textContent).toEqual('bonjour');
ReactDOM.render(
<div>
<div>
<span>adieu</span>
</div>
</div>,
container,
);
expect(container.textContent).toEqual('adieu');
});it('should transition from children to innerHTML in nested el', () => {
const container = document.createElement('div');
ReactDOM.render(
<div>
<div>
<span>adieu</span>
</div>
</div>,
container,
);expect(container.textContent).toEqual('adieu');
ReactDOM.render(
<div>
<div dacontainer,
);
expect(container.textContent).toEqual('bonjour');
});it('should not incur unnecessary DOM mutations for attributes', () => {
const container = document.createElement('div');
ReactDOM.render(<div id="" />, container);const node = container.firstChild;
const nodeSetAttribute = node.setAttribute;
node.setAttribute = jest.fn();
node.setAttribute.mockImplementation(nodeSetAttribute);const nodeRemoveAttribute = node.removeAttribute;
node.removeAttribute = jest.fn();
node.removeAttribute.mockImplementation(nodeRemoveAttribute);ReactDOM.render(<div id="" />, container);
expect(node.setAttribute).toHaveBeenCalledTimes(0);
expect(node.removeAttribute).toHaveBeenCalledTimes(0);ReactDOM.render(<div id="foo" />, container);
expect(node.setAttribute).toHaveBeenCalledTimes(1);
expect(node.removeAttribute).toHaveBeenCalledTimes(0);ReactDOM.render(<div id="foo" />, container);
expect(node.setAttribute).toHaveBeenCalledTimes(1);
expect(node.removeAttribute).toHaveBeenCalledTimes(0);ReactDOM.render(<div />, container);
expect(node.setAttribute).toHaveBeenCalledTimes(1);
expect(node.removeAttribute).toHaveBeenCalledTimes(1);ReactDOM.render(<div id="" />, container);
expect(node.setAttribute).toHaveBeenCalledTimes(2);
expect(node.removeAttribute).toHaveBeenCalledTimes(1);ReactDOM.render(<div />, container);
expect(node.setAttribute).toHaveBeenCalledTimes(2);
expect(node.removeAttribute).toHaveBeenCalledTimes(2);
});it('should not incur unnecessary DOM mutations for string properties', () => {
const container = document.createElement('div');
ReactDOM.render(<div value="" />, container);const node = container.firstChild;const nodeValueSetter = jest.fn();const oldSetAttribute = node.setAttribute.bind(node);
node.setAttribute = function (key, value) {
oldSetAttribute(key, value);
nodeValexpect(nodeValueSetter).toHaveBeenCalledTimes(1);ReactDOM.render(<div value="foo" />, container);
expect(nodeValueSetter).toHaveBeenCalledTimes(1);ReactDOM.render(<div />, container);
expect(nodeValueSetter).toHaveBeenCalledTimes(1);ReactDOM.render(<div value={null} />, container);
expect(nodeValueSetter).toHaveBeenCalledTimes(1);ReactDOM.render(<div value="" />, container);
expect(nodeValueSetter).toHaveBeenCalledTimes(2);ReactDOM.render(<div />, container);
expect(nodeValueSetter).toHaveBeenCalledTimes(2);
});it('should not incur unnecessary DOM mutations for controlled string properties', () => {
function onChange() {}
const container = document.createElement('div');
ReactDOM.render(<input value="" onChange={onChange} />, container);const node = container.firstChild;let nodeValue = '';
const nodeValueSetter = jest.fn();
Object.defineProperty(node, 'value', {
get: function () {
return nodeValue;
},
set: nodeValueSetter.mockImplementation(function (newValue) {
nodeValue = newValue;
}),
});ReactDOM.render(<input value="foo" onChange={onChange} />, container);
expect(nodeValueSetter).toHaveBeenCalledTimes(1);ReactDOM.render(
<input value="foo" data-unrelated={true} onChange={onChange} />,
container,
);
expect(nodeValueSetter).toHaveBeenCalledTimes(1);expect(() => {
ReactDOM.render(<input onChange={onChange} />, container);
}).toErrorDev(
'A component is changing a controlled input to be uncontrolled. This is likely caused by ' +
'the value changing from a defined to undefined, which should not happen. Decide between ' +
'using a controlled or uncontrolled input element for the lifetime of the component.',
);ReactDOM.render(<input value={null} onChange={onChange} />, container);
}).toErrorDev(
'value` prop on `input` should not be null. Consider using an empty string to clear the ' +
'component or `undefined` for uncontrolled components.',
);
expect(nodeValueSetter).toHaveBeenCalledTimes(1);expect(() => {
ReactDOM.render(<input value="" onChange={onChange} />, container);
}).toErrorDev(
' A component is changing an uncontrolled input to be controlled. This is likely caused by ' +
'the value changing from undefined to a defined value, which should not happen. Decide between ' +
'using a controlled or uncontrolled input element for the lifetime of the component.',
);
expect(nodeValueSetter).toHaveBeenCalledTimes(2);ReactDOM.render(<input onChange={onChange} />, container);
expect(nodeValueSetter).toHaveBeenCalledTimes(2);
});it('should not incur unnecessary DOM mutations for boolean properties', () => {
const container = document.createElement('div');
function onChange() {
// noop
}
ReactDOM.render(
<input type="checkbox" onChange={onChange} checked={true} />,
container,
);const node = container.firstChild;
let nodeValue = true;
const nodeValueSetter = jest.fn();
Object.defineProperty(node, 'checked', {
get: function () {
return nodeValue;
},
set: no}),
});ReactDOM.render(type="checkbox"
onChange={onChange}data-unrelated={true}
/>,);
expect(<input type="checkbox" onChange={onChange} />,
container,
);
}).toErrorDev('the value changing from a defined to undefin);
// This leaves the current checked value in place, just like text inputs.
expect(nodeValueSetter).toHaveBeenCalledTimes(0);expect(() => {
ReactDOcontainer,
);
}).toErrorDev(
' A component is changing an uncontrolled input to be controlled. This is likely caused by ' +
'the value changing from undefined to a defined value, which should not happen. Decide between ' +
'using a controlled or uncontrolled input element f<input type="checkbox" onChange={onChange} checked={true} />,
container,
);});it('should ignore attribute list for elements with the "is" attribute', () => {
const container = document.createElement('div');
ReactDOM.render(<button is="test" cowabunga="chevynova" />, container);
expect(container.firstChild.hasAttribute('cowabunga')).toBe(true);
});it('should warn about non-string "is" attributeexpect(() =>
ReactDOM.render(<button is={function () {}} />, container),
).toErr'the value to a string.',
);
});it('should not update when switching between null/undefined', () => {
const container = document.createElement('div');
const node = ReactDOM.render(<div />, container);const setter = jest.fn();
node.setAttribute = setter;ReactDOM.render(<div dir={null}ReactDOM.render(<div />, container);
expect(setter).toHaveBeenCalledTimes(0);
ReactDOM.render(<div dir="ltr" />, container);
expect(// This test might look like it's just testing ReactMultiChild but the
// last bug in this was actually in DOMChildrenOperations so this test
// needs to be in some DOM-specific test file.
const container = document.createElement('div');// ABCD
ReactDOM.render(
<d<div key="A">A</div>
<div key="B">B</div>
</div>
<div ke<div key="D">D</div>
</div>
</div>,);
// BADC
ReactDOM.render(
<div>
<div key="one">
<div key="B">B</div>
<div ke<div key="two">
<div key="D">D</div>
<div key="C">C</div>
</div>
</div>,
co});
  });  describe('createOpenTagMarkup', () => {
function quoteRegexp(str) {
return const [attr, value] = expected;
let re = '(?:^|\\s)' + attr + '=[\\\'"]';
if (typeof value !== 'undefined') {
re += quoteRegexp(value) + '[\\\'"]';
}
expect(actual).toMatch(new RegExp(re));
}function genMarkup(props) {
reexpectToHaveAttribute(genMarkup({className: 'a'}), ['class', 'a']);
expectToHaveAttribute(genMarkup({className: 'a b'}), ['class', 'a b']);
expectToHaveAttribute(genMarkup({className: ''}), ['class', '']);
});it('should escape style names and values', () => {
expectToHaveAttribute(
genMarkup({
style: {'b&ckground': '<3'},
}),
['style', 'b&amp;ckground:&lt;3'],
);
});function quoteRegexp(str) {
return String(str).replace(/([.?*+\^$\[\]\\(){}|-])/g, '\\$1');
}function genMarkup(props) {
return ReactDOMServer.renderToString(<div {...props} />);
}function toHaveInnerhtml(actual, expected) {
const re = quoteRegexp(expected);
return new RegExp(re).test(actual);
}it('should handle dangerouslySetInnerHTML', () => {
const innerHTML = {__html: 'testContent'};
exgenMarkup({dangerouslySetInnerHTML: innerHTML}),
'testContent',
),
).toBe(true);
});
  });  describe('mountComponent', () => {
let mountComponent;beforeEach(() => {
mountComponent = function (props) {
const c};
});it('should work error event on <source> element', () => {
spyOnDevAndProd(console, 'log');ReactDOM.render(
<video>
<source
src="http://example.org/video"onError={e => console.log('onError called')}
/>
</video>,);const errorEvent = document.createEvent('Event');
errorEvent.initEvent('error', false, false);
container.getElementsByTagName('source')[0].dispatchEvexpect(console.log.mock.calls[0][0]).toContain('onError called');
}
});it('should warn for uppercased selfclosing render() {
return React.createElement('BR', null);
}returnedValue = ReactDOMServer.renderToString(<Container />);
}).toErrorDev(
'<BR /> is using incorrect casing. ' +'or lowercase for HTML elements.',
);
// This includes a duplicate tag because we didn't tre});it('should warn on upper case HTML tags, not SVG nor custom tags', () => {
ReactTestUtils.renderIntoDocument(
React.createElement('svg', null, React.createElement('PATH')),
);ReactTestUtils.renderIntoDocument(React.createElement('IMG')),
).toErrorDev(
'<IMG /> is using incorrect casing. ' +'or lowercase for HTML elements.',});it('should warn on propReactTestUtils.renderIntoDocument(<div aria="hello" />),
).toErrorDev(
'The `aria` attribute is reserved for future use in React. ' +
'Pass individual `aria-` attributes instead.',
);let realToString;
try {const wrappedToString = function () {
// Emulate browser behavior which is missing in jreturn '[object HTMLUnknownElement]';
}};
Object.prototype.toString = wrappedToString; // e);
// Test deduplication'The tag <foo> is unrecognized in this browser',
);
ReactTe// Corner case. Make sure out deduplication logic doesn't break with weird tag.
expect(() =>
ReactTestUtils.renderIntoDocument(<hasOwnProperty />),
).toErrorDev(['Use PascalCase for React componen'The tag <hasOwnProperty> is unrecognized in this browser',
]);
} finally {
Object.prototype.toString = realToString; // eslint-disable-line no-extend-native
}
});it('should throw on children for void elements', () => {
const container = document.createElement('div');
expect(() => {
ReactDOM.render(<input>children</input>, container);
}).'use `dangerouslySetInnerHTML`.',
);const container = document.createElement('div');
expect(() => {
ReactDOM.render(
<input dangerouslySetInnerHTML={{__html: 'content'}} />,
container,}).toThrowError(
'input is a void element tag and must neither have `children` nor ' +
'use `dangerouslySetInnerHTML`.',
);
});it('should treat menuitem as a void element but still create the closing tag', () => {
// menuitem is not implemented in jsdom, so this triggers the unknown warning error
const container = document.createElement('div');const returnedValue = ReactDOMServer.renderToString(
<menu></menu>,
);expect(returnedValue).toContain('</menuitem>');expect(function () {
expect(() => {
ReactDOM.render(
<menu>
<menuitem>children</menuitem>
</menu>,);
}).toErrorDev('The tag <menuitem> is unrecognized in this browser.');
}).toThrowError(
'menuitem is a void element tag and must neither have `children` nor use ' +
'`dangerouslySetInnerHTML`.',
);
});it('should validate against multiple children props', () => {
expect(function () {}).toThrowError(
'`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' +
'Please});it('should validate against use of innerHTML', () => {
expect(() =>
mountComponent({innerHTML: '<span>Hi Jim!</span>'}),
).toErrorDev('Directly setting property `innerHTML` is not permitted. ');
});it('should validate against use of innerHTML without case sensitivity', () => {
expect(() =>
mountComponent({innerhtml: '<span>Hi Jim!</span>'}),
).toErrorDev('Directly setting property `innerHTML` is not permitted. ');
  mountComponent({dangerouslySetInnerHTML: '<span>Hi Jim!</span>'});
}).toThrowError(
'`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' +
'Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.',
);
});it('should validate use of dangerouslySetInnerHTML', () => {
expect(function () {
mountComponent({dangerouslySetInnerHTML: {foo: 'bar'}});
}).toThrowError(
'`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' +
'Pl});it('should allow {__html: null}', () => {
expect(function () {
mountComponent({dangerouslySetInnerHTML: {__html: null}});
}).not.toThrow();
});it('should warn about contentEditable and children', () => {
expect(() =>
mountComponent({contentEditable: true, children: ''}),
).toErrorDev(
'Warning: A component is `contentEditable` and contains `children` ' +
'managed by React. It is now your responsibility 'is probably not intentional.\nin div (at **)',
);
});it('should respect suppressContentEditableWarning', () => {
mountComponent({
contentEditable: true,
children: '',
suppressContentEditableWarning: true,
});
});it('should validate against invalid styles', () => {
expect(function () {
mountComponent({style: 'display: none'});
}).toThrowError("not a string. For example, style={{marginRight: spacing + 'em'}} " +
'when using JSX.',
);
});it('should throw for children on void elements', () => {
class X extends React.Component {
render() {
return <input>moo</input>;
}
}const container = document.createElement('div');
ex}).toThrowError('nor use `dangerouslySetInnerHTML`.',
);
});it('should support custom elements which extend native elements', () => {
const container = document.createElement('div');
spyOnDevAndProd(document, 'createElement');
ReactDOis: 'custom-div',
});
});it('should work load and error events on <image> element in SVG', () => {
spyOnDevAndProd(console, 'log');
const c<svg>
<image
xlinkHref="http://example.org/image"
onError={e => console.log('onError called')}
onLoad={e => console.log('onLoad called')}
/>
</svg>,
container,
);consterrorEvent.initEvent('error', false, false);container.getElementsByTagName('image')[0].dispatchEvent(errorEvent);
container.getElementsByTagName('image')[0].dispatchEvent(loadEvent);if (__DEV__) {
expect(console.log).toHaveBeenCalledTimes(2);expect(console.log.mock.calls[1][0]).toContain('onLoad called');
}const container = document.createElement('div');
const onLoad = jest.fn();ReactDOM.render(
<link href="http://example.org/link" onLoad={onLoad} />,
container,
);const loadEvent = document.createEvent('Event');
const link = container.getElementsByTagName('link')[0];loadEvent.initEvent('load', false, false);
link.diconst container = document.createElement('div');
const onError = jest.fn();ReactDOM.render(
<link href="http://example.org/link" onError={onError} />,
container,
);const errorEvent = document.createEvent('Eventlink.dispatchEvent(errorEvent);expect(onError).toHaveBeenCalledTimes(1);
});
  });  describe('updateComponent', () => {
let container;beforeEach(() => {
container = document.createElement('div');
});it('should warn against children for void elements', () => {
ReactDOM.render(<input />, container);expect(function () {
ReactDOM.render(<input>children</input>, container);
}).toThrowError(
'input is a void element tag and must neither have `children` nor use ' +
'`dangerouslySetInnerHTML`.',
);
});it('should warn against dangerouslySetInnerHTML for void elements', () => {
ReactDOM.render(<input />, container);expect(function () {
ReactDOM.render(
<input dangerouslySetInnerHTML={{__html: 'content'}} />,
container,
);
}).toThrowError(
'input is a void element tag and must neither have `children` nor use ' +
'`dangerouslySetInnerHTML`.',
);
});it('should validate against multiple children props', () => {
ReactDOM.render(<div />, container);expect(function () {
ReactDOM.render(
<div children="" dangerouslySetInnerHTML={{__html: ''}} />,
container,
);'Can only set one of `children` or `props.dangerouslySetInnerHTML`.',
);
}ReactDOM.render(
<div contentEditable={true}>
<div />
</div);
}).toErrorDev('contentEditable');
});it('should validate against invalid styles', () => {
ReactDOM.render(<div />, container);expect(function () {
ReactDOM.render(<div style={1} />, container);
}).toThrowError(
'The `style` prop expects a mapping from style properties to values, ' +
"not );
});it('should report component containing invalid styles', () => {
classreturn <div style={1} />;
}
}expect(() => {
ReactDOM.render(<Animal />, container);
}).toTh"not a string. For example, style={{marginRight: spacing + 'em'}} " +
'when using JSX.',
);
});it('should properly escape text content and attributes values', () => {
expect(
ReactDOMServer.renderToStaticMarkup(
React.createElement(
'div',
{style: {
 textAlign: '\'"<>&',
},
},),
),
).toB'&#x27;&quot;&lt;&gt;&amp;' +
'</div>',
);
}it('unmounts children before unsetting DOM node info', () => {
class Inner extends React.Component {
render() {
return <span />;
}componentWillUnmount() {
// Should not throw
expect(ReactDOM.findDOMNode(this).nodeName).toBe('SPAN');
}
}const container = document.createElement('div');
React<Inner />
</div>,);
ReactDOM.unmountComponentAtNode(container);
});
  });  describe('tag sanitization', () => {
it('should throw when an invalid tag name is used server-side', () => {
const h'Invalid tag: script tag',
);
});it('should throw when an attack vector is used server-side', () => {
const hackzor = React.createElement('div><img /><div');
expect(() => ReactDOMServer.renderToString(hackzor)).toThrowError(
'Invalid tag: div><img /><div',
);
});it('should throw when an invalid tag name is used', () => {
const hackzor = React.createElement('script tag');
expect(() => ReactTestUtils.renderIntoDocument(hackzor)).toThrow();
});it('should throw when an attack vector is used', () => {
const hackzor = React.createElement('div><img /><div');
ex  });  describe('nesting validation', () => {
it('warns on invalid nesting', () => {
expect(() => {<div>
<tr />
<tr />
</div>,
);'Warning: validateDOMNesting(...): <tr> cannot appear as a child of ' +
'<div>.' +
'\nin tr (at **)' +
'\nin div (at **)',
]);
 ReactDOM.render(<p />
</span>,
p,
);
}).toErrorDev(
'Warning: validateDOMNesting(...): <p> cannot appear as a descendant ' +
'of <p>.' +
// There is no outer `p` here because root container is not part of the stack.
'\nin p (at **)' +
'\n});it('warns nicely for table rows', () => {
class Row extends React.Component {
render() {
return <tr>x</tr>;
}render() {
return (
<table>
<Row />{' '}
</table>
);
}
}expect'<table>. Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated ' +
'by the browser.' +
'\nin tr (at **)' +
'\nin Row (at **)' +
'\nin table (at **)' +
'\nin Foo (at **)',
'Warning: validateDOMNesting(...): Text nodes cannot appear as a ' +
'child '\nin Row (at **)' +
'\nin table (at **)' +
'\nin Foo (at **)',
'Warning: validateDOMNesting(...): Whitespace text nodes cannot ' +
"appear as a child of <table>. Make sure you don't have any extra " +
'whitespace between tags on each line of your source code.' +
'\nin table (at **)' +
'\nin Foo (at **)',
]);
});it('warns nicely for updating table rows to use text', () => {
const container = document.createElement('div');function Row({children}) {
return <tr>{children}</tr>;return <table>{children}</table>;
}// First is fine.
ReactDOM.render(<Foo />, container);expect(() => ReactDOM.render(<Foo> </Foo>, container)).toErrorDev([
'Warning: validateDOMNesting(...): Whitespace text nodes cannot ' +
"appear as a child of <table>. Make sure you don't have any extra " +
'whitespace between tags on each line of your source code.' +
'\nin table (at **)' +
'\nin Foo (at **)',
]);ReactDOM.render(
<Foo>
<tbody>
<Row />
</tbody>
</Foo>,
container,
);expect(() =>
ReactDOM.render(
<Foo>
<tbody>
<Row>text</Row>
</tbody>
</Foo>,),
).toErrorDev([
'Warning: validateDOMNesting(...): Text nodes cannot appear as a ' +
'child of <tr>.' +
'\nin tr (at **)' +
'\nin Row (at **)' +
'\nin tbody (at **)' +
'\nin table (at **)' +
'\n});it('gives useful context in warnings', () => {
function Row() {
return <tr />;
}
function FancyRow() {
return <Row />;
}function Viz1() {
return (
<table>
<FancyRow />
</table>
);function App1() {
return <Viz1 />;
}'\nin tr (at **)' +
'\nin Row (at **)' +
'\nin FancyRow (at **)' +
'\nin table (at **)' +
'\});it('gives useful context in warningsreturn <tr />;
}
function FancyRow() {
return <Row />;
}class Table extends React.Component {
render() {
return <table>{this.props.children}</table>;
}
}class FancyTable extends React.Component {
render() {
return <Table>{this.props.children}</Table>;
}
}function Viz2() {
return <FancyRow />
</FancyTable>
);
}
function App2() {
return <Viz2 />;
}
expect('\nin Row (at **)' +
'\nin FancyRow (at **)' +
'\nin table (at **)' +
'\nin Table (at **)' +
'\n);
});it('gives useful context in warnings 3', () => {
function Row() {
return <tr />;
}return <Row />;
}class Table extends React.Component {
render() {
return <table>{this.props.children}</table>;
}
}class FancyTable extends React.Component {
render() {
return }
expect(() => {
ReactTestUtils.renderIntoDocument(
<FancyTable>
<FancyRow />
</FancyTable>,
);
}).toEr'\nin Row (at **)' +
'\nin FancyRow (at **)' +
'\nin table (at **)' +
'\nin Table (at **)' +
'\n});it('gives useful context in warnings 4', () => {
function Row() {
return <tr />;
}
function FancyRow() {
return <Row />;
}expect(() => {
ReactTestUtils.renderIntoDocument(
<table>
<FancyR);
}).toErrorDev(
'\nin tr (at **)' +
'\nin Row (at **)' +
'\nin FancyRow (at **)' +
'\nin table (at **)',
);class Table extends React.Component {
render() {
return <table>{this.props.children}</table>;
}
}class FancyTable extends React.Component {
render() {
return <Table>{this.props.children}</Table>;
}
}expect<FancyTable>
<tr />
</FancyTable>,
);
}).toErrorDev(
''\nin Table (at **)' +
'\nin FancyTable (at **)',
);class Link extends React.Component {
render() {
return <a>{this.props.children}</a>;
}
}expect(() => {
ReactTe<div>
<Link />
</div>
</Link>,
);
}).toErrorDev(
'\nin a (at **)' +
'\n'\nin a (at **)' +
'\nin Link (at **)',
);
});it('should warn about incorrect casing on properties (ssr)', () => {
expect(() => {
ReactDOMServer.renderToString(
React.createElement('input', {type: 'text', tabindex: '1'}),
);
}).toErrorDev('tabIndex');
});it('should warn about incorrect casing on event handlers (ssr)', () => {
expect(() => {
ReactDOMServer.renderToString(
Re}).toErrorDev(
'Invalid event handler property `oninput`. ' +// Note: we don't know the right event name so we
// use a generic one (onClick) as a suggesti// on the server.
'for example `onClick`.',ReactDOMServer.renderToString(
React.createElement('input', {type: 'text', onKeydown: '1'}),
);
// We can't warn for `onKeydown` on the server because
// there is no way tell if this is a valid event or not
// withexpect(() => {
ReactTestUtils.renderIntoDocument(
React.createElement('inpu}).toErrorDev('tabIndex');
});it('should warn about incorrect casing on event handlers', () => {
expect(() => {
Re);
}).toErrorDev('onInput');ReactTestUtils.renderIntoDocument(
React.createElement('input', {}).toErrorDev('onKeyDown');
});ReactTestUtils.renderIntoDocument(
React.createElement('div', {class: 'muffins'}),
);});it('should warn about class (ssr)', () => {
expect(() => {
ReactDOMServer.renderToString(
Re}).toErrorDev('className');
});it('should warn about props that are no longReactTestUtils.renderIntoDocument(<div onFocusIn={() => {}} />),
).toErrorDev();
expect(() =>
React'React uses onFocus and onBlur instead of onFocusIn and onFocusOut.',
);ReactTestUtils.renderIntoDocument(<div />);
expect(() =>
ReactTe'React uses onFocus and onBlur instead of onFocusIn and onFocusOut.',
);ReactTestUtils.renderIntoDocument(<div onfocusout={() => {}} />),
).toErrorDev(
'React uses onFocus and onBlur instead of onFocusIn and onFocusOut.',
);
});it('should warn about props that are no longer supported (ssr)', () => {
ReactDOMServer.renderToString(<div />);
expect().toErrorDev(
'React uses onFocus and onBlur insteadexpect(() =>
ReactDOMServer.renderToString(<div onFocusOut={() => {}} />),
).toErrorDev(
'React uses onFocus and onBlur instead of onFocusIn and onFocusOut.',
);
});it('should warn about props that are no longer supported without case sensitivity (ssr)', () => {
ReactDOMServer.renderToString(<div />);
expect(() =>
ReactDOMServer.renderToString(<div onfocusin={() => {}} />),
).toErr);
expect(() =>).toErrorDev(
'React uses onFocus and onBlur instead of onFocusIn and onFocusOut.',
);
});it('gives source code refs for unknown prop warning', () => {
expect(() =>
ReactTestUtils.renderIntoDocument(<div class="paladin" />),
).toErrorDev(
'Warning: Invalid DOM property `class`. Did you mean `className`?\nin div (at **)',
);ReactTestUtils.renderIntoDocument(<input type="text" onclick="1" />),
).toErrorDev(
'Warning: Invalid event handler property `onclick`. Did you mean ' +
'`onClick`?\nin input (at **)',
);
});it('gives source code refs for unknown prop warning (ssr)', () => {
expect(() =>
ReactDOMServer.renderToString(<div class="paladin" />),
).toErrorDev(
'Warninexpect(() =>
ReactDOMServer.renderToString(<input'Warning: Invalid event handler property `oninput`. ' +
// Note: we don't know the right event name so we
// use a generic one (onClick) as a suggestion.
// This is because we don't bundle the event system
// on the server.
'React events use the camelCase naming convention, for example `onClick`.' +
'\nin input (at **)',
);const container = document.createElement('div');ReactTestUtils.renderIntoDocument(<div className="paladin" />, container);
expect(() =>
ReactTestUtils.renderIntoDocument(<div class="paladin" />, container),
).toErrorDev(
'Warning: Invalid DOM property `class`. Did you mean `className`?\nin div (at **)',
)expect(() =>
ReactTestUtils.renderIntoDocument(
<div className="foo1">
<span class="foo2" />
<div onClick={() => {}} />
<strong onclick={() => {}} />
<div className="foo5" />
<div cl),
).toErrorDev([
'Invalid DOM property `class`. Did you mean `className`?\nin span (at **)',
'Invalid event handler property `onclick`. Did you mean `onClick`?\nin strong (at **)',
]);
});it('gives source code refs for unknown prop warning for exact elements (ssr)', () => {
expect(() =>
ReactDOMServer.renderToString(
<div className="foo1">
<span class="foo2" />
<div onClick="foo3" />
<strong onclick="foo4" />
<div className="foo5" />
<div className="foo6" />
</div>,
),
).toErrorDev([
'Invalid DOM property `class`. Did you mean `className`?\nin span (at **)',
'Invalid event handler property `onclick`. ' +
'React events use the camelCase naming convention, for example `onClick`.' +
'\n});it('gives source code refs for unknown prop warning for exact elements in composition', () => {
const container = document.createElement('div');class Parent extends React.Component {
render() {
return (
<div>
<<Child3 />
<Child4 />
</div>
);
}render() {
return <span class="paladin">Child1</span>;
}
}class Child2 extends React.Component {
render() {
return <div>Child2</div>;
}
}class Child3 extends React.Component {
render() {
retur}class Child4 extends React.Component {
render() {
return <div>Child4</div>;
}
}expect(() =>
ReactTestUtils.renderIntoDocument(<Parent />, container),
).toErr'Invalid event handler property `onclick`. Did you mean `onClick`?\nin strong (at **)',
]);
});it('gives source code refs for unknown prop warning for exact elements in composition (ssr)', () => {
const container = document.createElement('div');class Parent extends React.Component {
render() {
return <Child1 />
<Child2 />
<Child3 />
<Child4);
}
}class Child1 extends React.Component {
render() {
retur}class Child2 extends React.Component {
render() {
return <div>Child2</div>;
}
}class Child3 extends React.Component {
render() {
return <strong onclick="1">Child3</strong>;
}
}class Child4 extends React.Component {
render() {
return <div>Child4</div>;
}
}expect(() =>
ReactDOMServer.renderToString(<Parent />, container),
).toErrorDev([
'Invali'React events use the camelCase naming convention, for example `onClick`.' +
'\nin strong (at **)',});it('should suggest property name if available', () => {
expect(() =>
ReactTestUtils.renderIntoDocument(
React.createElement('label', {for: 'test'}),
),
).toErrorDev(
'Warning: Invalid DOM property `for`. Did you mean `htmlFor`?\nin label',
);expect(() =>
ReactTestUtils.renderIntoDocument(
React.createElement('input', {type: 'text', autofocus: true}),
),
).toErrorDev(
'Warning: Invalid DOM property `autofocus`. Did you mean `autoFocus`?\nin input',
);
});ReactDOMServer.renderToString(
React.createElement('label', {for: 'test'}),
),
).toErrorDev(
'Warning: Invalid DOM property `for`. Did you mean `htmlFor`?\nin label',
)ReactDOMServer.renderToString(
React.createElement('input', {type: 'text', autofocus: true}),
),
).toErrorDev(
'Warning: Invalid DOM property `autofocus`. Did you mean `autoFocus`?\nin input',
);
});
  });  describe('whitespace', () => {
 const html = '\n  \t  <span>  \n  testContent  \t  </span>  \n  \t';
const elem = <div dangerouslySetInnerHTML={{__html: html}} />;ReactDOM.render(elem, container);
expect(container.firstChild.innerHTML).toBe(html);
});it('render and then updates innerHTML and preserves whitespace', () => {
const container = document.createElement('div');
const html = '\n  \t  <span>  \n  testContent1  \t  </span>  \n  \t';
const elem = <div dangerouslySetInnerHTML={{__html: html}} />;
ReactDOM.render(elem, container);const html2 = '\n  \t  <div>  \n  testContent2  \t  </div>  \n  \t';
const elem2 = <div dangerouslySetInnerHTML={{__html: html2}} />;
ReactDOM.render(elem2, container);expect(container.firstChild.innerHTML).toBe(html2);
});
  });  describe('Attributes with aliases', function () {
it('sets aliased attributes on HTML attributes', function () {
let el;
expect(() => {
el = ReactTestUtils.renderIntoDocument(<div class="test" />);
}).toErrorDev(
'Warning: Invalid DOM property `class`. Did you mean `className`?',
);expect(el.className).toBe('test');
});it('sets incorrectly cased aliased attributes on HTML attributes with a warning', function () {
let el;el = ReactTestUtils.renderIntoDocument(<div cLASS="test" />);
}).toErrorDev();expect(el.className).toBe('test');
});it('sets aliased attributes on SVG elements with a warning', function () {
lel = ReactTestUtils.renderIntoDocument(
<svg>
<);
}).toErrorDev();
const text = el.querySelector('text');expect(text.hasAttribute('arabic-form')).toBe(true);
});it('sets aliased attributes on custom elements', function () {
const el = ReactTestUtils.renderIntoDocument(
<div is="custom-element" class="test" />,
);expect(el.getAttribute('class')).toBe('test');
<div is="custom-element" claSS="test" />,
);expect(el.getAttribute('class')).toBe('test');
});it('updates aliased attributes on custom elements', function () {
const container = document.createElement('div');
ReactDOM.render(<div is="custom-element" class="foo" />, container);
ReactDOM.render(<div is="custom-element" class="bar" />, container);expect(container.firstChild.getAttribute('class')).toBe('bar');
});
  const el = ReactTestUtils.renderIntoDocument(<div whatever="30" />);expect(el.getAttribute('whatever')).toBe('30');
});it('removes custom attributes', function () {
const container = document.createElement('div');
ReactDOM.render(<div whatever="30" />, container);expect(container.firstChild.getAttribute('whatever')).toBe('30');ReactDOM.render(<div whatever={null} />, container);expect(container.firstChild.hasAttribute('whatever')).toBe(false);
});it('does not assign a boolean custom attributes as a string', function () {
let el;
expect(() => {
el = ReactTestUtils.renderIntoDocument(<div whatever={true} />);
}).toErrorDev(
'Received `true` for a non-boolean attribute `whatever`.\n\n' +
'If you want to write it to the DOM, pass a string instead: ' +
'whatever="true" or whatever={value.toString()}.',
);expect(el.hasAttribute('whatever')).toBe(false);
});it('does not assign an implicit boolean custom attributes', function () {
let el;
expect(() => {
// eslint-disable-next-line react/jsx-boolean-value
el = ReactTestUtils.renderIntoDocument(<div whatever />);
}).toEr'If you want to write it to the DOM, pass a string instead: ' +
'whatever="true" or whatever={value.toString()}.',
);expect(el.hasAttribute('whatever')).toBe(false);
});it('assigns a numeric custom attributes as a string', function () {
const el = ReactTestUtils.renderIntoDocument(<div whatever={3} />);expect(el.getAttribute('whatever')).toBe('3');
});it('will not assign a function custom attributes', function () {
lel = ReactTestUtils.renderIntoDocument(<div whatever={() => {}} />);
}).toErrorDev('Warning: Invalid value for prop `whatever` on <div> tag');expect(el.hasAttribute('whatever')).toBe(false);
});it('will assign an object custom attributes', function () {
const el = ReactTestUtils.renderIntoDocument(<div whatever={{}} />);
expect(el.getAttribute('whatever')).toBe('[object Object]');
});it('allows Temporal-like objects as HTML (they are not coerced to strings first)', function () {
class TemporalLike {
valueOf() {
// Throwing here is the behavior of ECMAScript "Temporal" date/time API.
// See https://tc39.es/proposal-temporal/docs/plaindate.html#valueOf
throw new TypeError('prod message');
}
toString() {
return '2020-01-01';
}
}// `dangerouslySetInnerHTML` is never coerced to a string, so won't throw
// even with a Temporal-like object.
const c<div dangerouslySetInnerHTML={{__html: new TemporalLike()}} />,
container,
);
expect(container.firstChild.innerHTML).toEqual('2020-01-01');
});it('allows cased data attributes', function () {
let el;
e}).toErrorDev(
'React does not recognize the `data-fooBar` prop on a DOM element. ' +
'If you intentionally want it to appear in the DOM as a custom ' +
'attribute, spell it as lowercase `data-foobar` instead. ' +
''in div (at **)',
);
expect(el.getAttribute('data-foobar')).toBe('true');
});it('allows cased custom attributes', function () {
lel = ReactTestUtils.renderIntoDocument(<div fooBar="true" />);
}).toErrorDev(
'React does not recognize the `fooBar` prop on a DOM element. ' +
'If you intentionally want it to appear in the DOM as a custom ' +
'attribute, spell it as lowercase `foobar` instead. ' +
'If you accidentally passed it from a parent component, remove ' +
'it from the DOM element.\n' +
'in div (at **)',
);
expect(el.getAttribute('foobar')).toBe('true');
});it('warns on NaN attributes', function () {
let el;
expect(() => {
el = ReactTestUtils.renderIntoDocument(<div whatever={NaN} />);
}).toErrorDev(
'Warning: Received NaN for the `whatever` attribute. If this is ' +
'expected, cast the value to a string.\nin div',
);expect(el.getAttribute('whatever')).toBe('NaN');
});it('removes a property when it becomes invalid', function () {
const cexpect(() =>
ReactDOM.render(<div whatever={() => {}} />, container),
).toErrorDev('Warning: Invalid value for prop `whatever` on <div> tag.');
const el = container.firstChild;
expect(el.hasAttribute('whatever')).toBe(false);
});it('warns on bad casing of known HTML attributes', function () {
lel = ReactTestUtils.renderIntoDocument(<div SiZe="30" />);
}).toErrorDev(
'Warning: Invalid DOM property `SiZe`. Did you mean `size`?',
);expect(el.getAttribute('size')).toBe('30');
it('allows objects on known properties', function () {
const el = ReactTestUtils.renderIntoDocument(<div acceptCharset={{}} />);
expect(el.getAttribute('accept-charset')).toBe('[object Object]');
});it('should pass objects as attributes if they define toString', () => {
const obj = {
toString() {
return 'hello';
},
};
const container = document.createElement('div');ReactDOM.render(<img src={obj} />, container);
expect(container.firstChild.src).toBe('http://localhost/hello');ReactDOM.render(<svg arabicForm={obj} />, container);
expect(container.firstChild.getAttribute('arabic-form')).toBe('hello');ReactDOM.render(<div unknown={obj} />, container);
expect(container.firstChild.getAttribute('unknown')).toBe('hello');
});it('passes objects on known SVG attributes if they do not define toString', () => {
const obj = {};
const container = document.createElement('div');ReactDOM.render(<svg arabicForm={obj} />, container);
expect(container.firstChild.getAttribute('arabic-form')).toBe(
'[object Object]',
);
});const container = document.createElement('div');ReactDOM.render(<div unknown={obj} />, container);
expect(container.firstChild.getAttribute('unknown')).toBe(
'[object Object]',
);
});it('allows objects that inherit a custom toString method', function () {
const parent = {toString: () => 'hello.jpg'};
c});it('assigns ajaxify (an important internal FB attribute)', function () {
const options = {toString: () => 'ajaxy'};
const el = ReactTestUtils.renderIntoDocument(<div ajaxify={options} />);expect(el.getAttribute('ajaxify')).toBe('ajaxy');
});
  });  describe('String boolean attributes', function () {
it('does not assign string boolean attributes for custom attributes', function () {
let el;
expect(() => {
el = ReactTestUtils.renderIntoDocument(<div whatever={true} />);
}).toErrorDev(
'Received `true` for a non-boolean attribute `whatever`.\n\n' +
'If you want to write it to the DOM, pass a string instead: ' +
'whatev});it('stringifies the boolean true for allowed attributes', function () {
const el = ReactTestUtils.renderIntoDocument(<div spellCheck={true} />);expect(el.getAttribute('spellCheck')).toBe('true');
});it('stringifies the boolean false for allowed attributes', function () {
const el = ReactTestUtils.renderIntoDocument(<div spellCheck={false} />);expect(el.getAttribute('spellCheck')).toBe('false');
});it('stringifies implicit booleans for allowed attributes', function () {
/});
  });  describe('Boolean attributes', function () {
it('warns on the ambiguous string value "false"', function () {
let el;
e}).toErrorDev(
'Received the string `false` for the boolean attribute `hidden`. ' +
'The browser will interpret it as a truthy value. ' +
'Did you mean hidden={false}?',
);expect(el.getAttribute('hidden')).toBe('');
});it('warns on the potentially-ambiguous string value "true"', function () {
let el;
expect(() => {
el = ReactTestUtils.renderIntoDocument(<div hidden="true" />);
}).toErrorDev(
'Received the string `true` for the boolean attribute `hidden`. ' +
'A);expect(el.getAttribute('hidden')).toBe('');
});
  });  describe('Hyphenated SVG elements', function () {
it('the font-face element is not a custom element', function () {
lel = ReactTestUtils.renderIntoDocument(
<svg>
<font-face x-height={false} />
</svg>,
);
}).toErrorDev(
'Warning: Invalid DOM property `x-height`. Did you mean `xHeight`',
);expect(el.querySelector('font-face').hasAttribute('x-height')).toBe(
false,
);
});it('the font-face element does not allow unknown boolean values', function () {
let el;
expect(() => {
el = ReactTestUtils.renderIntoDocument(
<svg>
<font-f);
}).toErrorDev(
'Received `false` for a non-boolean attribute `whatever`.\n\n' +
'If you want to write it to the DOM, pass a string instead: ' +
'whatever="false" or whatever={value.toString()}.\n\n' +
'If you used to conditionally omit it with whatever={condition && value}, ' +
'pass wfalse,
);
});
  });  // These tests mostly verify the existing behavior.
  // It may not always makes sense but we can't change it in minors.
  describe('Custom elements', () => {
it('does not strip unknown boolean attributes', () => {
const container = document.createElement('div');
ReactDOM.render(<some-custom-element foo={true} />, container);
const node = container.firstChild;
expect(node.getAttribute('foo')).toBe(
ReactFeatureFlags.enableCustomElementPropertySupport ? '' : 'true',
);
ReactDOM.render(<some-custom-element foo={false} />, container);
expect(node.getAttribute('foo')).toBe(
ReactFeatureFlags.enableCustomElementPropertySupport ? null : 'false',
);
ReactDOM.render(<some-custom-element />, container);
expect(node.hasAttribute('foo')).toBe(false);
ReactDOM.render(<some-custom-element foo={true} />, container);
expect(const container = document.createElement('div');
ReactDOM.render(<some-custom-element onx="bar" />, container);
const node = container.firstChild;
expect(node.getAttribute('onx')).toBe('bar');
ReactDOM.render(<some-custom-element onx="buzz" />, container);
expect(node.getAttribute('onx')).toBe('buzz');
ReactDOReactDOM.render(<some-custom-element onx="bar" />, container);
expect(node.getAttribute('onx')).toBe('bar');
});
  });  it('receives events in specific order', () => {
const eventOrder = [];
const track = tag => () => eventOrder.push(tag);
const outerRef = React.createRef();
const innerRef = React.createRef();function OuterReactApp() {
return (
<div
ref={outerRef}
onClick/>
);
}function InnerReactApp() {
return (
<div
ref={innerRef}
onClick/>
);
}const container = document.createElement('div');
document.body.appendChild(container);try {
ReactDOM.render(<OuterReactApp />, container);
ReactDOM.render(<InnerReactApp />, outerRef.current);document.addEventListener('click', track('document bubble'));
documen// the event listener onto the document after the one above has.
expect(eventOrder).toEqual(['outer capture',
'inner capture',
'document bubble',
'inner bubble',
'outer bubble',
]);
} else {
expect(eventOrder).toEqual([
'document capture',
'outer capture',
'inner 'outer bubble',
'document bubble',
]);
}
} finally {
document.body.removeChild(container);
}
  });  describe('iOS Tap Highlight', () => {
it('adds onclick handler to elements with onClick prop', () => {
const container = document.createElement('div');const elementRef = React.createRef();
function Component() {
return <div ref={elementRef} onClick={() => {}} />;
}ReactD});it('adds onclick handler to a portal root', () => {
const container = document.createElement('div');
const portalContainer = document.createElement('div');function Component() {
return ReactDOM.createPortal(
<div onClick={() => {}} />,
portalContainer,
);
}ReactDOM.render(<Component />, container);
expect(typeof portalContainer.onclick).toBe('function');
});it('does not add onclick handler to the React root', () => {
const container = document.createElement('div');function Component() {
return <div onClick={() => {}} />;
}ReactD});
  });
});
