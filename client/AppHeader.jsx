import React from 'react';
import ReactDOM from 'react-dom';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import DeploymentCard from "./deploymentCard.jsx";
import Login from "./Login.jsx";
//App Bar 
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Router,Route,hashHistory,Link} from "react-router";

const styles = {
  paperstyle: {
    width: "100%",
    margin: '10px',
    textAlign: 'center',
    display: 'inline-block',
    padding: '30px'
  }
};

const muiTheme = getMuiTheme({
 palette: {
   textColor: cyan500,
 },
});

const style = {
 margin: 12,
};

const btnstyle={
  width:"80%"
}

var SignOut = React.createClass({
 getInitialState: function() {
  return { gitRepositoryURL: '',clicked:false, cookieStatus: false };
},

componentWillMount: function(){
  if(document.cookie){
    this.setState({cookieStatus:true})
  }
  else if(document.cookie.length == 0){
    this.setState({cookieStatus:false})
  }
},

signOut: function(){
  document.cookie = 'JWT' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
},

contextTypes: {
  router: React.PropTypes.object.isRequired
},

componentDidMount: function () {
  if (!this.state.cookieStatus){
    this.context.router.push('/')
  }
},

render: function() {
 return (
  <Link to="/" >
  <MenuItem primaryText="Sign out" onClick={this.signOut}></MenuItem>
  </Link>
  );
}
});

var AppHeader = React.createClass({
	render(){
		return(
      <AppBar style={{backgroundColor:"#3A606E"}}
      title="App Fabric"
      iconElementLeft={<IconButton></IconButton>}
      iconElementRight={
        <IconMenu
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
        <SignOut />
        </IconMenu>
        }
      />
    );
	}
	
})		

module.exports=AppHeader;
