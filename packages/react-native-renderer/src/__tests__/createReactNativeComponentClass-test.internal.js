/** * Copyright (c) Meta Platforms, Inc. and affiliates. * * This source code is licensed under the MIT license found in the * LICENSE file in the root directory of this source tree. * * @emails react-core * @jest-environment node */let ReactNatijest.resetModules();createReactNativeComponentClass =  require('react-native/Libraries/ReactPrivate/ReactNativePrivateInterface').ReactNativeViewReactNative = require('react-native-renderer');  });  it('should register viewConfigs', () => {const textViewConfig  uiViewClassName: 'Text',};const viewViewConfig = {  validAttributes: {},  uiViewClassName: 'View',};con  () => textViewConfig,);const View = createReactNativeComponentClass(  viewViewConfig.uiViewClassName,  () => viewViewConfig,);expect(Text).not.toBe(View);ReactNative.render(<Text />, 1);ReactNative.render(<View />, 1);  });  it('should not allow viewConfigs with duplicate uiViewClassNames to be registered', () => {co  uiViewClassName: 'Text',};const altTextViewConfig = {  validAttributes: {},  uiViewClassName: 'Text', // Same};createReactNativeComponentClass(  textViewConfig.uiViewClassName,createReactNativeComponent() => altTextViewConfig,  );}).to});