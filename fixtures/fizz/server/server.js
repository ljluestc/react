/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**/'usestrict';constbabelRegister=require('@babel/register');babelRegister({ignore:[/[\\\/](build|server\/server|node_modules)[\\\/]/],presets:[['react-app',{runtime:'automatic'}]],plugins:['@babel/transform-modules-commonjs'],});constexpress=require('express');constcompress=require('compression');const{readFileSync}=require('fs');constpath=require('path');constrenderToString=require('./render-to-string');constrenderToStream=require('./render-to-stream');constrenderToBuffer=require('./render-to-buffer');const{JS_BUNDLE_DELAY}=require('./delays');constPORT=process.env.PORT||4000;constapp=express();app.use(compress());app.get('/',handleErrors(asyncfunction(req,res){awaitwaitForWebpack();renderToStream(req.url,res);}));app.get('/string',handleErrors(asyncfunction(req,res){awaitwaitForWebpack();renderToString(req.url,res);}));app.get('/stream',handleErrors(asyncfunction(req,res){awaitwaitForWebpack();renderToStream(req.url,res);}));app.get('/buffer',handleErrors(asyncfunction(req,res){awaitwaitForWebpack();renderToBuffer(req.url,res);}));app.use(express.static('build'));app.use(express.static('public'));app.listen(PORT,()=>{console.log(`Listeningat${PORT}...`);}).on('error',function(error){if(error.syscall!=='listen'){throwerror;}constisPipe=portOrPipe=>Number.isNaN(portOrPipe);constbind=isPipe(PORT)?'Pipe'+PORT:'Port'+PORT;switch(error.code){case'EACCES':console.error(bind+'requireselevatedprivileges');process.exit(1);break;case'EADDRINUSE':console.error(bind+'isalreadyinuse');process.exit(1);break;default:throwerror;}});functionhandleErrors(fn){returnasyncfunction(req,res,next){try{returnawaitfn(req,res);}catch(x){next(x);}};}asyncfunctionwaitForWebpack(){while(true){try{readFileSync(path.resolve(__dirname,'../build/main.js'));return;}catch(err){console.log('Couldnotfindwebpackbuildoutput.Willretryinasecond...');awaitnewPromise(resolve=>setTimeout(resolve,1000));}}}