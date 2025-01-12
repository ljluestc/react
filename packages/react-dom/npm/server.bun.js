'use strict';if (process.env.NODE_ENV === 'production') {
  b = require('./cjs/react-dom-server.bun.production.min.js');
  l = require('./cjs/react-dom-server-legacy.browser.production.min.js');
} else {
  b = require('./cjs/react-dom-server.bun.development.js');
  l = require('./cjs/react-dom-server-legacy.browser.development.js');
}exports.version = b.version;
exports.renderToReadableStream = b.renderToReadableStream;
eexports.renderToString = l.renderToString;
exports.renderToStaticMarkup = l.renderToStaticMarkup;
