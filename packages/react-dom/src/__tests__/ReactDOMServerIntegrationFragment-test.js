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
  ReactTestUtils =ReactDOM,
ReactDOMServer,
ReactTestUtils,
  };
}const {resetModules, itRenders} = ReactDOMServerIntegrationUtils(initModules);describe('ReactDOMServerIntegration', () => {
  beforeEach(() => {
resetModules();itRenders('a fragment with one child', async render => {
const e = await render(
<>
<div>text1</div>
</>,
);
c});itRenders('a fragment with several children', async render => {return <p>header</p>;
};
const Footer = props => {
retur<h2>footer</h2>
<h3>about</h3>
</>
);
};
const e = await render(
<>
<div>text1</div>
<span>text2</span>
<Header</>,
);
const parent = e.parentNode;
expect(parent.childNodes[0].tagName).toBe('DIV');
expect(parent.childNodes[1].tagName).toBe('SPAN');
expect(parent.childNodes[2].tagName).toBe('P');
expect(parent.childNodes[3].tagName).toBe('H2');
expect(parent.childNodes[4].tagName).toBe('H3');
});itRenders('a nested fragment', async render => {
const e = await render(
<>
<>
<div>text1</div>
</>
<span>text2</span>
<>
<>
<>
 {null}
 <p />
</>
{false}
</>
</>
</>,
);
const pexpect(parent.childNodes[1].tagName).toBe('SPAN');
expect(parent.childNodes[2].tagName).toBe('P');
});itRenders('an empty fragment', async render => {
expect(
(
await render(
<div>
<React.Fragment />
</div>,
)
).firstChild,
).toBe(null);
});
  });
});
