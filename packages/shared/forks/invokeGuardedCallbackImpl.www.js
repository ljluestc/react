/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@noflow*///ProvidedbywwwconstReactFbErrorUtils=require('ReactFbErrorUtils');if(typeofReactFbErrorUtils.invokeGuardedCallback!=='function'){thrownewError('ExpectedReactFbErrorUtils.invokeGuardedCallbacktobeafunction.',);}functioninvokeGuardedCallbackImpl<A,B,C,D,E,F,Context>(name:string|null,func:(a:A,b:B,c:C,d:D,e:E,f:F)=>mixed,context:Context,a:A,b:B,c:C,d:D,e:E,f:F,){//Thiswillcall`this.onError(err)`ifanerrorwascaught.ReactFbErrorUtils.invokeGuardedCallback.apply(this,arguments);}exportdefaultinvokeGuardedCallbackImpl;