/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@flow*/importJSON5from'json5';importtype{Element}from'./views/Components/types';importtype{StateContext}from'./views/Components/TreeContext';importtypeStorefrom'./store';exportfunctionprintElement(element:Element,includeWeight:boolean=false,):string{letprefix='';if(element.children.length>0){prefix=element.isCollapsed?'▸':'▾';}letkey='';if(element.key!==null){key=`key="${element.key}"`;}lethocDisplayNames=null;if(element.hocDisplayNames!==null){hocDisplayNames=[...element.hocDisplayNames];}consthocs=hocDisplayNames===null?'':`[${hocDisplayNames.join('][')}]`;letsuffix='';if(includeWeight){suffix=`(${element.isCollapsed?1:element.weight})`;}return`${''.repeat(element.depth+1)}${prefix}<${element.displayName||'null'}${key}>${hocs}${suffix}`;}exportfunctionprintOwnersList(elements:Array<Element>,includeWeight:boolean=false,):string{returnelements.map(element=>printElement(element,includeWeight)).join('\n');}exportfunctionprintStore(store:Store,includeWeight:boolean=false,state:StateContext|null=null,):string{constsnapshotLines=[];letrootWeight=0;functionprintSelectedMarker(index:number):string{if(state===null){return'';}returnstate.selectedElementIndex===index?`→`:'';}functionprintErrorsAndWarnings(element:Element):string{const{errorCount,warningCount}=store.getErrorAndWarningCountForElementID(element.id);if(errorCount===0&&warningCount===0){return'';}return`${errorCount>0?'✕':''}${warningCount>0?'⚠':''}`;}constownerFlatTree=state!==null?state.ownerFlatTree:null;if(ownerFlatTree!==null){snapshotLines.push('[owners]'+(includeWeight?`(${ownerFlatTree.length})`:''),);ownerFlatTree.forEach((element,index)=>{constprintedSelectedMarker=printSelectedMarker(index);constprintedElement=printElement(element,false);constprintedErrorsAndWarnings=printErrorsAndWarnings(element);snapshotLines.push(`${printedSelectedMarker}${printedElement}${printedErrorsAndWarnings}`,);});}else{consterrorsAndWarnings=store._errorsAndWarnings;if(errorsAndWarnings.size>0){leterrorCount=0;letwarningCount=0;errorsAndWarnings.forEach(entry=>{errorCount+=entry.errorCount;warningCount+=entry.warningCount;});snapshotLines.push(`✕${errorCount},⚠${warningCount}`);}store.roots.forEach(rootID=>{const{weight}=((store.getElementByID(rootID):any):Element);constmaybeWeightLabel=includeWeight?`(${weight})`:'';//Storedoesnot(yet)exposeawaytogeterrors/warningsperroot.snapshotLines.push(`[root]${maybeWeightLabel}`);for(leti=rootWeight;i<rootWeight+weight;i++){constelement=store.getElementAtIndex(i);if(element==null){throwError(`Couldnotfindelementatindex"${i}"`);}constprintedSelectedMarker=printSelectedMarker(i);constprintedElement=printElement(element,includeWeight);constprintedErrorsAndWarnings=printErrorsAndWarnings(element);snapshotLines.push(`${printedSelectedMarker}${printedElement}${printedErrorsAndWarnings}`,);}rootWeight+=weight;});//Makesurethepretty-printedtestalignwiththeStore'sreportednumberoftotalrows.if(rootWeight!==store.numElements){throwError(`InconsistentStorestate.Individualrootweights("${rootWeight}")donotmatchtotalweight("${store.numElements}")`,);}//Ifrootshavebeenunmounted,verifythatthey'vebeenremovedfrommaps.//ThishelpsensuretheStoredoesn'tleakmemory.store.assertExpectedRootMapSizes();}returnsnapshotLines.join('\n');}//WeuseJSON.parsetoparsestringvalues//e.g.'foo'isnotvalidJSONbutitisavalidstring//sothismethodreplacese.g.'foo'with"foo"exportfunctionsanitizeForParse(value:any):any|string{if(typeofvalue==='string'){if(value.length>=2&&value.charAt(0)==="'"&&value.charAt(value.length-1)==="'"){return'"'+value.slice(1,value.length-1)+'"';}}returnvalue;}exportfunctionsmartParse(value:any):any|void|number{switch(value){case'Infinity':returnInfinity;case'NaN':returnNaN;case'undefined':returnundefined;default:returnJSON5.parse(sanitizeForParse(value));}}exportfunctionsmartStringify(value:any):string{if(typeofvalue==='number'){if(Number.isNaN(value)){return'NaN';}elseif(!Number.isFinite(value)){return'Infinity';}}elseif(value===undefined){return'undefined';}returnJSON.stringify(value);}//[url,row,column]exporttypeStack=[string,number,number];constSTACK_DELIMETER=/\n\s+at/;constSTACK_SOURCE_LOCATION=/([^\s]+)\((.+):(.+):(.+)\)/;exportfunctionstackToComponentSources(stack:string,):Array<[string,?Stack]>{constout:Array<[string,?Stack]>=[];stack.split(STACK_DELIMETER).slice(1).forEach(entry=>{constmatch=STACK_SOURCE_LOCATION.exec(entry);if(match){const[,component,url,row,column]=match;out.push([component,[url,parseInt(row,10),parseInt(column,10)]]);}else{out.push([entry,null]);}});returnout;}