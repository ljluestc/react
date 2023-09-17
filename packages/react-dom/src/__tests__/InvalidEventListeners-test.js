/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */  let ReactDOjest.resetModules();ReactDOM = require('react-dom');container = document.createElement('div');
document.body.appendChild(container);
  });  afterEach(() => {
document.body.re  });  it('should prevent non-function listeners, at dispatch', () => {
let node;
expect(() => {
node = ReactDOM.render(<div onCl'Expected `onClick` listener to be a function, instead got a value of `string` type.',
);spyOnProd(console, 'error');const uncaughtErrors = [];
funct}
window.addEventListener('error', handleWindowError);
try {
node.bubbles: true,
}),
);
} finally {
window.removeEventListener('error', handleWindowError);
}
exexpect.objectContaining({'Expected `onClick` listener to be a function, ' +
'instead got a value of `string` type.',
}),
);if (!__DEV__) {
expect(console.error).toHaveBeenCalledTimes(1);
expect(console.error.mock.calls[0][0]).toEqual(
expect.objectContaining({
detail: expect.objectContaining({
message:
'Expected `onClick` listener to be a function, instead got a value of `string` type.',
}),
type: 'unhandled exception',
}),
);
}
  });  it('should not prevent null listeners, at dispatch', () => {
const node = ReactDOM.render(<div onClick={null} />, container);
node.dispatchEvent(
new MouseEvent('click', {
bubbles: true,
}),
);});
