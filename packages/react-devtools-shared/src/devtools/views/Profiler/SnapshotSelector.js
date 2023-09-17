/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@flow*/import*asReactfrom'react';import{Fragment,useContext,useMemo}from'react';importButtonfrom'../Button';importButtonIconfrom'../ButtonIcon';import{ProfilerContext}from'./ProfilerContext';importSnapshotCommitListfrom'./SnapshotCommitList';import{maxBarWidth}from'./constants';import{StoreContext}from'../context';importstylesfrom'./SnapshotSelector.css';exporttypeProps={};exportdefaultfunctionSnapshotSelector(_:Props):React.Node{const{isCommitFilterEnabled,minCommitDuration,rootID,selectedCommitIndex,selectCommitIndex,}=useContext(ProfilerContext);const{profilerStore}=useContext(StoreContext);const{commitData}=profilerStore.getDataForRoot(((rootID:any):number));consttotalDurations:Array<number>=[];constcommitTimes:Array<number>=[];commitData.forEach(commitDatum=>{totalDurations.push(commitDatum.duration+(commitDatum.effectDuration||0)+(commitDatum.passiveEffectDuration||0),);commitTimes.push(commitDatum.timestamp);});constfilteredCommitIndices=useMemo(()=>commitData.reduce((reduced:$FlowFixMe,commitDatum,index)=>{if(!isCommitFilterEnabled||commitDatum.duration>=minCommitDuration){reduced.push(index);}returnreduced;},[]),[commitData,isCommitFilterEnabled,minCommitDuration],);constnumFilteredCommits=filteredCommitIndices.length;//Mapthe(unfiltered)selectedcommitindextoanindexwithinthefiltereddata.constselectedFilteredCommitIndex=useMemo(()=>{if(selectedCommitIndex!==null){for(leti=0;i<filteredCommitIndices.length;i++){if(filteredCommitIndices[i]===selectedCommitIndex){returni;}}}returnnull;},[filteredCommitIndices,selectedCommitIndex]);//TODO(ProfilerContext)Thisshouldbemanagedbythecontextcontroller(reducer).//Itdoesn'tcurrentlyknowaboutthefilteredcommitsthough(sinceitdoesn'tsuspend).//MaybethiscomponentshouldpassfilteredCommitIndicesup?if(selectedFilteredCommitIndex===null){if(numFilteredCommits>0){selectCommitIndex(0);}else{selectCommitIndex(null);}}elseif(selectedFilteredCommitIndex>=numFilteredCommits){selectCommitIndex(numFilteredCommits===0?null:numFilteredCommits-1);}letlabel=null;if(numFilteredCommits>0){//$FlowFixMe[missing-local-annot]consthandleCommitInputChange=event=>{constvalue=parseInt(event.currentTarget.value,10);if(!isNaN(value)){constfilteredIndex=Math.min(Math.max(value-1,0),//Snashotsareshowntotheuseras1-based//buttheindiceswithintheprofilerdataarrayar0-based.numFilteredCommits-1,);selectCommitIndex(filteredCommitIndices[filteredIndex]);}};//$FlowFixMe[missing-local-annot]consthandleClick=event=>{event.currentTarget.select();};//$FlowFixMe[missing-local-annot]consthandleKeyDown=event=>{switch(event.key){case'ArrowDown':viewPrevCommit();event.stopPropagation();break;case'ArrowUp':viewNextCommit();event.stopPropagation();break;default:break;}};constinput=(<inputclassName={styles.Input}data-testname="SnapshotSelector-Input"type="text"inputMode="numeric"pattern="[0-9]*"value={//$FlowFixMe[unsafe-addition]additionwithpossiblenull/undefinedvalueselectedFilteredCommitIndex+1}size={`${numFilteredCommits}`.length}onChange={handleCommitInputChange}onClick={handleClick}onKeyDown={handleKeyDown}/>);label=(<Fragment>{input}/{numFilteredCommits}</Fragment>);}constviewNextCommit=()=>{letnextCommitIndex=((selectedFilteredCommitIndex:any):number)+1;if(nextCommitIndex===filteredCommitIndices.length){nextCommitIndex=0;}selectCommitIndex(filteredCommitIndices[nextCommitIndex]);};constviewPrevCommit=()=>{letnextCommitIndex=((selectedFilteredCommitIndex:any):number)-1;if(nextCommitIndex<0){nextCommitIndex=filteredCommitIndices.length-1;}selectCommitIndex(filteredCommitIndices[nextCommitIndex]);};//$FlowFixMe[missing-local-annot]consthandleKeyDown=event=>{switch(event.key){case'ArrowLeft':viewPrevCommit();event.stopPropagation();break;case'ArrowRight':viewNextCommit();event.stopPropagation();break;default:break;}};if(commitData.length===0){returnnull;}return(<Fragment><spanclassName={styles.IndexLabel}data-testname="SnapshotSelector-Label">{label}</span><ButtonclassName={styles.Button}data-testname="SnapshotSelector-PreviousButton"disabled={numFilteredCommits===0}onClick={viewPrevCommit}title="Selectpreviouscommit"><ButtonIcontype="previous"/></Button><divclassName={styles.Commits}onKeyDown={handleKeyDown}style={{flex:numFilteredCommits>0?'11auto':'00auto',maxWidth:numFilteredCommits>0?numFilteredCommits*maxBarWidth:undefined,}}tabIndex={0}>{numFilteredCommits>0&&(<SnapshotCommitListcommitData={commitData}commitTimes={commitTimes}filteredCommitIndices={filteredCommitIndices}selectedCommitIndex={selectedCommitIndex}selectedFilteredCommitIndex={selectedFilteredCommitIndex}selectCommitIndex={selectCommitIndex}totalDurations={totalDurations}/>)}{numFilteredCommits===0&&(<divclassName={styles.NoCommits}>Nocommits</div>)}</div><ButtonclassName={styles.Button}data-testname="SnapshotSelector-NextButton"disabled={numFilteredCommits===0}onClick={viewNextCommit}title="Selectnextcommit"><ButtonIcontype="next"/></Button></Fragment>);}