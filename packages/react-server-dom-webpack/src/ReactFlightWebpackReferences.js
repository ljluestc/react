/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */import type {ReactClientValue} from 'react-server/src/ReactFlightServer';export type ServerReference<T: Function> = T & {
  $$typeof: symbol,
  $$id: string,
  $$bound: null | Array<ReactClientValue>,
};// eslint-disable-next-line no-unused-vars
export type ClientReference<T> = {
  $$typeof: symbol,
  $$id: string,
  $$async: boolean,
};const CLIENT_REFERENCE_TAG = Symbol.for('react.client.reference');
const SERVER_REFERENCE_TAG = Symbol.for('react.server.reference');export function isClientReference(reference: Object): boolean {
  return reference.$$typeof === CLIENT_REFERENCE_TAG;
}export function isServerReference(reference: Object): boolean {
  return reference.$$typeof === SERVER_REFERENCE_TAG;
}export function registerClientReference<T>(
  proxyImplementation: any,
  id: string,
  exportName: string,
): ClientReference<T> {
  return registerClientReferenceImpl(
proxyImplementation,
id + '#' + exportName,
false,
  );
}function registerClientReferenceImpl<T>(
  proxyImplementation: any,
  id: string,
  async: boolean,
): ClientReference<T> {
  return Object.defineProperties(proxyImplementation, {
$$typeof: {value: CLIENT_REFERENCE_TAG},
$$id: {value: id},
$$async: {value: async},
  });
}// $FlowFixMe[method-unbinding]
const FunctionBind = Function.prototype.bind;
// $FlowFixMe[method-unbinding]
const ArraySlice = Array.prototype.slice;
function bind(this: ServerReference<any>) {
  // $FlowFixMe[unsupported-syntax]
  const newFn = FunctionBind.apply(this, arguments);
  if (this.$$typeof === SERVER_REFERENCE_TAG) {
const args = ArraySlice.call(arguments, 1);
newFn.$$typeof = SERVER_REFERENCE_TAG;
newFn.$$id = this.$$id;
newFn.$$bound = this.$$bound ? this.$$bound.concat(args) : args;
  }
  return newFn;
}export function registerServerReference<T>(
  reference: ServerReference<T>,
  id: string,
  exportName: null | string,
): ServerReference<T> {
  return Object.defineProperties((reference: any), {
$$typeof: {value: SERVER_REFERENCE_TAG},
$$id: {value: exportName === null ? id : id + '#' + exportName},
$$bound: {value: null},
bind: {value: bind},
  });
}const PROMISE_PROTOTYPE = Promise.prototype;const deepProxyHandlers = {
  get: function (target: Function, name: string, receiver: Proxy<Function>) {
switch (name) {
// These names are read by the Flight runtime if you end up using the exports object.
case '$$typeof':
// These names are a little too common. We should probably have a way to
// have the Flight runtime extract the inner target instead.
return target.$$typeof;
case '$$id':
return target.$$id;
case '$$async':
return target.$$async;
case 'name':
return target.name;
case 'displayName':
return undefined;
// We need to special case this because createElement reads it if we pass this
// reference.
case 'defaultProps':
return undefined;
// Avoid this attempting to be serialized.
case 'toJSON':
return undefined;
case Symbol.toPrimitive:
// $FlowFixMe[prop-missing]
return Object.prototype[Symbol.toPrimitive];
case 'Provider':
throw new Error(
`Cannot render a Client Context Provider on the Server. ` +
`Instead, you can export a Client Component wrapper ` +
`that itself renders a Client Context Provider.`,
);
}
// eslint-disable-next-line react-internal/safe-string-coercion
const expression = String(target.name) + '.' + String(name);
throw new Error(
`Cannot access ${expression} on the server. ` +
'You cannot dot into a client module from a server component. ' +
'You can only pass the imported name through.',
);
  },
  set: function () {
throw new Error('Cannot assign to a client module from a server module.');
  },
};const proxyHandlers = {
  get: function (
target: Function,
name: string,
receiver: Proxy<Function>,
  ): $FlowFixMe {
switch (name) {
// These names are read by the Flight runtime if you end up using the exports object.
case '$$typeof':
return target.$$typeof;
case '$$id':
return target.$$id;
case '$$async':
return target.$$async;
case 'name':
return target.name;
// We need to special case this because createElement reads it if we pass this
// reference.
case 'defaultProps':
return undefined;
// Avoid this attempting to be serialized.
case 'toJSON':
return undefined;
case Symbol.toPrimitive:
// $FlowFixMe[prop-missing]
return Object.prototype[Symbol.toPrimitive];
case '__esModule':
// Something is conditionally checking which export to use. We'll pretend to be
// an ESM compat module but then we'll check again on the client.
const moduleId = target.$$id;
target.default = registerClientReferenceImpl(
(function () {
throw new Error(
`Attempted to call the default export of ${moduleId} from the server ` +
 `but it's on the client. It's not possible to invoke a client function from ` +
 `the server, it can only be rendered as a Component or passed to props of a ` +
 `Client Component.`,
);
}: any),
target.$$id + '#',
target.$$async,
);
return true;
case 'then':
if (target.then) {
// Use a cached value
return target.then;
}
if (!target.$$async) {
// If this module is expected to return a Promise (such as an AsyncModule) then
// we should resolve that with a client reference that unwraps the Promise on
// the client.const clientReference: ClientReference<any> =
registerClientReferenceImpl(({}: any), target.$$id, true);
const proxy = new Proxy(clientReference, proxyHandlers);// Treat this as a resolved Promise for React's use()
target.status = 'fulfilled';
target.value = proxy;const then = (target.then = registerClientReferenceImpl(
(function then(resolve, reject: any) {
// Expose to React.
return Promise.resolve(resolve(proxy));
}: any),
// If this is not used as a Promise but is treated as a reference to a `.then`
// export then we should treat it as a reference to that name.
target.$$id + '#then',
false,
));
return then;
} else {
// Since typeof .then === 'function' is a feature test we'd continue recursing
// indefinitely if we return a function. Instead, we return an object reference
// if we check further.
return undefined;
}
}
let cachedReference = target[name];
if (!cachedReference) {
const reference: ClientReference<any> = registerClientReferenceImpl(
(function () {
throw new Error(
// eslint-disable-next-line react-internal/safe-string-coercion
`Attempted to call ${String(name)}() from the server but ${String(
name,
)} is on the client. ` +
`It's not possible to invoke a client function from the server, it can ` +
`only be rendered as a Component or passed to props of a Client Component.`,
);
}: any),
target.$$id + '#' + name,
target.$$async,
);
Object.defineProperty((reference: any), 'name', {value: name});
cachedReference = target[name] = new Proxy(reference, deepProxyHandlers);
}
return cachedReference;
  },
  getPrototypeOf(target: Function): Object {
// Pretend to be a Promise in case anyone asks.
return PROMISE_PROTOTYPE;
  },
  set: function (): empty {
throw new Error('Cannot assign to a client module from a server module.');
  },
};export function createClientModuleProxy<T>(
  moduleId: string,
): ClientReference<T> {
  const clientReference: ClientReference<T> = registerClientReferenceImpl(
({}: any),
// Represents the whole Module object instead of a particular import.
moduleId,
false,
  );
  return new Proxy(clientReference, proxyHandlers);
}
