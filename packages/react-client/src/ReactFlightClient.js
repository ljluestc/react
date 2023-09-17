/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@flow*/importtype{Thenable}from'shared/ReactTypes';importtype{LazyComponent}from'react/src/ReactLazy';importtype{ClientReference,ClientReferenceMetadata,SSRManifest,StringDecoder,}from'./ReactFlightClientConfig';importtype{HintModel}from'react-server/src/ReactFlightServerConfig';importtype{CallServerCallback}from'./ReactFlightReplyClient';import{enableBinaryFlight}from'shared/ReactFeatureFlags';import{resolveClientReference,preloadModule,requireModule,dispatchHint,readPartialStringChunk,readFinalStringChunk,createStringDecoder,usedWithSSR,}from'./ReactFlightClientConfig';import{encodeFormAction,knownServerReferences,}from'./ReactFlightReplyClient';import{REACT_LAZY_TYPE,REACT_ELEMENT_TYPE}from'shared/ReactSymbols';import{getOrCreateServerContext}from'shared/ReactServerContextRegistry';exporttype{CallServerCallback};typeUninitializedModel=string;exporttypeJSONValue=|number|null|boolean|string|{+[key:string]:JSONValue}|$ReadOnlyArray<JSONValue>;constROW_ID=0;constROW_TAG=1;constROW_LENGTH=2;constROW_CHUNK_BY_NEWLINE=3;constROW_CHUNK_BY_LENGTH=4;typeRowParserState=0|1|2|3|4;constPENDING='pending';constBLOCKED='blocked';constRESOLVED_MODEL='resolved_model';constRESOLVED_MODULE='resolved_module';constINITIALIZED='fulfilled';constERRORED='rejected';typePendingChunk<T>={status:'pending',value:null|Array<(T)=>mixed>,reason:null|Array<(mixed)=>mixed>,_response:Response,then(resolve:(T)=>mixed,reject:(mixed)=>mixed):void,};typeBlockedChunk<T>={status:'blocked',value:null|Array<(T)=>mixed>,reason:null|Array<(mixed)=>mixed>,_response:Response,then(resolve:(T)=>mixed,reject:(mixed)=>mixed):void,};typeResolvedModelChunk<T>={status:'resolved_model',value:UninitializedModel,reason:null,_response:Response,then(resolve:(T)=>mixed,reject:(mixed)=>mixed):void,};typeResolvedModuleChunk<T>={status:'resolved_module',value:ClientReference<T>,reason:null,_response:Response,then(resolve:(T)=>mixed,reject:(mixed)=>mixed):void,};typeInitializedChunk<T>={status:'fulfilled',value:T,reason:null,_response:Response,then(resolve:(T)=>mixed,reject:(mixed)=>mixed):void,};typeErroredChunk<T>={status:'rejected',value:null,reason:mixed,_response:Response,then(resolve:(T)=>mixed,reject:(mixed)=>mixed):void,};typeSomeChunk<T>=|PendingChunk<T>|BlockedChunk<T>|ResolvedModelChunk<T>|ResolvedModuleChunk<T>|InitializedChunk<T>|ErroredChunk<T>;//$FlowFixMe[missing-this-annot]functionChunk(status:any,value:any,reason:any,response:Response){this.status=status;this.value=value;this.reason=reason;this._response=response;}//WesubclassPromise.prototypesothatwegetothermethodslike.catchChunk.prototype=(Object.create(Promise.prototype):any);//TODO:Thisdoesn'treturnanewPromisechainunlikethereal.thenChunk.prototype.then=function<T>(this:SomeChunk<T>,resolve:(value:T)=>mixed,reject:(reason:mixed)=>mixed,){constchunk:SomeChunk<T>=this;//Ifwehaveresolvedcontent,wetrytoinitializeitfirstwhich//mightputusbackintooneoftheotherstates.switch(chunk.status){caseRESOLVED_MODEL:initializeModelChunk(chunk);break;caseRESOLVED_MODULE:initializeModuleChunk(chunk);break;}//Thestatusmighthavechangedafterinitialization.switch(chunk.status){caseINITIALIZED:resolve(chunk.value);break;casePENDING:caseBLOCKED:if(resolve){if(chunk.value===null){chunk.value=([]:Array<(T)=>mixed>);}chunk.value.push(resolve);}if(reject){if(chunk.reason===null){chunk.reason=([]:Array<(mixed)=>mixed>);}chunk.reason.push(reject);}break;default:reject(chunk.reason);break;}};exporttypeResponse={_bundlerConfig:SSRManifest,_callServer:CallServerCallback,_chunks:Map<number,SomeChunk<any>>,_fromJSON:(key:string,value:JSONValue)=>any,_stringDecoder:StringDecoder,_rowState:RowParserState,_rowID:number,//partsofarowIDparsedsofar_rowTag:number,//0indicatesthatwe'recurrentlyparsingtherowID_rowLength:number,//remainingbytesintherow.0indicatesthatwe'relookingforanewline._buffer:Array<Uint8Array>,//chunksreceivedsofaraspartofthisrow};functionreadChunk<T>(chunk:SomeChunk<T>):T{//Ifwehaveresolvedcontent,wetrytoinitializeitfirstwhich//mightputusbackintooneoftheotherstates.switch(chunk.status){caseRESOLVED_MODEL:initializeModelChunk(chunk);break;caseRESOLVED_MODULE:initializeModuleChunk(chunk);break;}//Thestatusmighthavechangedafterinitialization.switch(chunk.status){caseINITIALIZED:returnchunk.value;casePENDING:caseBLOCKED://eslint-disable-next-lineno-throw-literalthrow((chunk:any):Thenable<T>);default:throwchunk.reason;}}exportfunctiongetRoot<T>(response:Response):Thenable<T>{constchunk=getChunk(response,0);return(chunk:any);}functioncreatePendingChunk<T>(response:Response):PendingChunk<T>{//$FlowFixMe[invalid-constructor]Flowdoesn'tsupportfunctionsasconstructorsreturnnewChunk(PENDING,null,null,response);}functioncreateBlockedChunk<T>(response:Response):BlockedChunk<T>{//$FlowFixMe[invalid-constructor]Flowdoesn'tsupportfunctionsasconstructorsreturnnewChunk(BLOCKED,null,null,response);}functioncreateErrorChunk<T>(response:Response,error:ErrorWithDigest,):ErroredChunk<T>{//$FlowFixMe[invalid-constructor]Flowdoesn'tsupportfunctionsasconstructorsreturnnewChunk(ERRORED,null,error,response);}functionwakeChunk<T>(listeners:Array<(T)=>mixed>,value:T):void{for(leti=0;i<listeners.length;i++){constlistener=listeners[i];listener(value);}}functionwakeChunkIfInitialized<T>(chunk:SomeChunk<T>,resolveListeners:Array<(T)=>mixed>,rejectListeners:null|Array<(mixed)=>mixed>,):void{switch(chunk.status){caseINITIALIZED:wakeChunk(resolveListeners,chunk.value);break;casePENDING:caseBLOCKED:chunk.value=resolveListeners;chunk.reason=rejectListeners;break;caseERRORED:if(rejectListeners){wakeChunk(rejectListeners,chunk.reason);}break;}}functiontriggerErrorOnChunk<T>(chunk:SomeChunk<T>,error:mixed):void{if(chunk.status!==PENDING&&chunk.status!==BLOCKED){//Wealreadyresolved.Wedidn'texpecttoseethis.return;}constlisteners=chunk.reason;consterroredChunk:ErroredChunk<T>=(chunk:any);erroredChunk.status=ERRORED;erroredChunk.reason=error;if(listeners!==null){wakeChunk(listeners,error);}}functioncreateResolvedModelChunk<T>(response:Response,value:UninitializedModel,):ResolvedModelChunk<T>{//$FlowFixMe[invalid-constructor]Flowdoesn'tsupportfunctionsasconstructorsreturnnewChunk(RESOLVED_MODEL,value,null,response);}functioncreateResolvedModuleChunk<T>(response:Response,value:ClientReference<T>,):ResolvedModuleChunk<T>{//$FlowFixMe[invalid-constructor]Flowdoesn'tsupportfunctionsasconstructorsreturnnewChunk(RESOLVED_MODULE,value,null,response);}functioncreateInitializedTextChunk(response:Response,value:string,):InitializedChunk<string>{//$FlowFixMe[invalid-constructor]Flowdoesn'tsupportfunctionsasconstructorsreturnnewChunk(INITIALIZED,value,null,response);}functioncreateInitializedBufferChunk(response:Response,value:$ArrayBufferView|ArrayBuffer,):InitializedChunk<Uint8Array>{//$FlowFixMe[invalid-constructor]Flowdoesn'tsupportfunctionsasconstructorsreturnnewChunk(INITIALIZED,value,null,response);}functionresolveModelChunk<T>(chunk:SomeChunk<T>,value:UninitializedModel,):void{if(chunk.status!==PENDING){//Wealreadyresolved.Wedidn'texpecttoseethis.return;}constresolveListeners=chunk.value;constrejectListeners=chunk.reason;constresolvedChunk:ResolvedModelChunk<T>=(chunk:any);resolvedChunk.status=RESOLVED_MODEL;resolvedChunk.value=value;if(resolveListeners!==null){//Thisisunfortunatethatwe'rereadingthiseagerlyif//wealreadyhavelistenersattachedsincetheymightno//longerberenderedormightnotbethehighestpri.initializeModelChunk(resolvedChunk);//Thestatusmighthavechangedafterinitialization.wakeChunkIfInitialized(chunk,resolveListeners,rejectListeners);}}functionresolveModuleChunk<T>(chunk:SomeChunk<T>,value:ClientReference<T>,):void{if(chunk.status!==PENDING&&chunk.status!==BLOCKED){//Wealreadyresolved.Wedidn'texpecttoseethis.return;}constresolveListeners=chunk.value;constrejectListeners=chunk.reason;constresolvedChunk:ResolvedModuleChunk<T>=(chunk:any);resolvedChunk.status=RESOLVED_MODULE;resolvedChunk.value=value;if(resolveListeners!==null){initializeModuleChunk(resolvedChunk);wakeChunkIfInitialized(chunk,resolveListeners,rejectListeners);}}letinitializingChunk:ResolvedModelChunk<any>=(null:any);letinitializingChunkBlockedModel:null|{deps:number,value:any}=null;functioninitializeModelChunk<T>(chunk:ResolvedModelChunk<T>):void{constprevChunk=initializingChunk;constprevBlocked=initializingChunkBlockedModel;initializingChunk=chunk;initializingChunkBlockedModel=null;try{constvalue:T=parseModel(chunk._response,chunk.value);if(initializingChunkBlockedModel!==null&&initializingChunkBlockedModel.deps>0){initializingChunkBlockedModel.value=value;//Wediscoverednewdependenciesonmodulesthatarenotyetresolved.//WehavetogotheBLOCKEDstateuntilthey'reresolved.constblockedChunk:BlockedChunk<T>=(chunk:any);blockedChunk.status=BLOCKED;blockedChunk.value=null;blockedChunk.reason=null;}else{constinitializedChunk:InitializedChunk<T>=(chunk:any);initializedChunk.status=INITIALIZED;initializedChunk.value=value;}}catch(error){consterroredChunk:ErroredChunk<T>=(chunk:any);erroredChunk.status=ERRORED;erroredChunk.reason=error;}finally{initializingChunk=prevChunk;initializingChunkBlockedModel=prevBlocked;}}functioninitializeModuleChunk<T>(chunk:ResolvedModuleChunk<T>):void{try{constvalue:T=requireModule(chunk.value);constinitializedChunk:InitializedChunk<T>=(chunk:any);initializedChunk.status=INITIALIZED;initializedChunk.value=value;}catch(error){consterroredChunk:ErroredChunk<T>=(chunk:any);erroredChunk.status=ERRORED;erroredChunk.reason=error;}}//Reportthatanymissingchunksinthemodelisnowgoingtothrowthis//erroruponread.Alsonotifyanypendingpromises.exportfunctionreportGlobalError(response:Response,error:Error):void{response._chunks.forEach(chunk=>{//Ifthischunkwasalreadyresolvedorerrored,itwon't//triggeranerrorbutifitwasn'tthenweneedto//becausewewon'tbegettinganynewdatatoresolveit.if(chunk.status===PENDING){triggerErrorOnChunk(chunk,error);}});}functioncreateElement(type:mixed,key:mixed,props:mixed,):React$Element<any>{constelement:any={//ThistagallowsustouniquelyidentifythisasaReactElement$$typeof:REACT_ELEMENT_TYPE,//Built-inpropertiesthatbelongontheelementtype:type,key:key,ref:null,props:props,//Recordthecomponentresponsibleforcreatingthiselement._owner:null,};if(__DEV__){//Wedon'treallyneedtoaddanyofthesebutkeepingthemforgoodmeasure.//Unfortunately,_storeisenumerableinjestmatcherssoforequalityto//work,Ineedtokeepitormake_storenon-enumerableintheotherfile.element._store=({}:{validated?:boolean,});Object.defineProperty(element._store,'validated',{configurable:false,enumerable:false,writable:true,value:true,//Thiselementhasalreadybeenvalidatedontheserver.});Object.defineProperty(element,'_self',{configurable:false,enumerable:false,writable:false,value:null,});Object.defineProperty(element,'_source',{configurable:false,enumerable:false,writable:false,value:null,});}returnelement;}functioncreateLazyChunkWrapper<T>(chunk:SomeChunk<T>,):LazyComponent<T,SomeChunk<T>>{constlazyType:LazyComponent<T,SomeChunk<T>>={$$typeof:REACT_LAZY_TYPE,_payload:chunk,_init:readChunk,};returnlazyType;}functiongetChunk(response:Response,id:number):SomeChunk<any>{constchunks=response._chunks;letchunk=chunks.get(id);if(!chunk){chunk=createPendingChunk(response);chunks.set(id,chunk);}returnchunk;}functioncreateModelResolver<T>(chunk:SomeChunk<T>,parentObject:Object,key:string,):(value:any)=>void{letblocked;if(initializingChunkBlockedModel){blocked=initializingChunkBlockedModel;blocked.deps++;}else{blocked=initializingChunkBlockedModel={deps:1,value:null,};}returnvalue=>{parentObject[key]=value;blocked.deps--;if(blocked.deps===0){if(chunk.status!==BLOCKED){return;}constresolveListeners=chunk.value;constinitializedChunk:InitializedChunk<T>=(chunk:any);initializedChunk.status=INITIALIZED;initializedChunk.value=blocked.value;if(resolveListeners!==null){wakeChunk(resolveListeners,blocked.value);}}};}functioncreateModelReject<T>(chunk:SomeChunk<T>):(error:mixed)=>void{return(error:mixed)=>triggerErrorOnChunk(chunk,error);}functioncreateServerReferenceProxy<A:Iterable<any>,T>(response:Response,metaData:{id:any,bound:null|Thenable<Array<any>>},):(...A)=>Promise<T>{constcallServer=response._callServer;constproxy=function():Promise<T>{//$FlowFixMe[method-unbinding]constargs=Array.prototype.slice.call(arguments);constp=metaData.bound;if(!p){returncallServer(metaData.id,args);}if(p.status===INITIALIZED){constbound=p.value;returncallServer(metaData.id,bound.concat(args));}//SincethisisafakePromisewhose.thendoesn'tchain,wehavetowrapit.//TODO:Removethewrapperoncethat'sfixed.return((Promise.resolve(p):any):Promise<Array<any>>).then(function(bound,){returncallServer(metaData.id,bound.concat(args));});};//ExposeencoderforusebySSR.if(usedWithSSR){//Onlyexposethisinbuildsthatwouldactuallyuseit.Notneededontheclient.(proxy:any).$$FORM_ACTION=encodeFormAction;}knownServerReferences.set(proxy,metaData);returnproxy;}functiongetOutlinedModel(response:Response,id:number):any{constchunk=getChunk(response,id);switch(chunk.status){caseRESOLVED_MODEL:initializeModelChunk(chunk);break;}//Thestatusmighthavechangedafterinitialization.switch(chunk.status){caseINITIALIZED:{returnchunk.value;}//Wealwaysencodeitfirstinthestreamsoitwon'tbepending.default:throwchunk.reason;}}functionparseModelString(response:Response,parentObject:Object,key:string,value:string,):any{if(value[0]==='$'){if(value==='$'){//Averycommonsymbol.returnREACT_ELEMENT_TYPE;}switch(value[1]){case'$':{//Thiswasanescapedstringvalue.returnvalue.slice(1);}case'L':{//Lazynodeconstid=parseInt(value.slice(2),16);constchunk=getChunk(response,id);//WecreateaReact.lazywrapperaroundanylazyvalues.//WhenpassedintoReact,we'llknowhowtosuspendonthis.returncreateLazyChunkWrapper(chunk);}case'@':{//Promiseconstid=parseInt(value.slice(2),16);constchunk=getChunk(response,id);returnchunk;}case'S':{//SymbolreturnSymbol.for(value.slice(2));}case'P':{//ServerContextProviderreturngetOrCreateServerContext(value.slice(2)).Provider;}case'F':{//ServerReferenceconstid=parseInt(value.slice(2),16);constmetadata=getOutlinedModel(response,id);returncreateServerReferenceProxy(response,metadata);}case'Q':{//Mapconstid=parseInt(value.slice(2),16);constdata=getOutlinedModel(response,id);returnnewMap(data);}case'W':{//Setconstid=parseInt(value.slice(2),16);constdata=getOutlinedModel(response,id);returnnewSet(data);}case'I':{//$InfinityreturnInfinity;}case'-':{//$-0or$-Infinityif(value==='$-0'){return-0;}else{return-Infinity;}}case'N':{//$NaNreturnNaN;}case'u':{//matches"$undefined"//Specialencodingfor`undefined`whichcan'tbeserializedasJSONotherwise.returnundefined;}case'D':{//DatereturnnewDate(Date.parse(value.slice(2)));}case'n':{//BigIntreturnBigInt(value.slice(2));}default:{//WeassumethatanythingelseisareferenceID.constid=parseInt(value.slice(1),16);constchunk=getChunk(response,id);switch(chunk.status){caseRESOLVED_MODEL:initializeModelChunk(chunk);break;caseRESOLVED_MODULE:initializeModuleChunk(chunk);break;}//Thestatusmighthavechangedafterinitialization.switch(chunk.status){caseINITIALIZED:returnchunk.value;casePENDING:caseBLOCKED:constparentChunk=initializingChunk;chunk.then(createModelResolver(parentChunk,parentObject,key),createModelReject(parentChunk),);returnnull;default:throwchunk.reason;}}}}returnvalue;}functionparseModelTuple(response:Response,value:{+[key:string]:JSONValue}|$ReadOnlyArray<JSONValue>,):any{consttuple:[mixed,mixed,mixed,mixed]=(value:any);if(tuple[0]===REACT_ELEMENT_TYPE){//TODO:ConsiderhavingReactjustdirectlyacceptthesearraysaselements.//OrevenchangetheReactElementtypetobeanarray.returncreateElement(tuple[1],tuple[2],tuple[3]);}returnvalue;}functionmissingCall(){thrownewError('Tryingtocallafunctionfrom"useserver"butthecallServeroption'+'wasnotimplementedinyourrouterruntime.',);}exportfunctioncreateResponse(bundlerConfig:SSRManifest,callServer:void|CallServerCallback,):Response{constchunks:Map<number,SomeChunk<any>>=newMap();constresponse:Response={_bundlerConfig:bundlerConfig,_callServer:callServer!==undefined?callServer:missingCall,_chunks:chunks,_stringDecoder:createStringDecoder(),_fromJSON:(null:any),_rowState:0,_rowID:0,_rowTag:0,_rowLength:0,_buffer:[],};//Don'tinlinethiscallbecauseitcausesclosuretooutlinethecallabove.response._fromJSON=createFromJSONCallback(response);returnresponse;}functionresolveModel(response:Response,id:number,model:UninitializedModel,):void{constchunks=response._chunks;constchunk=chunks.get(id);if(!chunk){chunks.set(id,createResolvedModelChunk(response,model));}else{resolveModelChunk(chunk,model);}}functionresolveText(response:Response,id:number,text:string):void{constchunks=response._chunks;//Weassumethatwealwaysreferencelargestringsafterthey'vebeen//emitted.chunks.set(id,createInitializedTextChunk(response,text));}functionresolveBuffer(response:Response,id:number,buffer:$ArrayBufferView|ArrayBuffer,):void{constchunks=response._chunks;//Weassumethatwealwaysreferencebuffersafterthey'vebeenemitted.chunks.set(id,createInitializedBufferChunk(response,buffer));}functionresolveModule(response:Response,id:number,model:UninitializedModel,):void{constchunks=response._chunks;constchunk=chunks.get(id);constclientReferenceMetadata:ClientReferenceMetadata=parseModel(response,model,);constclientReference=resolveClientReference<$FlowFixMe>(response._bundlerConfig,clientReferenceMetadata,);//TODO:Addanoptiontoencodemodulesthatarelazyloaded.//Fornowwepreloadallmodulesasearlyaspossiblesinceit'slikely//thatwe'llneedthem.constpromise=preloadModule(clientReference);if(promise){letblockedChunk:BlockedChunk<any>;if(!chunk){//Technically,weshouldjusttreatpromiseasthechunkinthis//case.Becauseit'lljustbehaveasanyotherpromise.blockedChunk=createBlockedChunk(response);chunks.set(id,blockedChunk);}else{//Thiscan'tactuallyhappenbecausewedon'thaveanyforward//referencestomodules.blockedChunk=(chunk:any);blockedChunk.status=BLOCKED;}promise.then(()=>resolveModuleChunk(blockedChunk,clientReference),error=>triggerErrorOnChunk(blockedChunk,error),);}else{if(!chunk){chunks.set(id,createResolvedModuleChunk(response,clientReference));}else{//Thiscan'tactuallyhappenbecausewedon'thaveanyforward//referencestomodules.resolveModuleChunk(chunk,clientReference);}}}typeErrorWithDigest=Error&{digest?:string};functionresolveErrorProd(response:Response,id:number,digest:string,):void{if(__DEV__){//Theseerrorsshouldnevermakeitintoabuildsowedon'tneedtoencodethemincodes.json//eslint-disable-next-linereact-internal/prod-error-codesthrownewError('resolveErrorProdshouldneverbecalledindevelopmentmode.UseresolveErrorDevinstead.ThisisabuginReact.',);}consterror=newError('AnerroroccurredintheServerComponentsrender.Thespecificmessageisomittedinproduction'+'buildstoavoidleakingsensitivedetails.Adigestpropertyisincludedonthiserrorinstancewhich'+'mayprovideadditionaldetailsaboutthenatureoftheerror.',);error.stack='Error:'+error.message;(error:any).digest=digest;consterrorWithDigest:ErrorWithDigest=(error:any);constchunks=response._chunks;constchunk=chunks.get(id);if(!chunk){chunks.set(id,createErrorChunk(response,errorWithDigest));}else{triggerErrorOnChunk(chunk,errorWithDigest);}}functionresolveErrorDev(response:Response,id:number,digest:string,message:string,stack:string,):void{if(!__DEV__){//Theseerrorsshouldnevermakeitintoabuildsowedon'tneedtoencodethemincodes.json//eslint-disable-next-linereact-internal/prod-error-codesthrownewError('resolveErrorDevshouldneverbecalledinproductionmode.UseresolveErrorProdinstead.ThisisabuginReact.',);}//eslint-disable-next-linereact-internal/prod-error-codesconsterror=newError(message||'AnerroroccurredintheServerComponentsrenderbutnomessagewasprovided',);error.stack=stack;(error:any).digest=digest;consterrorWithDigest:ErrorWithDigest=(error:any);constchunks=response._chunks;constchunk=chunks.get(id);if(!chunk){chunks.set(id,createErrorChunk(response,errorWithDigest));}else{triggerErrorOnChunk(chunk,errorWithDigest);}}functionresolveHint(response:Response,code:string,model:UninitializedModel,):void{consthintModel:HintModel=parseModel(response,model);dispatchHint(code,hintModel);}functionmergeBuffer(buffer:Array<Uint8Array>,lastChunk:Uint8Array,):Uint8Array{constl=buffer.length;//Countthebyteswe'llneedletbyteLength=lastChunk.length;for(leti=0;i<l;i++){byteLength+=buffer[i].byteLength;}//Allocateenoughcontiguousspaceconstresult=newUint8Array(byteLength);letoffset=0;//Copyallthebuffersintoit.for(leti=0;i<l;i++){constchunk=buffer[i];result.set(chunk,offset);offset+=chunk.byteLength;}result.set(lastChunk,offset);returnresult;}functionresolveTypedArray(response:Response,id:number,buffer:Array<Uint8Array>,lastChunk:Uint8Array,constructor:any,bytesPerElement:number,):void{//Iftheviewfitsintooneoriginalbuffer,wejustreusethatbufferinsteadof//copyingitouttoaseparatecopy.Thismeansthatit'snotalwayspossibleto//transferthesevaluestootherthreadswithoutcopyingfirstsincetheymay//sharearraybuffer.Forthistowork,itmustalsohavebytesalignedtoa//multipleofasizeofthetype.constchunk=buffer.length===0&&lastChunk.byteOffset%bytesPerElement===0?lastChunk:mergeBuffer(buffer,lastChunk);//TODO:ThetransferprotocolofRSCislittle-endian.Iftheclientisn'tlittle-endian//weshouldconvertitinstead.Inpracticebigendianisn'treallyWebcompatiblesoit's//somewhatsafetoassumethatbrowsersaren'tgoingtorunit,butmaybethere'ssomeSSR//serverthat'saffected.constview:$ArrayBufferView=newconstructor(chunk.buffer,chunk.byteOffset,chunk.byteLength/bytesPerElement,);resolveBuffer(response,id,view);}functionprocessFullRow(response:Response,id:number,tag:number,buffer:Array<Uint8Array>,chunk:Uint8Array,):void{if(enableBinaryFlight){switch(tag){case65/*"A"*/://Wemustalwaysclonetoextractitintoaseparatebufferinsteadofjustaview.resolveBuffer(response,id,mergeBuffer(buffer,chunk).buffer);return;case67/*"C"*/:resolveTypedArray(response,id,buffer,chunk,Int8Array,1);return;case99/*"c"*/:resolveBuffer(response,id,buffer.length===0?chunk:mergeBuffer(buffer,chunk),);return;case85/*"U"*/:resolveTypedArray(response,id,buffer,chunk,Uint8ClampedArray,1);return;case83/*"S"*/:resolveTypedArray(response,id,buffer,chunk,Int16Array,2);return;case115/*"s"*/:resolveTypedArray(response,id,buffer,chunk,Uint16Array,2);return;case76/*"L"*/:resolveTypedArray(response,id,buffer,chunk,Int32Array,4);return;case108/*"l"*/:resolveTypedArray(response,id,buffer,chunk,Uint32Array,4);return;case70/*"F"*/:resolveTypedArray(response,id,buffer,chunk,Float32Array,4);return;case68/*"D"*/:resolveTypedArray(response,id,buffer,chunk,Float64Array,8);return;case78/*"N"*/:resolveTypedArray(response,id,buffer,chunk,BigInt64Array,8);return;case109/*"m"*/:resolveTypedArray(response,id,buffer,chunk,BigUint64Array,8);return;case86/*"V"*/:resolveTypedArray(response,id,buffer,chunk,DataView,1);return;}}conststringDecoder=response._stringDecoder;letrow='';for(leti=0;i<buffer.length;i++){row+=readPartialStringChunk(stringDecoder,buffer[i]);}row+=readFinalStringChunk(stringDecoder,chunk);switch(tag){case73/*"I"*/:{resolveModule(response,id,row);return;}case72/*"H"*/:{constcode=row[0];resolveHint(response,code,row.slice(1));return;}case69/*"E"*/:{consterrorInfo=JSON.parse(row);if(__DEV__){resolveErrorDev(response,id,errorInfo.digest,errorInfo.message,errorInfo.stack,);}else{resolveErrorProd(response,id,errorInfo.digest);}return;}case84/*"T"*/:{resolveText(response,id,row);return;}default:/*""""{""[""t""f""n""0"-"9"*/{//WeassumeanythingelseisJSON.resolveModel(response,id,row);return;}}}exportfunctionprocessBinaryChunk(response:Response,chunk:Uint8Array,):void{leti=0;letrowState=response._rowState;letrowID=response._rowID;letrowTag=response._rowTag;letrowLength=response._rowLength;constbuffer=response._buffer;constchunkLength=chunk.length;while(i<chunkLength){letlastIdx=-1;switch(rowState){caseROW_ID:{constbyte=chunk[i++];if(byte===58/*":"*/){//FinishedtherowID,nextwe'llparsethetag.rowState=ROW_TAG;}else{rowID=(rowID<<4)|(byte>96?byte-87:byte-48);}continue;}caseROW_TAG:{constresolvedRowTag=chunk[i];if(resolvedRowTag===84/*"T"*/||(enableBinaryFlight&&(resolvedRowTag===65/*"A"*/||resolvedRowTag===67/*"C"*/||resolvedRowTag===99/*"c"*/||resolvedRowTag===85/*"U"*/||resolvedRowTag===83/*"S"*/||resolvedRowTag===115/*"s"*/||resolvedRowTag===76/*"L"*/||resolvedRowTag===108/*"l"*/||resolvedRowTag===70/*"F"*/||resolvedRowTag===68/*"D"*/||resolvedRowTag===78/*"N"*/||resolvedRowTag===109/*"m"*/||resolvedRowTag===86))/*"V"*/){rowTag=resolvedRowTag;rowState=ROW_LENGTH;i++;}elseif(resolvedRowTag>64&&resolvedRowTag<91/*"A"-"Z"*/){rowTag=resolvedRowTag;rowState=ROW_CHUNK_BY_NEWLINE;i++;}else{rowTag=0;rowState=ROW_CHUNK_BY_NEWLINE;//Thiswasanunknowntagsoitwasprobablypartofthedata.}continue;}caseROW_LENGTH:{constbyte=chunk[i++];if(byte===44/*","*/){//FinishedtherowLength,nextwe'llbufferuptothatlength.rowState=ROW_CHUNK_BY_LENGTH;}else{rowLength=(rowLength<<4)|(byte>96?byte-87:byte-48);}continue;}caseROW_CHUNK_BY_NEWLINE:{//We'relookingforanewlinelastIdx=chunk.indexOf(10/*"\n"*/,i);break;}caseROW_CHUNK_BY_LENGTH:{//We'relookingfortheremainingbytelengthlastIdx=i+rowLength;if(lastIdx>chunk.length){lastIdx=-1;}break;}}constoffset=chunk.byteOffset+i;if(lastIdx>-1){//Wefoundthelastchunkoftherowconstlength=lastIdx-i;constlastChunk=newUint8Array(chunk.buffer,offset,length);processFullRow(response,rowID,rowTag,buffer,lastChunk);//Resetstatemachineforanewrowi=lastIdx;if(rowState===ROW_CHUNK_BY_NEWLINE){//Ifwe'retrailingbyanewlineweneedtoskipit.i++;}rowState=ROW_ID;rowTag=0;rowID=0;rowLength=0;buffer.length=0;}else{//Therestofthisrowisinafuturechunk.Westashtherestofthe//currentchunkuntilwecanprocessthefullrow.constlength=chunk.byteLength-i;constremainingSlice=newUint8Array(chunk.buffer,offset,length);buffer.push(remainingSlice);//Updatehowmanybyteswe'restillwaitingfor.Ifwe'relookingfor//anewline,thisdoesn'thurtsincewe'lljustignoreit.rowLength-=remainingSlice.byteLength;break;}}response._rowState=rowState;response._rowID=rowID;response._rowTag=rowTag;response._rowLength=rowLength;}functionparseModel<T>(response:Response,json:UninitializedModel):T{returnJSON.parse(json,response._fromJSON);}functioncreateFromJSONCallback(response:Response){//$FlowFixMe[missing-this-annot]returnfunction(key:string,value:JSONValue){if(typeofvalue==='string'){//Wecan'tuse.bindherebecauseweneedthe"this"value.returnparseModelString(response,this,key,value);}if(typeofvalue==='object'&&value!==null){returnparseModelTuple(response,value);}returnvalue;};}exportfunctionclose(response:Response):void{//Incasethereareanyremainingunresolvedchunks,theywon't//beresolvednow.Soweneedtoissueanerrortothose.//Ideallyweshouldbeabletoearlybailoutifwekepta//refcountofpendingchunks.reportGlobalError(response,newError('Connectionclosed.'));}