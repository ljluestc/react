importReact,{Component,Suspense,startTransition}from'react';importTheme,{ThemeToggleButton}from'./Theme';import'./Chrome.css';exportdefaultclassChromeextendsComponent{state={theme:'light'};render(){constassets=this.props.assets;return(<htmllang="en"><head><metacharSet="utf-8"/><metaname="viewport"content="width=device-width,initial-scale=1"/><linkrel="shortcuticon"href="favicon.ico"/><linkrel="stylesheet"href={assets['main.css']}/><title>{this.props.title}</title></head><bodyclassName={this.state.theme}><noscriptdangerouslySetInnerHTML={{__html:`<b>EnableJavaScripttorunthisapp.</b>`,}}/><Suspensefallback="Loading..."><Theme.Providervalue={this.state.theme}>{this.props.children}<div><ThemeToggleButtononChange={theme=>{startTransition(()=>{this.setState({theme});});}}/></div></Theme.Provider></Suspense><scriptdangerouslySetInnerHTML={{__html:`assetManifest=${JSON.stringify(assets)};`,}}/></body></html>);}}