import React from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DeploymentCard from "./deploymentCard.jsx";
import BaseImageDetails from "./BaseImageDetails.jsx";
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';



const style = {
	margin: 14,	
};

var Domain = React.createClass({

	contextTypes: {
    socket: React.PropTypes.object.isRequired
   },

	getInitialState:function(){
		return{
			domainName: ''
		};
	},


	handleDomainChange:function(event){
  		this.setState({domainName: event.target.value});

  	},

  	emitChange:function(e){
  		e.preventDefault();
  		this.context.socket.emit("domain",{domainName: this.state.domainName});
  	},
	
	
	render() {
		return(
			<div>
				<Card>
					<CardHeader
						title="Enter the Domain Name for where you want to deploy? "
						actAsExpander={true}
						showExpandableButton={true}
					/>
					<TextField
					fullWidth={true}
					type = "text"
					hintText="Enter GIT URL"
					floatingLabelText="GIT URL"
					value = { this.state.domainName }
					onChange = { this.handleDomainChange }
					/>					
					<RaisedButton label="Submit" primary={true} style={style} onSubmit={this.emitChange}/>				
				</Card>
			</div>
			);
	}
});

export default Domain;