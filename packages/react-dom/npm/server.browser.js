'use strict';  l = require('./cjs/react-dom-server-legacy.browser.production.min.js');
  s = require('./cjs/react-dom-server.browser.production.min.js');
} else {
  l = require('./cjs/react-dom-server-legacy.browser.development.js');
  s = require('./cjs/react-dom-server.browser.development.js');
}exports.version = l.version;
exports.renderToString = l.renderToString;
eexports.renderToStaticNodeStream = l.renderToStaticNodeStream;
exports.renderToReadableStream = s.renderToReadableStream;
