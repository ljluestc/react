/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@flow*/exportfunctionlocalStorageGetItem(key:string):any{try{returnlocalStorage.getItem(key);}catch(error){returnnull;}}exportfunctionlocalStorageRemoveItem(key:string):void{try{localStorage.removeItem(key);}catch(error){}}exportfunctionlocalStorageSetItem(key:string,value:any):void{try{returnlocalStorage.setItem(key,value);}catch(error){}}exportfunctionsessionStorageGetItem(key:string):any{try{returnsessionStorage.getItem(key);}catch(error){returnnull;}}exportfunctionsessionStorageRemoveItem(key:string):void{try{sessionStorage.removeItem(key);}catch(error){}}exportfunctionsessionStorageSetItem(key:string,value:any):void{try{returnsessionStorage.setItem(key,value);}catch(error){}}