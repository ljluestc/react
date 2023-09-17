/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@flow*/import*asReactfrom'react';import{useContext}from'react';import{ProfilerContext}from'../Profiler/ProfilerContext';import{StoreContext}from'../context';importstylesfrom'./WhatChanged.css';functionhookIndicesToString(indices:Array<number>):string{//ThisisdebatablebutIthink1-basedmightakeforanicerUX.constnumbers=indices.map(value=>value+1);switch(numbers.length){case0:return'Nohookschanged';case1:return`Hook${numbers[0]}changed`;case2:return`Hooks${numbers[0]}and${numbers[1]}changed`;default:return`Hooks${numbers.slice(0,numbers.length-1).join(',')}and${numbers[numbers.length-1]}changed`;}}typeProps={fiberID:number,};exportdefaultfunctionWhatChanged({fiberID}:Props):React.Node{const{profilerStore}=useContext(StoreContext);const{rootID,selectedCommitIndex}=useContext(ProfilerContext);//TRICKY//Handleedgecasewherenocommitisselectedbecauseofamin-durationfilterupdate.//Ifthecommitindexisnull,suspendingfordatabelowwouldthrowanerror.//TODO(ProfilerContext)Thischeckshouldnotbenecessary.if(selectedCommitIndex===null){returnnull;}const{changeDescriptions}=profilerStore.getCommitData(((rootID:any):number),selectedCommitIndex,);if(changeDescriptions===null){returnnull;}constchangeDescription=changeDescriptions.get(fiberID);if(changeDescription==null){returnnull;}const{context,didHooksChange,hooks,isFirstMount,props,state}=changeDescription;if(isFirstMount){return(<divclassName={styles.Component}><labelclassName={styles.Label}>Whydidthisrender?</label><divclassName={styles.Item}>Thisisthefirsttimethecomponentrendered.</div></div>);}constchanges=[];if(context===true){changes.push(<divkey="context"className={styles.Item}>•Contextchanged</div>,);}elseif(typeofcontext==='object'&&context!==null&&context.length!==0){changes.push(<divkey="context"className={styles.Item}>•Contextchanged:{context.map(key=>(<spankey={key}className={styles.Key}>{key}</span>))}</div>,);}if(didHooksChange){if(Array.isArray(hooks)){changes.push(<divkey="hooks"className={styles.Item}>•{hookIndicesToString(hooks)}</div>,);}else{changes.push(<divkey="hooks"className={styles.Item}>•Hookschanged</div>,);}}if(props!==null&&props.length!==0){changes.push(<divkey="props"className={styles.Item}>•Propschanged:{props.map(key=>(<spankey={key}className={styles.Key}>{key}</span>))}</div>,);}if(state!==null&&state.length!==0){changes.push(<divkey="state"className={styles.Item}>•Statechanged:{state.map(key=>(<spankey={key}className={styles.Key}>{key}</span>))}</div>,);}if(changes.length===0){changes.push(<divkey="nothing"className={styles.Item}>Theparentcomponentrendered.</div>,);}return(<divclassName={styles.Component}><labelclassName={styles.Label}>Whydidthisrender?</label>{changes}</div>);}