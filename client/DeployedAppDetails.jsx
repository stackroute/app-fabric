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
//card
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
//card
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Router,Route,hashHistory,Link} from "react-router";
//appid
import AppId from "./appId.jsx"	
import AppHeader from "./AppHeader.jsx";
const muiTheme = getMuiTheme({
	palette: {
		textColor: cyan500,
	},
});

const styles = {
	title: {
		cursor: 'pointer',
	},
};

var CardExampleExpandable =React.createClass ({
	render(){
		var services=this.props.data.services.map(function(data,key){
			return(
				<div>
					<h3>Service Name: {data.serviceName}</h3>
					<h3>Replicas : {data.replicas}</h3>
				</div>				
				);
		});
		return(
			<Card>
				<Link to={"/apps/"+this.props.data._id}>
				<CardHeader
				title={this.props.data.appName}
				subtitle="Subtitle"
				actAsExpander={true}
				showExpandableButton={false}
				/>
				</Link>
			</Card>);
	}
});

const iconStyles = {
	marginRight: 24,
};

const style = {
	marginTop: 0,
};

var DeployedAppDetails = React.createClass({
	getInitialState() {
		return {
			data:[]
		};
	},

	componentDidMount() {
		$.ajax({
			url: 'http://localhost:8080/deployedAppDetails',
			dataType: 'json',
			type: 'GET',
			success: function(data){
				console.log("successful",data);
				this.setState({data: data});
			}.bind(this)
		})
	},
	
	 contextTypes: {
    router: React.PropTypes.object.isRequired
   },
	
	 deployProject(){
		 this.context.router.push('/form');
	 },

	render() {
		var deployedApps=this.state.data.map(function(data,key){
			return(
				<CardExampleExpandable data={data}/>	
				)
		});
		var data = this.state.data.length>0? this.state.data : "Loading";
		console.log(data)
		return (			
			<MuiThemeProvider muiTheme={muiTheme}>
			<div>
				<AppHeader />
				 <RaisedButton style={{margin:'30px 0 30px 45%',textAlign:'center'}} onClick={this.deployProject} label="Deploy New App"/>
				 {data=="Loading"?null:
									 <div>
										<h3 style={{textAlign:'center'}}>List of deployed applications</h3>
										{deployedApps}
				  					 </div>}
			</div>
			</MuiThemeProvider>
			);
	}
});

export default DeployedAppDetails;