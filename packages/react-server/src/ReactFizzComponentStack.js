/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@flow*/import{describeBuiltInComponentFrame,describeFunctionComponentFrame,describeClassComponentFrame,}from'shared/ReactComponentStackFrame';//DEV-onlyreverselinkedlistrepresentingthecurrentcomponentstacktypeBuiltInComponentStackNode={tag:0,parent:null|ComponentStackNode,type:string,};typeFunctionComponentStackNode={tag:1,parent:null|ComponentStackNode,type:Function,};typeClassComponentStackNode={tag:2,parent:null|ComponentStackNode,type:Function,};exporttypeComponentStackNode=|BuiltInComponentStackNode|FunctionComponentStackNode|ClassComponentStackNode;exportfunctiongetStackByComponentStackNode(componentStack:ComponentStackNode,):string{try{letinfo='';letnode:ComponentStackNode=componentStack;do{switch(node.tag){case0:info+=describeBuiltInComponentFrame(node.type,null,null);break;case1:info+=describeFunctionComponentFrame(node.type,null,null);break;case2:info+=describeClassComponentFrame(node.type,null,null);break;}//$FlowFixMe[incompatible-type]webailoutwhenwegetanullnode=node.parent;}while(node);returninfo;}catch(x){return'\nErrorgeneratingstack:'+x.message+'\n'+x.stack;}}