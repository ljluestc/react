/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@emailsreact-core*/'usestrict';describe('ReactSymbols',()=>{beforeEach(()=>jest.resetModules());constexpectToBeUnique=keyValuePairs=>{constmap=newMap();keyValuePairs.forEach(([key,value])=>{if(map.has(value)){throwError(`${key}value${value.toString()}isthesameas${map.get(value)}.`,);}map.set(value,key);});};it('Symbolvaluesshouldbeunique',()=>{expectToBeUnique(Object.entries(require('shared/ReactSymbols')));});});