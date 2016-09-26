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

var BaseImageCard = React.createClass({
	getInitialState:function(){
		return{
			domainName: ''
		};
	},
	contextTypes: {
    socket: React.PropTypes.object.isRequired
   },

	
	render() {
		return(
			<div>
				<Card>
					<CardHeader
						title="Do You Require a BASE-IMAGE For Your Deployment ? "
						actAsExpander={true}
						showExpandableButton={true}
					/>					
				<RaisedButton label="YES" primary={true} style={style} onClick={this.props.cloneRepositoryYes}/>
				<RaisedButton label="NO" secondary={true} style={style} onClick={this.props.cloneRepository}/>
				
				</Card>
			{this.props.yesClicked?<BaseImageDetails locationDetails = {this.props.locationDetails}
			 clone={this.props.clone} base={this.props.base} deploy={this.props.deploy} />:null}
			</div>
			);
	}
});

export default BaseImageCard;