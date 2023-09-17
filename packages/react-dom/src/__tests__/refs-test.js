/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */let ReactFeat// Once support for string refs is removed, this test can be removed.
// Detaching is already tested in refs-detruction-test.js
describe('reactiverefs', () => {
  let container;  beforeEach(() => {React = require('react');
ReactDOM = require('react-dom');
ReactFeatureFlags = require('shared/ReactFeatureFlags');
ReactTestUtils = require('react-dom/test-utils');
  });  afterEachdocument.body.removeChild(container);
container = null;
}
  });  /**
* Counts clicks and has a renders an item for each click. Each item rendered
* has a ref of the form "clickLogN".
*/state = {count: this.props.initialCount};triggerReset = () => {
this.setState({count: this.props.initialCount});
};handleClick = () => {
this.setState({count: this.state.count + 1});
};render() {
constfor (i = 0; i < this.state.count; i++) {
children.push(
<div
className="clickLogDiv"
key={'clickLog' + i}
ref={'clickLog' + i});
}
return{children}
</span>
);  }  const expectClickLogsLengthToBe = function (instance, length) {
const clickLogs = ReactTestUtils.scryRenderedDOMComponentsWithClass(
instance,
'clickLogDiv',
);
expect(clickLogs.length).toBe(length);
expect(Object.keys(instance.refs.myCounter.refs).length).toBe(length);
  };  /**
* Render a TestRefsComponent and ensure that the main refs are wired up.
*/
  const renderTestRefsComponent = function () {
/**
* Only purpose is to test that refs are tracked even when applied to a
* component that is injected down several layers. Ref systems are difficult to
* build in such a way that ownership is maintained in an airtight manner.
*/
class GeneralContainerComponent extends React.Component {
render() {
ret}/**
* Notice how refs ownership is maintained even when injecting a component
* into a different parent.
*/
class TestRefsComponent extends React.Component {
doReset = () => {
this.refs.myCounter.triggerReset();
};re<div>
<div ref="resetDiv" onClick={this.doReset}>
Reset Me By Clicking This.
</div>
<GeneralContainerComponent ref="myContainer">
<ClickCounter ref="myCounter" initialCount={1} />
</GeneralContainerComponent>
</div>
);
}
}container = document.createElement('div');
document.body.appendChild(container);let testRefsComponent;
expect(() => {
testR'Warning: Component "div" contains the string ref "resetDiv". ' +
'Support for string refs will be removed in a future major release. ' +
'We recommend using useRef() or createRef() instead. ' +
'Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref\n' +
'in div (at **)\n' +
'in TestRefsComponent (at **)',
'Warning: Component "span" contains the string ref "clickLog0". ' +
'S'Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref\n' +
'in span (at **)\n' +
'in ClickCounter (at **)\n' +
'in div (at **)\n' +
'in GeneralContainerComponent (at **)\n' +
'in div (at **)\n' +
'in TestRefsComponent (at **)',
]);expect(testRefsComponent instanceof TestRefsComponent).toBe(true);const generalContainer = testRefsComponent.refs.myContainer;
expect(generalContainer instanceof GeneralContainerComponent).toBe(true);const counter = testRefsComponent.refs.myCounter;
expect(counter instanceof ClickCounter).toBe(true);return testRefsComponent;
  };  /**
* Ensure that for every click log there is a corresponding ref (from the
*it('Should increase refs with an increase in divs', () => {
const testRefsComponent = renderTestRtestRefsComponent,
'clickIncrementer',
);expectClickLogsLengthToBe(testRefsComponent, 1);// After clicking the reset, there should still only be one click log ref.
testRefsComponent.refs.resetDiv.click();
expectClickLogsLengthToBe(testRefsComponent, 1);// Begin incrementing clicks (and therefore refs).
clickIncrementer.click();
expectClickLogsLengthToBe(testRefsComponent, 2);clickIncrementer.click();
expectClickLogsLengthToBe(testRefsComponent, 3);// Now reset again
testRefsComponent.refs.resetDiv.click();
expectClickLogsLengthToBe(testRefsComponent, 1);
  });
});if (!ReactFeatureFlags.disableModulePatternComponents) {
  describe('factory components', () => {
it('Should correctly get the ref', () => {
function Comp() {
return {
elemRef: React.createRef(),
render() {
return <div ref={this.elemRef} />;
},
};expect().toErrorDev(
'Warning: The <Comp /> component appears to be a function component that retu"If you can't use a class try assigning the prototype on the function as a workaround. " +
'`Comp.prototype = React.Component.prototype`. ' +);
expe  });
}/**
 * Tests that when a ref hops around children, we can track that correctly.
 */
describe('ref swapping', () => {
  let RefHopsAround;
  beforeEach(() => {
jest.resetModules();
React = require('react');
ReReactTestUtils = require('react-dom/test-utils')hopRef = React.createRef();
divOneRef = React.createRef();
divTwoRef = React.createRef();this.setState({count: this.state.count + 1});
};render() {
const count = this.state.count;* What we have here, is three divs with refs (div1/2/3), but a single
* moving cursor ref `hopRef` that "hops" around the * points to the correct divs.
*/
return (
<div>
<diref={count % 3 === 0 ? this.hopRef : this.divOneRef}
/>
<div
className="second"
ref={count % 3 === 1 ? this.hopRef : this.divTwoRef}
/>
<div
className="third"
ref={count % 3 === 2 ? this.hopRef : this.divThreeRef}
/>
<}
};
  });  it('Allow refs to hop around children correctly', () => {
const refHopsAround = ReactTestUtils.renderIntoDocument(<RefHopsAround />);const firstDiv = ReactTestUtils.findRenderedDOMComponentWithClass(
refHopsAround,
'first',
);
const secondDiv = ReactTestUtils.findRenderedDOMComponentWithClass(
refHopsAround,
'second',
);
const thirdDiv = ReactTestUtils.findRenderedDOMComponentWithClass(
refHopsAround,
'expect(refHopsAround.divTwoRef.current).toEqual(secondDiv);
expect(refHopsAround.divThreeRef.current).toEqual(thirdDiv);refHopsAround.moveRef();
expect(refHopsAround.divOneRef.current).toEqual(firstDiv);
expect(refHopsAround.hopRef.current).toEqual(secondDiv);
expect(refHopsAround.divThreeRef.current).toEqual(thirdDiv);refHopsAround.moveRef();
expect(refHopsAround.divOneRef.current).toEqual(firstDiv);
expect(refHopsAround.divTwoRef.current).toEqual(secondDiv);
expect(refHopsAround.hopRef.current).toEqual(thirdDiv);/**
* Make sure that after the third, we're back to where we started and the
* refs are completely restored.
*/expect(refHopsAround.hopRef.current).toEqual(firstDiv);
expect(refHopsAround.divTwoRef.current).toEqual(secondDiv);
expect(refHopsAround.divThreeRef.current).toEqual(thirdDiv);
  });  it('always has a value for this.refs', () => {
class Component extends React.Component {
render() {}
}const instance = ReactTestUtils.renderIntoDocument(<Component />);
let refCalled = 0;
function Inner(props) {
return <a ref={props.saveA} />;
}class Outer extends React.Component {
saveA = () => {
refCalled++;
};componentDidMount() {
this.setState({});
}render() {
return <Inner saveA={this.saveA} />;
}
}ReactTestUtils.renderIntoDocument(<Outer />);
expect(refCalled).toBe(1);
  });  it('coerces numbers to strings', () => {
class A extends React.Component {
render() {
return <div ref={1} />;
}
}
let a;
expect(() => {
a = ReactTestUtils.renderIntoDocument(<A />);
}).toErrorDev([
'Warning: Component "A" contains the string ref "1". ' +
'Support for string refs will be removed in a future major release. ' +
'We recommend using useRef() or createRef() instead. ' +
'Lear]);
expect(a.refs[1].nodeName).toBe('DIV');expect(() => {
ReactTestUtils.renderIntoDocument(<div ref={10} />);
}).toThrow(
'Expected ref to be a function, a string, an object returned by React.createRef(), or null.',
);
expect(() => {
ReactTestUtils.renderIntoDocument(<div ref={true} />);
}).toThrow(
'Expected ref to be a function, a string, an object returned by React.createRef(), or null.',
);
expect(() => {
ReactT'Expected ref to be a function, a string, an object returned by React.createRef(), or null.',
);
// This worksReactTestUtils.renderIntoDocument({
$$typeof: Symbol.for('react.element'),
type: 'div',
props: {},ref: null,
});
// But this doesn't
expect(() => {$$typeof: Symbol.for('react.element'),
type: 'div',
props: {},
key: null,
ref: undefined,
});
}).toThrow(
'Expected ref to be a function, a string, an object returned by React.createRef(), or null.',
)});describe('root level refs', () => {
  it('attaches and detaches root refs', () => {
let inst = null;// host node
let ref = jest.fn(value => (inst = value));
const container = document.createElement('div');
lexpect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLDivElement);
expect(result).toBe(ref.mock.calls[0][0]);
Rexpect(ref.mock.calls[1][0]).toBe(null);// composite
class Comp extends React.Component {
method() {
return true;
}return <div>Comp</div>;
}
}inst = null;
expect(inst).toBeInstanceOf(Comp);
expect(result).toBe(inst);// ensure we have the correct instance
expect(ref).toHaveBeenCalledTimes(2);
expect(ref.mock.calls[1][0]).toBe(null);// fragment
inst = null;
rconst ref2 = jest.fn(value => (divInst = value));
result = ReactDOM.render(
[5,
<div ref={ref2} key="b">
Hello
</div>,
],
container,
);// first call should be `Comp`
expect(ref).toHaveBeenCalledTimes(1);
expect(ref.mock.calls[0][0]).toBeInstanceOf(Comp);
expect(result).toBe(ref.mock.calls[0][0]);expect(ref2).toHaveBeenCalledTimes(1);
expect(divInst).toBeInstanceOf(HTMLDivElement);
expect(result).not.toBe(divInst);ReactDOM.unmountComponentAtNode(container);
expect(ref).toHaveBeenCalledTimes(2);
expect(ref.mock.calls[1][0]).toBe(null);
expect(ref2).toHaveBeenCalledTimes(2);
expect(ref2.mock.calls[1][0]).toBe(null);// null
result = ReactDOM.render(null, container);
eexpect(result).toBeInstanceOf(Text);
  });
});describe('creating element with string ref in constructor', () => {
  class RefTest extends React.Component {
constructor(props) {
super(props);
this.p = <p ref="p">Hello!</p>;
}render() {
return <div>{this.p}</div>;
}
  }  it('throws an error', () => {
ReactTestUtils = require('react-dom/test-utils');expect(function () {
ReactTestUtils.renderIntoDocument(<RefTest />);
}).toThrowError(
'Element ref was specified as a string (p) but no owner was set. This could happen for one of' +
' the following reasons:\n' +
'1. You may be adding a ref to a function component\n' +
"2. You may be adding a ref to a component that was not created inside a component's render method\n" +
'3. You have multiple copies of React loaded\n' +
'See https://reactjs.org/link/refs-must-have-owner for more information.',
);
  });
});describe('strings refs across renderers', () => {
  it('does not break', () => {
class Parent extends React.Component {
render() {
// This component owns both refs.
return (
<Indirection
child1={<div ref="child1" />}
child2={<div ref="child2" />}
/>
);
}
}class Indirection extends React.Component {
componentDidUpdate() {
// One ref is being rendered later using another renderer copy.
jest.resetModules();
con}
render() {
// The other one is }
}const div1 = document.createElement('div');
const div2 = document.createElement('div');let inst;
expect(() => {
inst = ReactDOM.render(<Parent />, div1);
}).toErrorDev([
'Warning: Component "Indirection" contains the string ref "child1". ' +
'Support for string refs will be removed in a future major release. ' +
'We recommend using useRef() or createRef() instead. ' +
'Learn more about using refs safely here: ht'in Parent (at **)',
]);// Only the first ref has rendered yet.
expect(inst.refs.child1.tagName).toBe('DIV');
expect(inst.refs.child1).toBe(div1.firstChild);expect(() => {
// Now both refs should be rendered.
ReactDOM.render(<Parent />, div1);
}).toErrorDev(
[
'Warn'We recommend using useRef() or createRef() instead. ' +
'Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',
],);
expect(inst.refs.child1.tagName).toBe('DIV');
expect(inst.refs.child1).texpect(inst.refs.child2).toBe(div2.firstChild);
  });
});describe('refs return clean up funconst container = document.createElement('div');
let cleanUp = jest.fn();
let setup = jest.fn();ReactDOM.renderef={_ref => {
setup(_ref);
return cleanUp;
}}
/>,
container,
);ReactDOM.render(
<div
ref={_ref => {
setup(_ref);
}}
/>,
container,
);expect(setup).toHaveBeenCalledTimes(2);
exexpect(setup).toHaveBeenCalledTimes(3);
expect(setup.mock.calls[2][0]).toBe(null);cleanUp = jest.fn();
setup = jest.fn();ReactDOM.render(
<divsetup(_ref);
return cleanUp;
}}container,
);expect(setup).toHaveBeenCalledTimes(1);
expect(cleanUp).toHaveBeenCalledTimes(0);ReactDOM.render(
<div
ref={_ref => {return cleanUp;
}}
/>,);expect(setup).toHaveBeenCalledTimes(2);
expect(cleanUp).toHaveBeenCalledTimes(1);
  });  it('handles ref functions with stable identity', () => {
const container = document.createElement('div');
setup(_ref);
return cleanUp;
}ReactDOM.render(<div ref={_onRefChange} />, container);expect(setup).toHaveBeenCalledTimes(1);
expect(cleanUp).toHaveBeenCalledTimes(0);ReactDOM.render(
<div className="niceClassName" ref={_onRefChange} />,
contaexpect(cleanUp).toHaveBeenCalledTimes(0);ReactDOM.render(<div />, container);expect(setup).toHaveBeenCalledTimes(1);
expect(cleanUp).toHaveBeenCalledTimes(1);
  });  it('warns if clean up function is returned when called with null', () => {
const setup = jest.fn();
let returnCleanUp = false;ReactDOM.render(ref={_ref => {
setup(_ref);
if (returnCleanUp) {
return cleanUp;
}
}}
/>,
container,
);expect(setup).toHaveBeenCalledTimes(1);
expect(cleanUp).toHaveBeenCalledTimes(0);returnCleanUp = true;expect(() => {
ReactDOM.render(
<disetup(_ref);
if (returnCleanUp) {
return cleanUp;
}
}}
/>,
container,
);
}).toErrorDev('Unexpected return value from a callback ref in div');
  });
});
