'usestrict';//Thisisaservertohostdata-localresourceslikedatabasesandRSCconstpath=require('path');consturl=require('url');if(typeoffetch==='undefined'){//PatchfetchforearlierNodeversions.global.fetch=require('undici').fetch;}constexpress=require('express');constbodyParser=require('body-parser');constbusboy=require('busboy');constapp=express();constcompress=require('compression');const{Readable}=require('node:stream');app.use(compress());//Applicationconst{readFile}=require('fs').promises;constReact=require('react');constmoduleBasePath=newURL('../src',url.pathToFileURL(__filename)).href;asyncfunctionrenderApp(res,returnValue){const{renderToPipeableStream}=awaitimport('react-server-dom-esm/server');constm=awaitimport('../src/App.js');constApp=m.default;constroot=React.createElement(App);//Forclient-invokedserveractionswerefreshthetreeandreturnareturnvalue.constpayload=returnValue?{returnValue,root}:root;const{pipe}=renderToPipeableStream(payload,moduleBasePath);pipe(res);}app.get('/',asyncfunction(req,res){awaitrenderApp(res,null);});app.post('/',bodyParser.text(),asyncfunction(req,res){const{renderToPipeableStream,decodeReply,decodeReplyFromBusboy,decodeAction,}=awaitimport('react-server-dom-esm/server');constserverReference=req.get('rsc-action');if(serverReference){//Thisistheclient-sidecaseconst[filepath,name]=serverReference.split('#');constaction=(awaitimport(filepath))[name];//Validatethatthisisactuallyafunctionweintendedtoexposeand//nottheclienttryingtoinvokearbitraryfunctions.Inarealapp,//you'dhaveamanifestverifyingthisbeforeevenimportingit.if(action.$$typeof!==Symbol.for('react.server.reference')){thrownewError('Invalidaction');}letargs;if(req.is('multipart/form-data')){//Usebusboytostreaminglyparsethereplyfromform-data.constbb=busboy({headers:req.headers});constreply=decodeReplyFromBusboy(bb,moduleBasePath);req.pipe(bb);args=awaitreply;}else{args=awaitdecodeReply(req.body,moduleBasePath);}constresult=action.apply(null,args);try{//Waitforanymutationsawaitresult;}catch(x){//Wehandletheerrorontheclient}//RefreshtheclientandreturnthevaluerenderApp(res,result);}else{//ThisistheprogressiveenhancementcaseconstUndiciRequest=require('undici').Request;constfakeRequest=newUndiciRequest('http://localhost',{method:'POST',headers:{'Content-Type':req.headers['content-type']},body:Readable.toWeb(req),duplex:'half',});constformData=awaitfakeRequest.formData();constaction=awaitdecodeAction(formData,moduleBasePath);try{//Waitforanymutationsawaitaction();}catch(x){const{setServerState}=awaitimport('../src/ServerState.js');setServerState('Error:'+x.message);}renderApp(res,null);}});app.get('/todos',function(req,res){res.json([{id:1,text:'Shaveyaks',},{id:2,text:'Eatkale',},]);});app.listen(3001,()=>{console.log('RegionalFlightServerlisteningonport3001...');});app.on('error',function(error){if(error.syscall!=='listen'){throwerror;}switch(error.code){case'EACCES':console.error('port3001requireselevatedprivileges');process.exit(1);break;case'EADDRINUSE':console.error('Port3001isalreadyinuse');process.exit(1);break;default:throwerror;}});