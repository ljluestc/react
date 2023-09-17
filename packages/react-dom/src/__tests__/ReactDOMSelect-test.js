/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */Element.proto  return setAttribute.call(this, name, '' + value);
};describe('ReactDOMSelect', () => {
  let React;
  let ReactDOM;
  let ReactDOMServer;
  React = require('react');
ReactDOM = require('react-dom');
ReactDOMServer = require('react-dom/server');
ReactTestUtils = require('react-dom/test-utils');
  });  it('should all<select defaultValue="giraffe"<option value="giraffe">A giraffe!</option>
<option value="gorilla">A gorilla!</option>
</select>
);
const options = stub.props.children;
const container = document.createElement('div');
const<select defaultValue="gorilla">{options}</select>,
container,
);
expect(node.value).toEqual('giraffe');
  });  it('should not throw with `defaultValue` and without children', () => {
const stub = <select defaultValue="dummy" />;expect(() => {
ReactTestUtils.renderIntoDocument(stub);
}).not.toThrow();
  });  it('should not control when using `defaultValue`', () => {
const el = (
<select defaultValue="giraffe"><option value="giraffe">A giraffe!<</select>
);
const container = document.createElement('div');
const node = ReactDOM.render(el, container);expect(node.value).toBe('giraffe');node.value = 'monkey';
ReactDOM.render(el, container);
// Uncontrolled selects shouldn't change the value after first mounting
expecconst stub = (
<select multiple={true} defaultValue={['giraf<option value="giraffe">A giraffe!</option>
<option value="gorilla">A gorilla!</option>
</select>
);const container = document.createElement('div');
const node = ReactDOM.render(stub, container);expect(node.options[0].selected).toBe(false); // monkey
expect(node.options[1].selected).toBe(true); // giraffe
expect(node.options[2].selected).toBe(true); // gorilla// Changing `defaultValue` should do nothing.
ReactDOM.render(
<select multiple={true} defaultValue={['monkey']}>
{options}
</select>,
container,
);expect(node.options[0].selected).toBe(falsexpect(node.options[2].selected).toconst stub = (
<select value="giraffe" onChange={noop}>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<opti);
const options = stub.props.children;
const container = document.createElement('div');
const node = ReactDOM.render(stub, container);expect(node.value).toBe('giraffe');// Changing the `value` prop should change the selected option.
ReactDOM.render(
<select value="gorilla" onChange={noop}>
{options}
</select>,
container,
);
expect(node.value).toEqual('gorilla');const stub = (
<select defaultValue="">
<option disabled={true}>Disabled</option><option>0</option>
<option disabled={true}>Also Disabled</option>
</select>
);
const container = document.createElement('div');
const node = ReactDOM.render(stub, container);
ex  });  it('should allow setting `value` to __proto__', () => {
const stub = (
<select value="__proto__" onChange={noop}>
<opti<option value="gorilla">A gorilla!</option>
</select>
);
const options = stub.props.children;
const container = document.createElement('div');
const node = ReactDOM.render(stub, container);expect(node.value).toBe('__proto__');// Changing the `value` prop should change the selected option.
ReactDOM.render(
<select value="gorilla" onChange={noop}>
{options}
</select>,
container,expect(node.value).toEqual('gorillaconst stub = <select value="dummy" onChange={noop} />;expect(() => {
ReactTestUtils.renderIntoDocument(stub);
}).not.toThrow();
  });  it('should allow setting `value` with multiple', () => {
const stub = (
<select multiple={true} value={['giraffe', 'gorilla']} onChange={noop}>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<opti);
const options = stub.props.children;
const container = document.createElement('div');
const node = ReactDOM.render(stub, container);expect(node.options[0].selected).toBe(false); // monkey
expect(node.options[1].selected).toBe(true); // giraffe
expect(node.options[2].selected).toBe(true); // gorilla// Changing the `value` prop should change the selected options.
ReactDOM.render(
<select multiple={true} value={['monkey']} onChange={noop}>
{options}
</select>,
container,
);expect(node.options[0].selected).toBe(true); // monkey
expect(node.options[1].selected).toBe(false); // giraffe
expecconst stub = (
<select multiple={true} value={['__proto__', 'gorilla']} onChange={noop}>
<option value="monkey">A monkey!</option>
<option value="__proto__">A __proto__!</option>
<option value="gorilla">A gorilla!</option>
</select>
);
const options = stub.props.children;
const container = document.createElement('div');
const node = ReactDOM.render(stub, container);expect(node.options[0].selected).toBe(false); // monkey
expect(node.options[1].selected).toBe(true); /ReactDOM.render({options}
</select>,
container,
);expect(node.options[0].selected).toBe(true); // monkey
expect(node.options[1].selected).toBe(false); // __proto__
expect(node.options[2].selected).toBe(false); // gorilla
  });  it('should not select other options automatically', () => {
const stub = (
<sele<option value="2">two</option>
<option value="12">twelve</option>);
const node = ReactTestUtils.renderIntoDocument(stub);expect(node.options[0].selected).toBe(false); // one
expect(node.options[1].selected).toBe(false); // two
expecconst stub = <select multiple={true} value={['a', 'b']} onChange={noop} />;
const container = document.createElement('div');
const node = ReactDOM.render(stub, container);ReactDOM.render(
<select multiple={true} value={['a', 'b']} onChange={noop}>
<option value="a">a</option>
<option value="b">b</option>
<option value="c">c</option>
</select>,
container,
);expect(node.options[0].selected).toBe(true); // a
expect(node.options[1].selected).toBe(true); /  });  it('should allow setting `value` with `objectToString`', () => {
const objectToString = {
animal: 'giraffe',return this.animal;
},
};const el = (
<select multiple={true} value={[objectToString]} onChange={noop}>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<o);
const container = document.createElement('div');
const node = ReactDOM.render(el, container);expect(node.options[0].selected).toBe(false); // monkey
expecobjectToString.animal = 'monkey';const el2 = (
<select multiple={true} value={[objectToString]}>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<option value="gorilla">A gorilla!</option>
</select>
);
ReactDOM.render(el2, container);expect(node.options[0].selected).toBe(true); // monkey
expect(node.options[1].selected).toBe(false); // giraffe
expect(node.options[2].selected).toBe(false); // gorilla
  });  it('should allow switching to multiple'<select defaultValue="giraffe">
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option></select>
);
const options = stub.props.children;
const container = document.createElement('div');
const node = ReactDOM.render(stub, container);expect(node.options[0].selected).toBe(false); // monkey
expect(node.options[1].selected).toBe(true); // giraffe
ex<select multiple={true} defaultValue={['giraffe', 'gorilla']}>
{options}
</select>,
contaexpect(node.options[1].selected).toBe(true); // giraffe
expect(node.options[2].selected).toBe(true); // gorilla
  });  it('should allow switching from multiple', () => {
const stub = (
<select multiple={true} defaultValue={['giraffe', 'gorilla']}>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<option value="gorilla">A gorilla!</option>
</select>const options = stub.props.children;
const container = document.createElement('div');
const node = ReactDOM.render(stub, container);expect(node.options[0].selected).toBe(false); // monkey
expec// means that "monkey" will be selected
ReactDOM.render(
<select defaultValue="gorilla">{options}</select>,
container,expect(node.options[1].selected).toBe(false); // giraffe
expect(node.options[2].selected).toBe(true); // gorilla
  });  it('does not select an item when size is initially set to greater than 1', () => {
const stub = (
<select size="2">
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<o);
const container = document.createElement('div');
const select = ReactDOM.render(stub, container);expect(select.options[0].selected).toBe(false);
expecexpect(select.selectedIndex).toBe(-1);
  });  it('should remember value when switching to uncontrolled', () => {
const stub = (
<select value={'giraffe'} onChange={noop}>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<o);
const options = stub.props.children;
const container = document.createElement('div');
const node = ReactDOM.render(stub, container);expect(node.options[0].selected).toBe(false); // monkey
expect(node.options[1].selected).toBe(true); // giraffe
expect(node.options[2].selected).toBe(false); // gorillaReactDOM.render(<select>{options}</select>, container);expect(node.options[0].selected).toBe(false); // monkey
expect(node.options[1].selected).toBe(true); // giraffe
expect(node.options[2].selected).toBe(false); // gorilla
  });  it('should remember updated value whe<select value={'giraffe'} onChange={noop}>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option></select>
);const container = document.createElement('div');
const node = ReactDOM.render(stub, container);ReactDOM.render(
<select value="gorilla" onChange={noop}>
{options}
</select>,
container,
);expect(node.options[0].selected).toBe(false); // monkey
expect(node.options[1].selected)expect(node.options[1].selected).toBe(false); // giraffe
expect(node.options[2].selected).toBe(true); // gorilla
  });  it('should support server-side rendering', () => {
const<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<option value="gorilla">A gorilla!</option>
</select>
);
const container = document.createElement('div');
container.innerHTML = ReactDOMServer.renderToString(stub);
const options = container.firstChild.options;
expect(options[0].value).toBe('monkey');
expect(options[0].selected).toBe(false);
expect(options[1].value).toBe('giraffe');expect(options[2].value).toBe('gorilla');
expect(options[2].selected).toBe(false);
  });  it('should support server-side rendering with def<select defaultValue="giraffe">
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<option value="gorilla">A gorilla!</option>
</select>
);
coconst options = container.firstChild.options;
expect(options[0].value).toBe('monkey');
expect(options[0].selected).toBe(false);
expecexpect(options[2].value).toBe('gorilla');
expect(options[2].selected).toBe(false);
  });  it('should support server-side rendering with dangerouslySetInnerHTML', () => {
const stub = (
<select defaultValue="giraffe">
<option
value="monkey"
dangerouslySetInnerHTML={{
__html: 'A monkey!',
}}>
{undefined}<option
value="giraffe"
dangerouslySetInnerHTML={{}}>
{null}
</option>
<option
value="gorilla"
da}}
/>
</select>
);container.innerHTML = ReactDOMServer.renderToString(stub);
const options = container.firstChild.options;
expect(options[0].value).toBe('monkey');
expect(options[0].selected).toBe(false);
expect(options[1].value).toBe('giraffe');
expect(options[1].selected).toBe(true);
expect(options[2].value).toBe('gorilla');
expect(options[2].selected).toBe(false);
  });  it('should support server-side rendering with multiple', () => {
const stub = (<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<option value="gorilla">A gorilla!</option>);
const container = document.createElement('div');
contaexpect(options[0].value).toBe('monkey');
expect(options[0].selected).toBe(false);
expect(options[1].value).toBe('giraffe');
expect(options[1].selected).toBe(true);
expect(options[2].value).toBe('gorilla');
expect(options[2].selected).toBe(true);
  });  it('should not control defaultValue if re-adding options', () => {
const container = document.createElement('div');const node = ReactDOM.render(
<select multiple={true} defaultValue={['giraffe']}>
<option key="monkey" value="monkey">
A monkey!<option key="giraffe" value="giraffe">
A giraffe!
</option>A gorilla!</select>,
container,
);expect(node.options[0].selected).toBe(false); // monkey
expec<select multiple={true} defaultValue={['giraffe']}>
<option key="monkey" value="monkey">
A monkey!
</option>
<option key="gorilla" value="gorilla">
A gorilla!
</option>
</select>,
container,
);expect(node.options[0].selected).toBe(false); // monkey
expect(node.options[1].selected).toBe(false); <option key="monkey" value="monkey">
A monkey!
</option>
<option key="giraffe" value="giraffe">
A giraffe!
</A gorilla!
</option>
</select>,);expect(node.options[0].selected).toBe(false); // monkexpect(node.options[2].selected).toBe(false); // gorilla
  });  it('should support options with dynamic children', () => {
const container = document.createElement('div');let node;function App({value}) {
retur<option key="monkey" value="monkey">
A monkey {value === 'monkey' ? 'is chosen' : null}!
</option>
<option key="giraffe" value="giraffe">
A giraffe {value === 'giraffe' && 'is chosen'}!
</option>
<option key="gorilla" value="gorilla">
A gorilla {value === 'gorilla' && 'is chosen'}!
</option>
</select>
);
}ReactDOM.render(<App value="monkey" />, container);
expect(node.options[0].selected).toBe(true); // monkey
expect(node.options[1].selected).toBe(false); // giraffe
expect(node.options[2].selected).toBe(false); // gorillaReactDOM.render(<App value="giraffe" />, container);
expect(node.options[0].selected).toBe(false); // monkey
expect(node.options[1].selected).toBe(true); // giraffe
expecexpect(() =>
ReactTestUtils.renderIntoDocument(
<select value={null}>
<option value="test" />
</select>,
),
).toErrorDev(
'`value` prop on `select` should not be null. ' +
'Consider using an empty string to clear the component or `undefined` ' +
'for uncontrolled components.',
);ReactTestUtils.renderIntoDocument(
<select value={null}>
<option value="test" />
</select>,
);
  });  it('should warn if selected is set on <option>', () => {
function App() {
retur<option selected={true} />
<option selected={true} />
</select>
);
}expect(() => ReactTestUtils.renderIntoDocument(<App />)).toErrorDev(
'Use the `defaultValue` or `value` props on <select> instead of ' +
'setting `selected` on <option>.',
);ReactTestUtils.renderIntoDocument(<App />);
  });  it('should warn if value is null and multiple is true', () => {
expect(() =>
ReactTestUtils.renderIntoDocument(
<select value={null} multiple={true}>
<option value="test" />
</select>,
),
).toErrorDev(
'`value` prop on `select` should not be null. ' +
'Consider using an empty array when `multiple` is ' +
'set to `true` to clear the component or `undefined` ' +
'for uncontrolled components.',
);ReactTestUtils.renderIntoDocument(
<select value={null} multiple={true}>
<option value="test" />
</select>,
);
  });  it('should refresh state on change', () => {
const stub = (
<select value="giraffe" onChange={noop}>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<option value="gorilla">A gorilla!</option>
</select>
);
const container = document.createElement('div');
documnew Event('change', {bubbles: true, cancelable: false}),
);expect(node.value).toBe('giraffe');
} finally {
document.body.removeChild(container);
}
  });  it('should warn if value and defaultValue props are specified', () => {
expect(() =>
ReactTestUtils.renderIntoDocument(
<select value="giraffe" defaultValue="giraffe" readOnly={true}>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<option value="gorilla">A gorilla!</option>
</select>,
),
).toErrorDev(
'Select elements must be either controlled or uncontrolled ' +
'(specify either the value prop, or the defaultValue prop, but not ' +
'both'https://reactjs.org/link/controlled-components',
);ReactTestUtils.renderIntoDocument(<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
<option value="gorilla">A gorilla!</option>
</select>,
);
  });  it('should not warn about missing onChange in uncontrolled textareas', () => {
const container = document.createElement('div');
ReactDOM.render(<select />, container);
ReactDOM.unmountComponentAtNode(container);
ReactDOM.render(<select value={undefined} />, container);
  });  it('should be able to safely remove select onChange', () => {
function changeView() {
ReactDOM.unmountComponentAtNode(container);
}c<select value="giraffe" onChange={changeView}>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option></select>
);
const node = ReactDOM.render(stub, container);expect(() => ReactTestUtils.Simulate.change(node)).not.toThrow();
  });  it('should select grandchild options nested inside an optgroup', () => {
const stub = (
<select value="b" onChange={noop}>
<optgroup label="group">
<option value="a">a</option>
<option value="b">b</option>
<option value="c">c</option>
</);
const container = document.createElement('div');expect(node.options[1].selected).toBe(true); // b
expect(node.options[2].selected).toBe(false); // c
  });  it('should allow controlling `value` in a nested render', () => {
let selectNode;class Parent extends React.Component {
state = {
value: 'giraffe',
};componentDidMount() {
this._renderNested();
}componentDidUpdate() {
this._renderNested();
}_handleChange(event) {
this.setState({value: event.target.value});
}_renderNested() {
ReonChange={this._handleChange.bind(this)}
ref={n => (selectNode = n)}
value={this.state.value}>
<opti<option value="gorilla">A gorilla!</option>
</select>,);return <div ref={n => (this._nestingContainer = n)} />;
}
}const container = document.createElement('div');document.body.appendChild(container);ReactDOM.render(<Parent />, container);expect(selectNode.value).toBe('giraffe');selectNode.value = 'gorilla';let nativeEvent = document.createEvent('Event');
nativeEvent.initEvent('input', true, true);
selectNode.dispatchEvent(nativeEvent);expect(selectNode.value).toEqual('gorilla');nativeEvent = document.createEvent('Event');
nativeEvent.initEvent('change', true, true);
selectNode.dispatchEvent(nativeEvent);expect(selectNode.value).toEqual('gorilla');document.body.removeChild(container);
  });  it('should not select first option by default when multiple is set and no defaultValue is set', () => {
const stub = (
<select multiple={true} onChange={noop}>
<option value="a">a</option>
<option value="b">b</option>
<option value="c">c</option>
</select>
)const node = ReactDOM.render(stub, container);expect(node.options[0].selected).toBe(false); // a
expect(node.options[1].selected).toBe(false); // b
expect(node.options[2].selected).toBe(false); // c
  });  describe('When given a Symbol value', () => {let node;expect(() => {
node = ReactTestUtils.renderIntoDocument(
<select onChange={noop} value={Symbol('foobar')}>
<option value={Symbol('foobar')}>A Symbol!</option>
<opti</select>,
);
}).toErrorDev('Invalid value for prop `value`');expect(node.value).toBe('A Symbol!');
});it('treats updated Symbol value as missing', () => {
let node;expect(() => {
node = ReactTestUtils.renderIntoDocument(
<select onChange={noop} value="monkey">
<option value={Symbol('foobar')}>A Symbol!</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);<select onChange={noop} value={Symbol('foobar')}>
<option value={Symbol('foobar')}>A Symbol!</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);explet node;expect(() => {
node = ReactTestUtils.renderIntoDocument(
<select defaultValue={Symbol('foobar')}>
<option value={Symbol('foobar')}>A Symbol!</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);
}let node;expect(() => {
node = ReactTestUtils.renderIntoDocument(
<select defaultValue="monkey">
<o<option value="giraffe">A giraffe!</option>
</sel}).toErrorDev('Invalid value for prop `value`');expect(node.value).toBe('monkey');node = ReactTestUtils.renderIntoDocument(
<select defaultValue={Symbol('foobar')}>
<option value={Symbol('foobar')}>A Symbol!</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);expect(node.value).toBe('A Symbol!');
});
  });  describe('When given a function value', () => {
it('treats initial function value as missing', () => {
let node;expect(() => {
node = ReactTestUtils.renderIntoDocument(
<s<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);
}).toErrorDev('Invalid value for prop `value`');expect(node.value).toBe('A function!');
});itnode = ReactTestUtils.renderIntoDocument(
<select defaultValue={() => {}}>
<option value={() => {}}>A function!</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);
}).toErrorDev('Invalid value for prop `value`');expect(node.value).toBe('A function!');
});it('treats updated function value as an empty string', () => {
let node;expect(() => {<select onChange={noop} value="monkey">
<option value={() => {}}>A function!</option><option value="giraffe">A giraffe!</option>
</select>,
);<select onChange={noop} value={() => {}}>
<option value={() => {}}>A function!</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</sel});it('treats updated function defaultValue as an empty string', () => {
let node;expect(() => {
node = ReactTestUtils.renderIntoDocument(
<select defaultValue="monkey">
<option value={() => {}}>A function!</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);
}).toErrorDev('Invalid value for prop `value`');expect(node.value).toBe('monkey');node = ReactTestUtils.renderIntoDocument(
<select defaultValue={() => {}}>
<option value={() => {}}>A function!</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);  });  describe('When given a Temporal.PlainDate-like value', () => {
class TemporalLike {
valueOf() {
// Throwing here is the behavior of ECMAScript "Temporal" date/time API.
// See https://tc39.es/proposal-temporal/docs/plaindate.html#valueOf
throw new TypeError('prod message');
}
toStr}
}it('throws when given a Temporal.PlainDate-like value (select)', () => {
const test = () => {
ReactTestUtils.renderIntoDocument(
<select onChange={noop} value={new TemporalLike()}>
<opti<option value="giraffe">A giraffe!</option>
</select>,
);
}expect(test).toThrowError(new TypeError('prod message')),
).toErrorDev(
'Form field values (value, checked, defaultValue, or defaultChecked props)' +
' must be strings, not TemporalLike. ' +
'This value must be coerced to a string before before using it here.',
);
});it('throws when given a Temporal.PlainDate-like value (option)', () => {
const test = () => {
ReactTestUtils.renderIntoDocument(<option value={new TemporalLike()}>
like <option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);
};
expect(() =>
expect(test).toThrowError(new TypeError('prod message')),
).toErrorDev(
'The provided `value` attribute is an unsupported type TemporalLike.' +
' This value must be coerced to a string before before using it here.',
);
});it('throws when given a Temporal.PlainDate-ReactTestUtils.renderIntoDocument(
<select onChange={noop} value={new TemporalLike()}>
<option value={new TemporalLike()}>
like <option value="monkey">A monkey!</option>
<option value=");
};
expect(() =>
ex'The provided `value` attribute is an unsupported type TemporalLike.' +
' This value must be coerced to a string before before using it here.',
)ReactTestUtils.renderIntoDocument(
<select onChange={noop} value="monkey">
<<option value="giraffe">A giraffe!</option>
</select>,
)ReactTestUtils.renderIntoDocument(
<select onChange={noop} value={new TemporalLike()}>
<option value="2020-01-01">like a Temporal.PlainDate</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);
};
expect(() =>
expect(test).toThrowError(new TypeError('prod message')),
).toErrorDev(
'Form field values (value, checked, defaultValue, or defaultChecked props)' +
');
});it('throws with updated Temporal.PlainDate-like value (option)', () => {
ReactTestUtils.renderIntoDocument(
<<option value="monkey">A monkey!</option></select>,const test = () => {<select onChange={noop} value="2020-01-01like a Temporal.PlainDate<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,};expect(test).toThrowError(new TypeError('prod message')),
).toErrorDev(
'The provided `value` attribute is an );ReactTestUtils.renderIntoDocument(
<sele<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);
const test = () => {
ReactTestUtils.renderIntoDocument(
<select onChange={noop} value={new TemporalLike()}>
<option value={new TemporalLike()}>
like a Temporal.PlainDate
</option><option value="giraffe">A giraffe!</option>
</select>,
);
};expect(test).toThrowError(new TypeError('prod message')),
).toErrorDev(
'The prov);
});it('throws when given a Temporal.PlainDate-like defaultValue (select)', () => {
const test = () => {
ReactTestUtils.renderIntoDocument(
<select onChange={noop} defaultValue={new TemporalLike()}>
<option value="2020-01-01">like a Temporal.PlainDate</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,};
exp).toErrorDev(
'Form fie'This value must be coerced to a string before before using it here.',
);
});it('throws when given a Temporal.PlainDate-like defaultValue (option)', () => {
const test = () => {
ReactTestUtils.renderIntoDocument(
<select onChange={noop} defaultValue="2020-01-01">
<option value={new TemporalLike()}>
like a Temporal.PlainDate
</option><option value="giraffe">A giraffe!);
};
expect(() =>
expect(test).toThrowError(new TypeError('prod message')),
).toErrorDev(
'The provided `value` attribute is an unsupported type TemporalLike.' +
' });it('throws when given a Temporal.PlainDate-like value (both)', () => {
con<select onChange={noop} defaultValue={new TemporalLike()}>
<option v</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);
};
expect(() =>
expect(test).toThrowError(new TypeError('prod message')),
).toErrorDev(' This value must be coerced to a string before before using it here.',
);ReactTestUtils.renderIntoDocument(
<select o<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,
);
const test = () => {
ReactTestUtils.renderIntoDocument(
<select onChange={noop} defaultValue={new TemporalLike()}>
<option value="2020-01-01">like a Temporal.PlainDate</option>
<option value="monkey">A monkey!</option></select>,};
expect(() =>
expect(test).toThrowError(new TypeError('prod message')),
).toErrorDev(
'Form field values (value, checked, defaultValue, or defaultChecked props)' +
' must be strings, not TemporalLike. ' +
'T});it('throws with updated Temporal.PlainDate-like defaultValue (both)', () => {
ReactTestUtils.renderIntoDocument(
<sele<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>const test = () => {
ReactTestUtils.renderIntoDocument(
<select onChange={noop} value={new TemporalLike()}>
<option value={new TemporalLike()}>
like a Temporal.PlainDate
</option>
<option value="monkey">A monkey!</option>
<option value="giraffe">A giraffe!</option>
</select>,};
exp).toErrorDev(
'The prov);
});
  });
});
