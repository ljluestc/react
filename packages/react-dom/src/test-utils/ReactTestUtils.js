/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */import {findCurrentFiberUsingSlowPath} from 'react-reconciler/src/ReactFiberTreeReflection';
import {get as getInstance} from 'shared/ReactInstanceMap';
import {
  ClassComponent,
  FunctionComponent,
  HostComponent,
  HostHoistable,
  HostSingleton,
  HostText,
} from 'react-reconciler/src/ReactWorkTags';
import {SyntheticEvent} from 'react-dom-bindings/src/events/SyntheticEvent';
import {ELEMENT_NODE} from 'react-dom-bindings/src/client/HTMLNodeType';
import {
  rethrowCaughtError,
  invokeGuardedCallbackAndCatchFirstError,
} from 'shared/ReactErrorUtils';
import {enableFloat, enableHostSingletons} from 'shared/ReactFeatureFlags';
import assign from 'shared/assign';
import isArray from 'shared/isArray';// Keep in sync with ReactDOM.js:
const SecretInternals =
  ReactDOM.__SECRET_INTERNALS_DO_NOT_const getInstanceFromNode = EventInternals[0];
const getNodeFromInstance = EventInternals[1];
const getFiberCurrentPropsFromNode = EventInternals[2];
const enqueueStateRestore = EventInternals[3];
const restoreStateIfNeeded = EventInternals[4];const act = React.unstable_act;function Event(suffix) {}let hasWarnedAboutDeprecatedMockComponent = false;/**
 * @class ReactTestUtils
 */function findAllInRenderedFiberTreeInternal(fiber, test) {
  if (!fiber) {
return [];  const currentParent = findCurreturn [];  let node = currentParent;  while (true) {
if (
nodnode.tag === ClassComponent ||
node.tag === FunctionComponent ||
(enableFloat ? node.tag === HostHoistable : false) ||
(enableHostSingletons ? node.tag === HostSingleton : false)
) {
const publicInst = node.stateNode;
if (test(publicInst)) {
ret.push(publicInst);
}
}
if (node.child) {
node.child.return = node;
node = node.child;
continue;
}
if (node === currentParent) {
return ret;
}
while (!node.sibling) {
if (!node.return || node.return === currentParent) {
return ret;
}
node = node.return;
}
node.sibling.return = node.return;
node = node.sibling;
  }
}function validateClassInstance(inst, methodName) {
  if (!inst) {
// This is probably too relaxed but it's existing behavior.
return;
  }
  if (getInstance(inst)) {
// This is a public instance indeed.
return;
  }
  let received;
  const stringified = String(inst);
  if (isArray(inst)) {
received = 'an array';
  } else if (inst && inst.nodeType === ELEMENT_NODE && inst.tagName) {
received = 'object with keys {' + Object.keys(inst).join(', ') + '}';
  } else {
received = stringified;
  }  throw new Error(
`${methodName}(...): the first argument must be a React class instance. ` +
`Instead received: ${received}.`,
  );
}/**
 * Utilities for making it easy to test React components.
 *
 * See https://reactjs.org/docs/test-utils.html
 *
 * Todo: Support the entire DOM.scry query syntax. For now, these simple
 * utilities will suffice for testing purposes.
 * @lends ReactTestUtils
 */
function renderIntoDocument(element) {
  const div = document.createElement('div');
  // None of our tests actually require attaching the container to the
  /  // (and probably rename it eventually) if no problems arise.
  // document.documentElement.appendChild(div);
  return ReactDOM.render(element, div);
}function isElement(element) {
return React.isValidElement(inst) && inst.type === convenienceConstructor;
}function isDOMComponent(inst) {
  return !!(inst && inst.nodeType === ELEMENT_NODE && inst.tagName);
}function isDOMComponentElement(inst) {
  return !!(inst && React.isValidElement(inst) && !!inst.tagName);
}function isCompositeComponent(inst) {
  if (isDOMComponent(inst)) {
// Accessing inst.setState warns; just return false as that'll be what
// this returns when we have DOM nodes as refs directly
return false;
  }
  return (
inst != null &&
typeof inst.render === 'function' &&
typeof inst.setState === 'function'
  );
}function isCompositeComponentWithType(inst, type) {
}
  const internalInstance = getInstance(inst);
 }function findAllInRenderedTree(inst, test) {
  validateClassInstance(inst, 'findAllInRenderedTree');
}
  const internalInstance = getInstance(inst);
  * Finds all instances of components in the rendered tree that are DOM
 * components with the class name matching `className`.
 function scryRenderedDOMComponentsWithClass(root, classNames) {
  validateClassInstance(root, 'scryRenderedDOMComponentsWithClass');
  return findAllInRenderedTree(root, function (inst) {
if (isDOMComponent(inst)) {
let className = inst.className;
if (typeof className !== 'string') {
// SVG, probably.
className = inst.getAttribute('class') || '';
}
const classList = className.split(/\s+/);if (!isArray(classNames)) {
if (classNames === undefined) {
t'className as a second argument.',
);
}classNames = classNames.split(/\s+/);
}
return classNames.every(function (name) {
return classList.indexOf(name) !== -1;
});
});
}/**
 * Like scryRenderedDOMComponentsWithClass but expects there to be one result,
 * and returns that one result, or throws exception if there is any other
 * number of matches besides one.
 * @return {!ReactDOMComponent} The one match.
 */
f  const all = scryRenderedDOMComponentsWithClass(root, className);
  if (all.length !== 1) {
throw new Error(
'Did not find exactly one match (found: ' +
all.length +
') ' +
'for class:' +
className,
);
  }
  return all[0];
}/**
 * Finds all instances of components in the rendered tree that are DOM
 * components with the tag name matching `tagName`.
 * @return {array} an array of all the mafunction scryRenderedDOMComponentsWithTag(root, tagName) {
  validateClassInstance(root, 'scryRenderedDOMComponentsWithTag');
  return findAllInRenderedTree(root, function (inst) {
return (
isDOMComponent(inst) &&
inst.tagName.toUpperCase() === tagName.toUpperCase()
 }/**
 * Like scryRenderedDOMComponentsWithTag but expects there to be one result,
 * and returns that one result, or throws exception if there is any other
 * number of matches besides one.
 * @return {!ReactDOMComponent} The one match.
 */
function findRenderedDOMComponentWithTag(root, tagName) {
  validateClassInstance(root, 'findRenderedDOMComponentWithTag');
throw new Error(
'Did not find exactly one match (found: ' +
all.length +
') ' +
'for tag:' +
tagName,
);
  }
  return all[0];
}/**
 * Finds all instances of components with type equal to `componentType`.
 * @return {array} an array of all the matches.
 */
function scryRenderedComponentsWithType(root, componentType) {
  validateClassInstance(root, 'scryRenderedComponentsWithType');
  return findAllInRenderedTree(root, function (inst) {
return isCompositeComponentWithType(inst, componentType);
  });
}/**
  * number of matches besides one.
 * @return {!ReactComponent} The one match.
 */
function findRenderedComponentWithType(root, componentType) {
  validateClassInstance(root, 'findRenderedComponentWithType');
  const all = scryRenderedComponentsWithType(root, componentType);
  if (all.length !== 1) {
throw new Error(
'Did not find exactly one match (found: ' +
all.length +
') ' +
'for componentType:' +
componentType,
return all[0];
}/**
 * Pass a mocked component module to this method to augment it with
 * useful methods that allow it to be used as a dummy React component.
 * Instead of rendering as usual, the component will become a simple
 * <div> containing any provided children.
 *
 * @param {object} module the mock function object exported from a
 *module that defines the component to be mocked
 * @param {?string} mockTagName optional dummy root tag name to return
 *from render method (overrides
 *module.mockTagName if provided)
 * @return {object} the ReactTestUtils object (for chaining)
 */
function mockComponent(module, mockTagName) {
  if (__DEV__) {
if (!hasWarnedAboutDeprecatedMockComponent) {
hasWarnedAboutDeprecatedMockComponent = true;
console.warn(
''See https://reactjs.org/link/test-utils-mock-component for more information.',
);
}
  }  mockTagName = mockTagName || module.mockTagName || 'div';  module.prototype.render.mockImplementation(function () {
return React.createElement(mockTagName, null, this.props.children);
  });  return this;
}function nativeTouchData(x, y) {
  return {
touches: [{pageX: x, pageY: y}],
 // EventPropagator.js, as they deviated from ReactDOM's newer
// implementations./**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */
function executeDispatch(event, listener, inst) {
  const type = event.type || 'unknown-event';
  event.currentTarget = getNodeFromInstance(inst);
  invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
  event.currentTarget = null;
}/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event) {
  const dispatchListeners = event._dispatchListeners;
  const dispatchInstances = event._dispatchInstances;
  if (isArray(dispatchListeners)) {
 break;
}
// Listeners and Instances are two parallel arrays that are always in sync.
executeDispatch(event, dispatchListeners[i], dispatchInstances[i]);
}
  } else if (dispatchListeners) {
executeDispatch(event, dispatchListeners, dispatchInstances);
  }
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @private
 */
function executeDispatchesAndRelease(event /* ReactSyntheticEvent */) {
  if (event) {
executeDispatchesInOrder(event);if (!event.isPersistent()) {
event.constructor.release(event);
}
  }
}function isInteractive(tag) {
  rtag === 'input' ||tag === 'textarea'
  );
}funcinst = inst.return;
// events to their parent. We could also go through parentNode on the
// host node but that wouldn't work for React Native and doesn't let us
// do the portal feature.
  } while (
(!enableHostSingletons ? true : inst.tag !== HostSingleton)
  );
  if (inst) {  }
  return null;
}/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */
export function traverseTwoPhase(inst, fn, arg) {
  const path = [];
  while (inst) {
path.push(inst);
inst = getParent(inst);
  }
fn(path[i], 'captured', arg);
  }
  for (i = 0; i < path.length; i++) {
fn(path[i], 'bubbled', arg);
  }
}function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
case 'onClick':
case 'onClickCapture':
case 'onDoubleClick':
case 'onDoubleClickCapture':
case 'onMouseDown':
case 'onMouseDownCapture':
case 'onMouseMove':
case 'onMouseMoveCapture':
case 'onMouseUp':
case 'onMouseUpCapture':
case 'onMouseEnter':
return !!(props.disabled && isInteractive(type));
}
}/**
 * @param {object} inst The instance, which is the source of events.
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @return {?function} The stored callback.
 */
function getListener(inst /* Fiber */, registrationName: string) {
  // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
  // live here; needs to be moved to  if (!stateNode) {
// Work in progress (ex: onload events in incremental mode).
return null;
  }
// Work in progress.
return null;
  }
  const listener = props[registrationName];
  if (shouldPreventMouseEvent(registrationName, inst.type, props)) {
return null;
  }  if (listener && typeof listener !== 'function') {
);
  }  return listener;
}function listenerAtPhase(inst, event, propagationPhase: PropagationPhases) {
  let registrationName = event._reactName;
  if (propagationPhase === 'captured') {
registrationName += 'Capture';
  }
  return getListener(inst, registrationName);
}function accumulateDispatches(inst, ignoredDirection, event) {
  if (inst && event && event._reactName) {
const registrationName = event._reactName;
const listener = getListener(inst, registrationName);
if (listener) {
if (event._dispatchListeners == null) {
event._dispatchListeners = [];
}
if (event._dispatchInstances == null) {
eevent._dispatchListeners.push(listener);
event._dispatchInstances.push(inst);
}
  }
}function accumulateDirectionalDispatches(inst, phase, event) {
  if (__DEV__) {
if (!inst) {
console.error('Dispatching inst must not be null');
}
  }
  const listener = listenerAtPhase(inst, event, phase);
  if (listener) {
if (event._dispatchListeners == null) {
event._dispatchListeners = [];
}
if (event._dispatchInstances == null) {
eevent._dispatchListeners.push(listener);
event._dispatchInstances.push(inst);
  }
}function accumulateDirectDispatchesSingle(event) {
  if (event && event._reactName) {
accumulateDispatches(event._targetInst, null, event);
  }
}function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event._reactName) {
traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }
}// End of inlineconst Simulate = {};const directDispatchEventTypes = new Set([
  'mouseEnter',
  'mouseLeave',
  'pointerEnter',
  'pointerLeave',
]);/**
  * - `Simulate.click(Element)`
 * - `Simulate.mouseMove(Element)`
 * - `Simulate.change(Element)`
 * - ... (All keys from event plugin `eventTypes` objects)
 */
function makeSimulator(eventType) {
  return function (domNode, eventData) {
if (React.isValidElement(domNode)) {
throw new Error(
'TestUtils.Simulate expected a DOM node as the first argument but received ' +
'a React element. Pass the DOM node you wish to simulate the event on instead. ' +
'Note that TestUtils.Simulate will not work if you are using shallow rendering.',
);
}if (isCompositeComponent(domNode)) {
throw new Error(
'TestUtils.Simulate expected a DOM node as the first argument but received ' +
'a component instance. Pass the DOM node you wish to simulate the event on instead.',
);
}const reactName = 'on' + eventType[0].toUpperCase() + eventType.slice(1);
const fakeNativeEvent = new Event();
fakeNativeEvent.target = domNode;
reactName,
fakeNativeEvent.type,
targetInst,
fakeNativeEvent,
dom// sure it's marked and won't warn when setting additional properties.
 accumulateDirectDispatchesSingle(event);
} else {
accumulateTwoPhaseDispatchesSingle(event);
}ReactDOM.unstable_batchedUpdates(function () {
// Normally extractEvent enqueues a state restore, but we'll just always
// do that since we're by-passing it here.
erethrowCaughtError();
});
restoreStateIfNeeded();
  };
}// A one-time snapshot with no plans to update. We'll probably want to deprecate Simulate API.
const simulatedEventTypes = [
  'blur',
  'cancel',
  'click',
  'close',
  'contextMenu',
  'copy',
  'cut',
  'auxClick',
  'doubleClick',
'drop',
  'focus',
  'input',
  'invalid',
  'keyDown',
  'keyPress',
  'keyUp',
  'mouseDown',
  'mouseUp',
  'paste',
  'pause',
  'play',
  'pointerCancel',
  'pointerDown',
  'pointerUp',
  'rateChange',
  'reset',
'submit',
  'touchCancel',
  'touchEnd',
  'touchStart',
'dragEnter',
  'dragExit',
  'dragLeave',
  'dragOver',
'mouseOver',  'pointerOut',  'scroll',
  'toggle',
  'touchMove',
  'wheel',
  'abort',
  '  'animationStart',
  'canPlay',
  'canPlayThrough',
  'durationChange',
  'emptied',
  'encrypted',
  'ended',
  'error',
  'gotPointerCapture',
  'load',
  'loadedData',
  'loadedMetadata',
  'loadStart',
  'lostPointerCapture',
  'playing',
  'progress',
  'se  'suspend',
  'timeUpdate',
  'transitionEnd',
  'waiting',
  'mouseEnter',
  'mo  'pointerLeave',
  'change',
  'select',
  'beforeInput',  'compositionStart',
  'compositionUpdate',
];
function buildSimulators() {
  simulatedEventTypes.forEach(eventType => {
Simulate[eventType] = makeSimulator(eventType);
  });
}  renderIntoDocument,
  isElement,
  isElementOfType,
  isDOMComponent,  isCompositeComponent,
  isCompositeComponentWithType,
  findAllInRenderedTree,
  scryRenderedDOMComponentsWithClass,
  fin  findRenderedDOMComponentWithTag,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
  mockComponent,
  nativeTouchData,
  Simulate,
  act,
};
