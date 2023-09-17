/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */  beforeEach(React = require('react');
ReactDOMServerconst response = ReactDOMServer.renderToString(<img data-attr="&" />);
expect(response).toMatch('<img data-attr="&amp;"/>');
  });  it('double quote is escaped inside attributes', () => {
const response = ReactDOMServer.renderToString(<img data-attr={'"'} />);
expect(response).toMatch('<img data-attr="&quot;"/>');
  });expect(response).toMatch('<img data-attr="&#x27;"/>');
  });  it('greater than entity is escaped inside attributes', () => {
const response = ReactDOMServer.renderToString(<img data-attr=">" />);
econst response = ReactDOMServer.renderToString(<img data-attr="<" />);
expect(response).toMatch('<img data-attr="&lt;"/>');
  });  it('number is escaped to string inside attributes', () => {
c  });  it('object is passed to a string inside attributes', () => {
const sampleObject = {
toString: function () {
retur};const response = ReactDOMServer.renderToString(
<img data-attr={sampleObject} />,
);
econst response = ReactDOMServer.renderToString(
<img data-attr={'<script type=\'\' src=""></script>'} />,
);
e'src=&quot;&quot;&gt;&lt;/script&gt;"/>',
);
  });
});