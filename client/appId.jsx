import React from "react";
import ReactDOM from "react-dom";
import Paper from 'material-ui/Paper';
import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppHeader from "./AppHeader.jsx";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Router,Route,hashHistory,Link} from "react-router";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
	width: "100%",
	textAlign: 'center',
	display: 'inline-block',
	padding: 10
};

const cardStyle = {
	width: "100%",
	textAlign: 'center',
	display: 'inline-block',
	padding: 10,
	color: "rgb(0,0 ,0)"
};



const muiTheme = getMuiTheme({
	palette: {
		textColor: cyan500,
	},
});




var Replicas=React.createClass({
	getInitialState(){
		return {repvalue:this.props.repfromdata.replicas,clicked:false,update:false}
	},

	contextTypes: {
    socket: React.PropTypes.object.isRequired
    },

   
  handleChange(event) {
	  this.setState({clicked:true});
	  console.log("changing",this.state.clicked);
	  if(parseInt((event.target.value)!=NaN)||(event.target.value)>0)
	  {
		  this.setState({
		repvalue: event.target.value
    });
	  }
    
  },
  
  
  update(){

	 $.ajax({
      type: "POST",
      url: "/update",
      data: {"value":this.state.repvalue,"service_id":this.props.repfromdata._id,"app_id":this.props.parentAppId},
      dataType: "json",
    
}).done(function(data){
	console.log("Updating...");
});

 this.context.socket.on("update",function(data){
          this.setState({update:data});
		  console.log("are we inside this fn?",data)
          }.bind(this));
  },

  
  render(){
	  
   return	(<div>
				<TextField id="text-field-controlled" defaultValue={this.state.repvalue} onChange={this.handleChange}/>
					{(this.state.clicked)&&(!this.state.update)?<RaisedButton label="Update" onClick={this.update}/>:null}
			</div>)
	}
});


var ServicesList=React.createClass({
	render(){
		var services = this.props.data.map(function(data, key){
			return(
				<div key={key}>
					<Card style={cardStyle}>
						<div>
							<h5>Service Name: {data.serviceName}</h5> 
							<h5>Replicas:  <Replicas repfromdata={data} parentAppId={this.props.appId}/>  </h5>
							
					</div>
					</Card>
				</div>
				);
			}.bind(this))
		return(
			<div>
			{services}
			</div>				
			);
	}
});

var AppId=React.createClass({
	getInitialState() {
		return {
			data:[],
			app_id:''
		};
	},

	componentDidMount() {
		this.setState({app_id:this.props.params.appId}),
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
	
	render() {
		var data = this.state.data.length>0? this.state.data : "Loading";
		console.log(data)
		var deployedApps=this.state.data.map(function(data,key){
			return(
				data._id == this.state.app_id ? <MuiThemeProvider muiTheme={muiTheme} key={key}>
				<div>
				<AppHeader />
				<ServicesList data={data.services} appId={data._id}/>					
				</div>
				</MuiThemeProvider>: null
				)
		}.bind(this));
		return (
			data == "Loading" ? null:  <div> {deployedApps} </div> 
			);
	}
});

module.exports=AppId;