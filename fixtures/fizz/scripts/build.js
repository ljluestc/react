/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**/'usestrict';constpath=require('path');constrimraf=require('rimraf');constwebpack=require('webpack');constisProduction=process.env.NODE_ENV==='production';rimraf.sync(path.resolve(__dirname,'../build'));webpack({mode:isProduction?'production':'development',devtool:isProduction?'source-map':'cheap-module-source-map',entry:[path.resolve(__dirname,'../src/index.js')],output:{path:path.resolve(__dirname,'../build'),filename:'main.js',},module:{rules:[{test:/\.js$/,use:'babel-loader',exclude:/node_modules/,},],},},(err,stats)=>{if(err){console.error(err.stack||err);if(err.details){console.error(err.details);}process.exit(1);}constinfo=stats.toJson();if(stats.hasErrors()){console.log('Finishedrunningwebpackwitherrors.');info.errors.forEach(e=>console.error(e));process.exit(1);}else{console.log('Finishedrunningwebpack.');}});