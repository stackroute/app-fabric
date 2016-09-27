import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,hashHistory} from "react-router";
import Login from "./Login.jsx";
import DashBoard from "./DashBoard.jsx";
import DeployedAppDetails from "./DeployedAppDetails.jsx";
import AppId from "./appId.jsx"
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


var Index=React.createClass({	
	getChildContext: function() {
    	return {
    		socket: io()
    	};
    },
    childContextTypes: {
		socket: React.PropTypes.object
	},

	requireAuth: function(nextState, replace) {
		console.log("cookie?",document.cookie);
		if(!document.cookie){
			replace({
				pathname: '/',
				state: { nextPathname: nextState.location.pathname}
			})
		}
	},

	render(){
		return <Router history={hashHistory}>
		<Route path="/" component={Login}/>
		<Route path="/apps" component={DeployedAppDetails}  onEnter={this.requireAuth}/>
		<Route path="/apps/:appId" component={AppId}  onEnter={this.requireAuth}/>
		<Route path="/form" component={DashBoard}  onEnter={this.requireAuth}/>
		</Router>
	}
})

ReactDOM.render(<Index/>,document.getElementById('app')) 
