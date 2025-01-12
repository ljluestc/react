/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */export {default as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED} from './src/ReactDOMSharedInternals';
export {
  createPortal,
  createRoot,
  hydrateRoot,
  findDOMNode,
  flushSync,
  hydrate,
  render,
  unmountComponentAtNode,
  unstable_batchedUpdates,
  unstable_renderSubtreeIntoContainer,
  unstable_runWithPriority, // DO NOT USE: Temporarily exposed to migrate off of Scheduler.runWithPriority.
  useFormStatus as experimental_useFormStatus,
  prefetchDNS,
  preconnect,
  preload,
  preinit,
  version,
} from './src/client/ReactDOM';
