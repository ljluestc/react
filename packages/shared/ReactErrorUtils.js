/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@flow*/importinvokeGuardedCallbackImplfrom'./invokeGuardedCallbackImpl';//UsedbyFibertosimulateatry-catch.lethasError:boolean=false;letcaughtError:mixed=null;//Usedbyeventsystemtocapture/rethrowthefirsterror.lethasRethrowError:boolean=false;letrethrowError:mixed=null;constreporter={onError(error:mixed){hasError=true;caughtError=error;},};/***Callafunctionwhileguardingagainsterrorsthathappenswithinit.*Returnsanerrorifitthrows,otherwisenull.**Inproduction,thisisimplementedusingatry-catch.Thereasonwedon't*useatry-catchdirectlyissothatwecanswapoutadifferent*implementationinDEVmode.**@param{String}nameoftheguardtouseforloggingordebugging*@param{Function}funcThefunctiontoinvoke*@param{*}contextThecontexttousewhencallingthefunction*@param{...*}argsArgumentsforfunction*/exportfunctioninvokeGuardedCallback<A,B,C,D,E,F,Context>(name:string|null,func:(a:A,b:B,c:C,d:D,e:E,f:F)=>mixed,context:Context,a:A,b:B,c:C,d:D,e:E,f:F,):void{hasError=false;caughtError=null;invokeGuardedCallbackImpl.apply(reporter,arguments);}/***SameasinvokeGuardedCallback,butinsteadofreturninganerror,itstores*itinaglobalsoitcanberethrownby`rethrowCaughtError`later.*TODO:SeeifcaughtErrorandrethrowErrorcanbeunified.**@param{String}nameoftheguardtouseforloggingordebugging*@param{Function}funcThefunctiontoinvoke*@param{*}contextThecontexttousewhencallingthefunction*@param{...*}argsArgumentsforfunction*/exportfunctioninvokeGuardedCallbackAndCatchFirstError<A,B,C,D,E,F,Context,>(this:mixed,name:string|null,func:(a:A,b:B,c:C,d:D,e:E,f:F)=>void,context:Context,a:A,b:B,c:C,d:D,e:E,f:F,):void{invokeGuardedCallback.apply(this,arguments);if(hasError){consterror=clearCaughtError();if(!hasRethrowError){hasRethrowError=true;rethrowError=error;}}}/***Duringexecutionofguardedfunctionswewillcapturethefirsterrorwhich*wewillrethrowtobehandledbythetoplevelerrorhandler.*/exportfunctionrethrowCaughtError(){if(hasRethrowError){consterror=rethrowError;hasRethrowError=false;rethrowError=null;throwerror;}}exportfunctionhasCaughtError():boolean{returnhasError;}exportfunctionclearCaughtError():mixed{if(hasError){consterror=caughtError;hasError=false;caughtError=null;returnerror;}else{thrownewError('clearCaughtErrorwascalledbutnoerrorwascaptured.Thiserror'+'islikelycausedbyabuginReact.Pleasefileanissue.',);}}