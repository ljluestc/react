/***Copyright(c)MetaPlatforms,Inc.andaffiliates.**ThissourcecodeislicensedundertheMITlicensefoundinthe*LICENSEfileintherootdirectoryofthissourcetree.**@emailsreact-core*@jest-environmentnode*/'usestrict';letReact;letReactNoopServer;describe('ReactServer',()=>{beforeEach(()=>{jest.resetModules();React=require('react');ReactNoopServer=require('react-noop-renderer/server');});functiondiv(...children){children=children.map(c=>typeofc==='string'?{text:c,hidden:false}:c,);return{type:'div',children,prop:undefined,hidden:false};}it('cancallrender',()=>{constresult=ReactNoopServer.render(<div>helloworld</div>);expect(result.root).toEqual(div('helloworld'));});});