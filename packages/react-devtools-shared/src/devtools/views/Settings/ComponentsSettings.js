/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@flow*/import*asReactfrom'react';import{useCallback,useContext,useEffect,useMemo,useRef,useState,}from'react';import{LOCAL_STORAGE_OPEN_IN_EDITOR_URL,LOCAL_STORAGE_OPEN_IN_EDITOR_URL_PRESET,}from'../../../constants';import{useLocalStorage,useSubscription}from'../hooks';import{StoreContext}from'../context';importButtonfrom'../Button';importButtonIconfrom'../ButtonIcon';importTogglefrom'../Toggle';import{SettingsContext}from'../Settings/SettingsContext';import{ComponentFilterDisplayName,ComponentFilterElementType,ComponentFilterHOC,ComponentFilterLocation,ElementTypeClass,ElementTypeContext,ElementTypeFunction,ElementTypeForwardRef,ElementTypeHostComponent,ElementTypeMemo,ElementTypeOtherOrUnknown,ElementTypeProfiler,ElementTypeSuspense,}from'react-devtools-shared/src/types';import{getDefaultOpenInEditorURL}from'react-devtools-shared/src/utils';importstylesfrom'./SettingsShared.css';importtype{BooleanComponentFilter,ComponentFilter,ComponentFilterType,ElementType,ElementTypeComponentFilter,RegExpComponentFilter,}from'react-devtools-shared/src/types';constvscodeFilepath='vscode://file/{path}:{line}';exportdefaultfunctionComponentsSettings(_:{}):React.Node{conststore=useContext(StoreContext);const{parseHookNames,setParseHookNames}=useContext(SettingsContext);constcollapseNodesByDefaultSubscription=useMemo(()=>({getCurrentValue:()=>store.collapseNodesByDefault,subscribe:(callback:Function)=>{store.addListener('collapseNodesByDefault',callback);return()=>store.removeListener('collapseNodesByDefault',callback);},}),[store],);constcollapseNodesByDefault=useSubscription<boolean>(collapseNodesByDefaultSubscription,);constupdateCollapseNodesByDefault=useCallback(({currentTarget}:$FlowFixMe)=>{store.collapseNodesByDefault=!currentTarget.checked;},[store],);constupdateParseHookNames=useCallback(({currentTarget}:$FlowFixMe)=>{setParseHookNames(currentTarget.checked);},[setParseHookNames],);const[openInEditorURLPreset,setOpenInEditorURLPreset]=useLocalStorage<'vscode'|'custom',>(LOCAL_STORAGE_OPEN_IN_EDITOR_URL_PRESET,'custom');const[openInEditorURL,setOpenInEditorURL]=useLocalStorage<string>(LOCAL_STORAGE_OPEN_IN_EDITOR_URL,getDefaultOpenInEditorURL(),);const[componentFilters,setComponentFilters]=useState<Array<ComponentFilter>,>(()=>[...store.componentFilters]);constaddFilter=useCallback(()=>{setComponentFilters(prevComponentFilters=>{return[...prevComponentFilters,{type:ComponentFilterElementType,value:ElementTypeHostComponent,isEnabled:true,},];});},[]);constchangeFilterType=useCallback((componentFilter:ComponentFilter,type:ComponentFilterType)=>{setComponentFilters(prevComponentFilters=>{constcloned:Array<ComponentFilter>=[...prevComponentFilters];constindex=prevComponentFilters.indexOf(componentFilter);if(index>=0){if(type===ComponentFilterElementType){cloned[index]={type:ComponentFilterElementType,isEnabled:componentFilter.isEnabled,value:ElementTypeHostComponent,};}elseif(type===ComponentFilterDisplayName){cloned[index]={type:ComponentFilterDisplayName,isEnabled:componentFilter.isEnabled,isValid:true,value:'',};}elseif(type===ComponentFilterLocation){cloned[index]={type:ComponentFilterLocation,isEnabled:componentFilter.isEnabled,isValid:true,value:'',};}elseif(type===ComponentFilterHOC){cloned[index]={type:ComponentFilterHOC,isEnabled:componentFilter.isEnabled,isValid:true,};}}returncloned;});},[],);constupdateFilterValueElementType=useCallback((componentFilter:ComponentFilter,value:ElementType)=>{if(componentFilter.type!==ComponentFilterElementType){throwError('Invalidvalueforelementtypefilter');}setComponentFilters(prevComponentFilters=>{constcloned:Array<ComponentFilter>=[...prevComponentFilters];if(componentFilter.type===ComponentFilterElementType){constindex=prevComponentFilters.indexOf(componentFilter);if(index>=0){cloned[index]={...componentFilter,value,};}}returncloned;});},[],);constupdateFilterValueRegExp=useCallback((componentFilter:ComponentFilter,value:string)=>{if(componentFilter.type===ComponentFilterElementType){throwError('Invalidvalueforelementtypefilter');}setComponentFilters(prevComponentFilters=>{constcloned:Array<ComponentFilter>=[...prevComponentFilters];if(componentFilter.type===ComponentFilterDisplayName||componentFilter.type===ComponentFilterLocation){constindex=prevComponentFilters.indexOf(componentFilter);if(index>=0){letisValid=true;try{newRegExp(value);//eslint-disable-lineno-new}catch(error){isValid=false;}cloned[index]={...componentFilter,isValid,value,};}}returncloned;});},[],);constremoveFilter=useCallback((index:number)=>{setComponentFilters(prevComponentFilters=>{constcloned:Array<ComponentFilter>=[...prevComponentFilters];cloned.splice(index,1);returncloned;});},[]);consttoggleFilterIsEnabled=useCallback((componentFilter:ComponentFilter,isEnabled:boolean)=>{setComponentFilters(prevComponentFilters=>{constcloned:Array<ComponentFilter>=[...prevComponentFilters];constindex=prevComponentFilters.indexOf(componentFilter);if(index>=0){if(componentFilter.type===ComponentFilterElementType){cloned[index]={...((cloned[index]:any):ElementTypeComponentFilter),isEnabled,};}elseif(componentFilter.type===ComponentFilterDisplayName||componentFilter.type===ComponentFilterLocation){cloned[index]={...((cloned[index]:any):RegExpComponentFilter),isEnabled,};}elseif(componentFilter.type===ComponentFilterHOC){cloned[index]={...((cloned[index]:any):BooleanComponentFilter),isEnabled,};}}returncloned;});},[],);//Filterupdatesareexpensivetoapply(sincetheyimpacttheentiretree).//Onlyapplythemonunmount.//TheStorewillavoiddoinganyexpensiveworkunlessthey'vechanged.//Wejustwanttobatchtheworkintheeventthattheydochange.constcomponentFiltersRef=useRef<Array<ComponentFilter>>(componentFilters);useEffect(()=>{componentFiltersRef.current=componentFilters;return()=>{};},[componentFilters]);useEffect(()=>()=>{store.componentFilters=[...componentFiltersRef.current];},[store],);return(<divclassName={styles.Settings}><labelclassName={styles.Setting}><inputtype="checkbox"checked={!collapseNodesByDefault}onChange={updateCollapseNodesByDefault}/>{''}Expandcomponenttreebydefault</label><labelclassName={styles.Setting}><inputtype="checkbox"checked={parseHookNames}onChange={updateParseHookNames}/>{''}Alwaysparsehooknamesfromsource{''}<spanclassName={styles.Warning}>(maybeslow)</span></label><labelclassName={styles.OpenInURLSetting}>OpeninEditorURL:{''}<selectclassName={styles.Select}value={openInEditorURLPreset}onChange={({currentTarget})=>{constselectedValue=currentTarget.value;setOpenInEditorURLPreset(selectedValue);if(selectedValue==='vscode'){setOpenInEditorURL(vscodeFilepath);}elseif(selectedValue==='custom'){setOpenInEditorURL('');}}}><optionvalue="vscode">VSCode</option><optionvalue="custom">Custom</option></select>{openInEditorURLPreset==='custom'&&(<inputclassName={styles.Input}type="text"placeholder={process.env.EDITOR_URL?process.env.EDITOR_URL:''}value={openInEditorURL}onChange={event=>{setOpenInEditorURL(event.target.value);}}/>)}</label><divclassName={styles.Header}>Hidecomponentswhere...</div><tableclassName={styles.Table}><tbody>{componentFilters.length===0&&(<trclassName={styles.TableRow}><tdclassName={styles.NoFiltersCell}>Nofiltershavebeenadded.</td></tr>)}{componentFilters.map((componentFilter,index)=>(<trclassName={styles.TableRow}key={index}><tdclassName={styles.TableCell}><ToggleclassName={componentFilter.isValid!==false?'':styles.InvalidRegExp}isChecked={componentFilter.isEnabled}onChange={isEnabled=>toggleFilterIsEnabled(componentFilter,isEnabled)}title={componentFilter.isValid===false?'Filterinvalid':componentFilter.isEnabled?'Filterenabled':'Filterdisabled'}><ToggleIconisEnabled={componentFilter.isEnabled}isValid={componentFilter.isValid==null||componentFilter.isValid===true}/></Toggle></td><tdclassName={styles.TableCell}><selectclassName={styles.Select}value={componentFilter.type}onChange={({currentTarget})=>changeFilterType(componentFilter,((parseInt(currentTarget.value,10,):any):ComponentFilterType),)}><optionvalue={ComponentFilterLocation}>location</option><optionvalue={ComponentFilterDisplayName}>name</option><optionvalue={ComponentFilterElementType}>type</option><optionvalue={ComponentFilterHOC}>hoc</option></select></td><tdclassName={styles.TableCell}>{componentFilter.type===ComponentFilterElementType&&'equals'}{(componentFilter.type===ComponentFilterLocation||componentFilter.type===ComponentFilterDisplayName)&&'matches'}</td><tdclassName={styles.TableCell}>{componentFilter.type===ComponentFilterElementType&&(<selectclassName={styles.Select}value={componentFilter.value}onChange={({currentTarget})=>updateFilterValueElementType(componentFilter,((parseInt(currentTarget.value,10):any):ElementType),)}><optionvalue={ElementTypeClass}>class</option><optionvalue={ElementTypeContext}>context</option><optionvalue={ElementTypeFunction}>function</option><optionvalue={ElementTypeForwardRef}>forwardref</option><optionvalue={ElementTypeHostComponent}>domnodes(e.g.&lt;div&gt;)</option><optionvalue={ElementTypeMemo}>memo</option><optionvalue={ElementTypeOtherOrUnknown}>other</option><optionvalue={ElementTypeProfiler}>profiler</option><optionvalue={ElementTypeSuspense}>suspense</option></select>)}{(componentFilter.type===ComponentFilterLocation||componentFilter.type===ComponentFilterDisplayName)&&(<inputclassName={styles.Input}type="text"placeholder="Regularexpression"onChange={({currentTarget})=>updateFilterValueRegExp(componentFilter,currentTarget.value,)}value={componentFilter.value}/>)}</td><tdclassName={styles.TableCell}><ButtononClick={()=>removeFilter(index)}title="Deletefilter"><ButtonIcontype="delete"/></Button></td></tr>))}</tbody></table><ButtononClick={addFilter}><ButtonIconclassName={styles.ButtonIcon}type="add"/>Addfilter</Button></div>);}typeToggleIconProps={isEnabled:boolean,isValid:boolean,};functionToggleIcon({isEnabled,isValid}:ToggleIconProps){letclassName;if(isValid){className=isEnabled?styles.ToggleOn:styles.ToggleOff;}else{className=isEnabled?styles.ToggleOnInvalid:styles.ToggleOffInvalid;}return(<divclassName={className}><divclassName={isEnabled?styles.ToggleInsideOn:styles.ToggleInsideOff}/></div>);}