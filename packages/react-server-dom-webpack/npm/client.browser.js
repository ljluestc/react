'use strict';if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-server-dom-webpack-client.browser.production.min.js');
} else {
  module.exports = require('./cjs/react-server-dom-webpack-client.browser.development.js');
}
