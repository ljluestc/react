importReactfrom'react';import{Component}from'react';import{findDOMNode}from'react-dom';import{Link}from'react-router-dom';import{connect}from'react-redux';import{store}from'../store';importThemeContextfrom'./shared/ThemeContext';importClockfrom'./shared/Clock';store.subscribe(()=>{console.log('Counter:',store.getState());});classAboutSectionextendsComponent{componentDidMount(){//ThemodernappiswrappedinStrictMode,//butthelegacybitscanstilluseoldAPIs.findDOMNode(this);}render(){return(<ThemeContext.Consumer>{theme=>(<divstyle={{border:'1pxdashedblack',padding:20}}><h3>src/legacy/Greeting.js</h3><h4style={{color:theme}}>ThiscomponentisrenderedbythenestedReact({React.version}).</h4><Clock/><p>Counter:{this.props.counter}{''}<buttononClick={()=>this.props.dispatch({type:'increment'})}>+</button></p><b><Linkto="/">GotoHome</Link></b></div>)}</ThemeContext.Consumer>);}}functionmapStateToProps(state){return{counter:state};}exportdefaultconnect(mapStateToProps)(AboutSection);