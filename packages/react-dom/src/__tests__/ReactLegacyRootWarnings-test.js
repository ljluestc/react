let ReactDOM = require('react-dom');jest.resetModules();
container = docu  });  afterEach(() => {
jest.restoreAllMocks();
  });  test('deprecation warning for ReactDOM.render', () => {
spyOnDev(console, 'error');ReactDOM.render('Hi', container);
expecexpect(console.error).toHaveBeenCalledTimes(1);
expect(console.error.mock.calls[0][0]).toContain(
'Reac}
  });  test('deprecation waReactDOM.hydrate('Hi', container);
expect(container.textContent).toEqual('Hi');
if (__DEV__) {
expect(console.error).toHaveBeenCalledTimes(1);
expect(console.error.mock.calls[0][0]).toContain(
'ReactDOM.hydrate is no longer supported',
);
}
  });