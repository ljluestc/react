import*asReactfrom'react';import{use,Suspense,useState,startTransition}from'react';importReactDOMfrom'react-dom/client';import{createFromFetch,encodeReply}from'react-server-dom-esm/client';constmoduleBaseURL='/src/';letupdateRoot;asyncfunctioncallServer(id,args){constresponse=fetch('/',{method:'POST',headers:{Accept:'text/x-component','rsc-action':id,},body:awaitencodeReply(args),});const{returnValue,root}=awaitcreateFromFetch(response,{callServer,moduleBaseURL,});//RefreshthetreewiththenewRSCpayload.startTransition(()=>{updateRoot(root);});returnreturnValue;}letdata=createFromFetch(fetch('/',{headers:{Accept:'text/x-component',},}),{callServer,moduleBaseURL,});functionShell({data}){const[root,setRoot]=useState(use(data));updateRoot=setRoot;returnroot;}ReactDOM.hydrateRoot(document,React.createElement(Shell,{data}));