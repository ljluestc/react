'usestrict';//ThisisaservertohostCDNdistributedresourceslikemodulesourcefilesandSSRconstpath=require('path');consturl=require('url');constfs=require('fs').promises;constcompress=require('compression');constchalk=require('chalk');constexpress=require('express');consthttp=require('http');const{renderToPipeableStream}=require('react-dom/server');const{createFromNodeStream}=require('react-server-dom-esm/client');constmoduleBasePath=newURL('../src',url.pathToFileURL(__filename)).href;constapp=express();app.use(compress());functionrequest(options,body){returnnewPromise((resolve,reject)=>{constreq=http.request(options,res=>{resolve(res);});req.on('error',e=>{reject(e);});body.pipe(req);});}app.all('/',asyncfunction(req,res,next){//Proxytherequesttotheregionalserver.constproxiedHeaders={'X-Forwarded-Host':req.hostname,'X-Forwarded-For':req.ips,'X-Forwarded-Port':3000,'X-Forwarded-Proto':req.protocol,};//Proxyotherheadersasdesired.if(req.get('rsc-action')){proxiedHeaders['Content-type']=req.get('Content-type');proxiedHeaders['rsc-action']=req.get('rsc-action');}elseif(req.get('Content-type')){proxiedHeaders['Content-type']=req.get('Content-type');}constpromiseForData=request({host:'127.0.0.1',port:3001,method:req.method,path:'/',headers:proxiedHeaders,},req);if(req.accepts('text/html')){try{constrscResponse=awaitpromiseForData;constmoduleBaseURL='/src';//ForHTML,we'rea"client"emulatorthatrunstheclientcode,//sowestartbyconsumingtheRSCpayload.Thisneedsthelocalfilepath//toloadthesourcefilesfromaswellastheURLpathforpreloads.constroot=awaitcreateFromNodeStream(rscResponse,moduleBasePath,moduleBaseURL);//RenderitintoHTMLbyresolvingtheclientcomponentsres.set('Content-type','text/html');const{pipe}=renderToPipeableStream(root,{//TODO:bootstrapModulesinsertsapreloadbeforetheimportmapwhichcauses//theimportmaptobeinvalid.WeneedtofixthatinFloatsomehow.//bootstrapModules:['/src/index.js'],});pipe(res);}catch(e){console.error(`FailedtoSSR:${e.stack}`);res.statusCode=500;res.end();}}else{try{constrscResponse=awaitpromiseForData;//Forotherrequest,wepass-throughtheRSCpayload.res.set('Content-type','text/x-component');rscResponse.on('data',data=>{res.write(data);res.flush();});rscResponse.on('end',data=>{res.end();});}catch(e){console.error(`Failedtoproxyrequest:${e.stack}`);res.statusCode=500;res.end();}}});app.use(express.static('public'));app.use('/src',express.static('src'));app.use('/node_modules/react-server-dom-esm/esm',express.static('node_modules/react-server-dom-esm/esm'));app.listen(3000,()=>{console.log('GlobalFizz/WebpackServerlisteningonport3000...');});app.on('error',function(error){if(error.syscall!=='listen'){throwerror;}switch(error.code){case'EACCES':console.error('port3000requireselevatedprivileges');process.exit(1);break;case'EADDRINUSE':console.error('Port3000isalreadyinuse');process.exit(1);break;default:throwerror;}});