/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */  let ReactTeReactTestUtils = require('react-dom/test-utils');
  });  it('should trigger load events', () => {
const onLoadSpy =iframe = ReactTestUtils.renderIntoDocument(iframe);const loadEvent = document.createEvent('Event');
loadEvent.initEvent('load', false, false);iframe.dispatchEvent(loadEvent);expect(onLoadSpy).toHaveBeenCalled();
  });
});