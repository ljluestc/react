/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */let ReactDOMS  // Reset warning cache.  ReactDOM = require('react-dom');
  ReactDOMServer = require('react-dom/server');
  ReactTestUtils = require('react-dom/test-utils');  // Make them available to the helpers.
  return {ReactDOMServer,
ReactTestUtils,
  };  ReactDOMServerIntegrationUtils(initModules);describe('ReactDOMServerIntegration', () => {
  beforeEach(() => {
resetModules();
  });  describe('reconnecting to server markup', fubeforeEach(() => {
EmptyComponent = class extends React.Component {
render() {
return null;
}
};
 let ES6ClassComponent, PureComponent, bareElement;
beforeEach(() => {ES6ClassComponent = class extends React.Component {
render() {
return <div id={this.props.id} />;
}PureComponent = props => <div id={props.id} />;
bareElement = <div id="foobarbaz" />;
});it('should reconnect ES6 Class to ES6 Class', () =>
expectMarkupMatch(
<ES6ClassComponent id="foobarbaz" />,
<ES6ClassComponent id="foobarbaz" />,
));it('should reconnect Pure Component to ES6 Class', () =>
expectMarkupMatch(
<ES6Cla));it('should reconnect Bare Element to ES6 Class', () =>
expectMarkupMatch(<ES6ClassComponent id="foobarbaz" />, bareElement));it('should reconnect ES6 Class to Pure Component', () =>
expectMarkupMatch(
<PureComponent id="foobarbaz" />,
<ES6ClassComponent id="foobarbaz" />,
));it('should reconnect Pure Component to Pure Component', () =>
expectMarkupMatch(
<PureComponent id="foobarbaz" />,
<PureComponent id="foobarbaz" />,
));it('should reconnect Bare Element to Pure Component', () =>
expectMarkupMatch(<PureComponent id="foobarbaz" />, bareElement));it('should reconnect ES6 Class to Bare Element', () =>
expectMarkupMatch(bareElement, <ES6ClassComponent id="foobarbaz" />));it('should reconnect Pure Component to Bare Element', () =>
exp});it('should error reconnecting different element types', () =>
expectMarkupMismatch(<div />, <span />));it('should error reconnecting fewer root children', () =>
expectMarkupMismatch(<span key="a" />, [
<span key="a" />,
<spexpectMarkupMismatch(<div id="foo" />, <div />));it('should error reconnecting added attributes', () =>
expectMarkupMismatch(<div />, <div id="foo" />));it('should error reconnecting different attribute values', () =>
expectMarkupMismatch(<div id="foo" />, <div id="bar" />));it('can explicitly ignore errors reconnecting different element types of children', () =>
expectMarkupMatch(
<di</div>,
<div suppressHydrationWarning={true}></div>,
));it('can explicitly ignore errors reconnecting missing attributes', () =>
expectMarkupMatch(
<div id="foo" />,
<diexpectMarkupMatch(
<div />,
<div id="foo" suppressHydrationWarning={true} />,
));it('can explicitly ignore errors reconnecting different attribute values', () =>
exp<div id="bar" suppressHydrationWarning={true} />,
));it('can not deeply ignore errors reconnecting different attribu<div>
<div id="foo" /><div suppressHydrationWarning={true}>
<div id="bar" />));
});describe('inline styles', function () {
it(expectMarkupMismatch(<div />, <div style={{width: '1px'}} />));it('should error reconnecting empty style attribute', () =>
expectMarkupMismatch(<div style={{}} />,
));it('should error reconnecting added style values', () =>
expectMarkupMismatch(
<div style={{}} />,
<divexpectMarkupMismatch(
<div style={{width: '1px'}} />,));it('should reconnect number and string versions of a number', () =>
expectMarkupMatch(<div style={{width: 1, height: '2px'}} />,
));it('should error reconnecting reordered style values', <div style={{width: '1px', fontSize: '2px'}} />,
<div style={{fontSize: '2px', width: '1px'}} />,
));it('can explicitly ignore errors reconnecting added style values', () =>
expectMarkupMatch(
<div style={{}} />,
<div style={{width: '1px'}} suppressHydrationWarning={true} />,
));it('can explicitly ignore reconnecting different style values', () =>
expectMarkupMatch(
<di));
});describe('text nodes', function () {
it('should error reconnecting different text', () =>
expectMarkupMismatch(<div>Text</div>, <div>Other Text</div>));it('should reconnect a div with a number and string version of number', () =>
expexpectMarkupMismatch(<div>{2}</div>, <div>3</div>));it('should error reconnecting different text in two code blocks', () =>
expectMarkupMismatch(
<div>
{'Text1'}
{'T<div>
{'Text1'}
{'Text3'}
</div>,
));<div>Text</div>,
<div suppressHydrationWarning={true}>Other Text</div>,
));it('can explicitly ignore reconnecting different text in two code blocks', () =>
expectMarkupMatch(
<div suppressHydrationWarning={true}>
{'Text1'}
{'Text2'}
</div>,
<div suppressHydrationWarning={true}>
{'Text1</div>,
));
});describe('element trees and children', function () {expectMarkupMismatch(
<div></div>,
<div />,
));it('should error reconnecting added children', () =>
expectMarkupMismatch(
<di<div />
</div>,
));it('should error reconnecting more children', () =>
expectMarkupMismatch(
<di</div>,
<div>
<div />
<div />
</dexpectMarkupMismatch(
<div>
<div />
<div />
</d<div />
</div>,
));it('should error reconnecting reordered children', () =>
expectMarkupMismatch(
<di<span />
</div>,
<div>
<span />
<di));it('should error reconnecting a div with children separated by whitespace on the client', () =>
expectMarkupMismatch(
<div id="parent">
<div id="child1" />
<div id="child2" />
</div>,<div id="parent"><div id="child1" /><div id="child2" /></div>, // eslint-disable-line no-multi-spaces
));it('should error reconnecting a div with children separated by different whitespace on the server', () =>
expectMarkupMismatch(<div id="parent"><div id="child1" /><div id="child2" /></div>, // eslint-disable-line no-multi-spaces
<div id="parent"><div id="child2" />
</div>,expectMarkupMismatch(
<div id="parent"></div>,
// prettier-ignore
<div id="parent"><div id="child1" /><div id="child2" /></div>, // eslint-disable-line no-multi-spaces
));it('can distinguish an empty component from a dom node', () =>
expectMarkupMismatch(
<div>
<span />
</div>,
<div>
<EmptyComponent />
</dexpectMarkupMatch(
<div>
<EmptyComponent />
</div>,
<diexpectMarkupMatch(
<div>
<div />
</div>,
<div suppressHydrationWarning={true}>
<div />
<div />
</div>,
));it('can explicitly ignore reconnecting fewer children', () =>
expectMarkupMatch(
<div>
<div /></div>,
<div suppressHydrationWarning={true}>
<div />
</div>,
));it('can explicitly ignore reconnecting reordered children', () =>
expectMarkupMatch(
<div suppressHydrationWarning={true}>
<di</div>,
<div suppressHydrationWarning={true}>
<span />
<div />
</div>,
));it('can not deeply ignore reconnecting reordered children', () =>
exp<div>
<div />
<span />
</div>
</div>,
<div suppressHydrationWarning={true}>
<div>
<span />
<div />
</d));
});// Markup Mismatches: misc
it('should error reconnecting a div with different dangerouslySetInnerHTML', () =>
expectMarkupMismatch(
<div dangerouslySetInnerHTML={{__html: "<span id='child1'/>"}} />,
<div dangerouslySetInnerHTML={{__html: "<span id='child2'/>"}} />,
));it('should error reconnecting a div with different text dangerouslySetInnerHTML', () =>
expectMarkupMismatch(
<div dangerouslySetInnerHTML={{__html: 'foo'}} />,
<diexpectMarkupMismatch(
<div dangerouslySetInnerHTML={{__html: 10}} />,
<div dangerouslySetInnerHTML={{__html: 20}} />,
));it('should error reconnecting a div with different object dangerouslySetInnerHTML', () =>
expectMarkupMismatch(
<div
dangerouslySetInnerHTML={{
__html: {
toString() {
 return 'hi';
},}}
/>,
<div
dangerouslySetInnerHTML={{
__html: {
toString() {
 return 'bye';
},
},/>,
));it('can explicitly ignore reconnecting a div with different dangerouslySetInnerHTML', () =>
expectMarkupMatch(
<div dangerouslySetInnerHTML={{__html: "<span id='child1'/>"}} />,
<div
dangerouslySetInnerHTML={{__html: "<span id='child2'/>"}}
suppressHydrationWarning={true}
/>,
));});
