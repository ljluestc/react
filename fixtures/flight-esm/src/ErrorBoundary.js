'useclient';import*asReactfrom'react';exportdefaultclassErrorBoundaryextendsReact.Component{state={error:null};staticgetDerivedStateFromError(error){return{error};}render(){if(this.state.error){returnReact.createElement('div',{},'Caughtanerror:'+this.state.error.message);}returnthis.props.children;}}