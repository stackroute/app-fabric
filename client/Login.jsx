import React from "react";
import { Link } from "react-router";
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
   textAlign:"center",
   marginTop:"200px"
   
};

const muiTheme = getMuiTheme({
    
});

var Login=React.createClass({
    render(){
        return <div style={style}>
            <MuiThemeProvider muiTheme={muiTheme}>
               <div >
						<h1 style={{color:"#DBE7EB"}}>App Fabric.</h1>
                        <h3 style={{color:"#DBE7EB"}}>Host your docker-compose applications in few steps</h3>
                               <RaisedButton style={{margin:'30px 0 30px 0',textAlign:'center'}} href="https://github.com/login/oauth/authorize?client_id=06ae9c621282646f4225" label="Login with GitHub"/>
                   </div>
            </MuiThemeProvider>
        </div>
    }
})

module.exports=Login;