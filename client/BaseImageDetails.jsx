import React from "react";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import DeploymentCard from "./deploymentCard.jsx";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';




var BaseImageDetails = React.createClass({
	getInitialState:function(){	
		return {
			imageTag: '',
			locationValue: '',
			domainName: '',
			clicked:false
		};
			
	},
	contextTypes: {
    socket: React.PropTypes.object.isRequired
   },
	  handleImageChange:function(event){
	    this.setState({imageTag: event.target.value});
	    console.log(this.state.imageTag);
  }, 	 
  
  	  handleLocationChange:function(event, index, value){
  	  	console.log('handling location change!!!');
	    this.setState({locationValue: value});
	    console.log(this.state.locationValue);
  },
  	  clickedBase: function(e){
  		e.preventDefault();
  		this.setState({clicked : true});
  		console.log("socket " , this.state.imageTag,this.state.locationValue);  		
  		this.context.socket.emit("baseImageSubmit",{imageTag:this.state.imageTag},{locationValue:this.state.locationValue});
  		

  	},

	render(){
		 console.log(this.state.locationValue,this.state.imageTag);
		console.log("wwooowwowow" , this.props.locationDetails);
			var locationItems = this.props.locationDetails.map(function(locationItem){
				return <MenuItem value = {locationItem} primaryText = {locationItem} />
			}.bind(this));		

		console.log("locationItems------------",locationItems);
		console.log('clicked: ', this.state.clicked);
		return(
			<div>			  
				<Card>
					<CardHeader
				      title="Please provide the following details ? "
				      actAsExpander={true}
				      showExpandableButton={true}
				    />
				   <form onSubmit = {this.clickedBase} >
					    <TextField hintText="Image Tag" 
					    floatingLabelText="Image Tag"
					    value = {this.state.imageTag} onChange = {this.handleImageChange}/>
					    <Divider />					    
					    <SelectField 
					    	fullWidth={true}
							hintText="Select the location of your base-image Dockerfile"
							onChange = {this.handleLocationChange}
							value = {this.state.locationValue}                                                                                     
							maxHeight={200}>
							{locationItems}
						</SelectField>
						<Divider />
						<RaisedButton label="Secondary" primary={true}
						 label="Build" secondary={true} 
						 type = "submit" />
					</form>				    		     
				 	</Card>				 	
				 	{this.state.clicked?<DeploymentCard clone={this.props.clone}
				 	 base={this.props.base} deploy={this.props.deploy}/>:null}
				 </div>
			);
	}
});

export default BaseImageDetails;
