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
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Domain from "./domain.jsx";


const iconStyles = {
  marginRight: 24,
};

const style = {
  marginTop: 0,
};

var deploymentCard = React.createClass({

  getInitialState:function(){
    return{
          clickedDomain:false,
    };

     },

 render() {
    var iconsClone;
    if((!this.props.clone.isInProgress)&&(!this.props.clone.isComplete)){
      iconsClone = (
        <ToggleRadioButtonUnchecked />
        )
    }else if((this.props.clone.isInProgress)&&(!this.props.clone.isComplete)){
     iconsClone = (
      <CircularProgress size={0.4} style ={style}/>
      )
   }else if((this.props.clone.isComplete)&&(!this.props.clone.isInProgress)){              
    iconsClone = (
     <ActionDone />
     )
  }
  var iconsBase;
  if((!this.props.base.isInProgress)&&(!this.props.base.isComplete)){
      iconsBase = (
        <ToggleRadioButtonUnchecked />
        )
    }else if((this.props.base.isInProgress)&&(!this.props.base.isComplete)){
     iconsBase = (
      <CircularProgress size={0.4} style ={style}/>
      )
   }else if((this.props.base.isComplete)&&(!this.props.base.isInProgress)){              
    iconsBase = (
     <ActionDone />
     )
  }

  var iconsDeploy;            
  if((!this.props.deploy.isInProgress)&&(!this.props.deploy.isComplete)){
    iconsDeploy = (
      <ToggleRadioButtonUnchecked />
      )
  }else if((this.props.deploy.isInProgress)&&(!this.props.deploy.isComplete)){
    iconsDeploy = (
      <CircularProgress size = {0.4} style = {style} />
      )
  }else if((this.props.deploy.isComplete)&&(!this.props.deploy.isInProgress)){
    iconsDeploy = (
      <ActionDone />
      );
  }

  return (
    <div>
      <Card>
        <CardHeader
        title="Deployment In Progress"
        actAsExpander={true}
        showExpandableButton={true}
        />
        <CardActions>
          <List>
            <ListItem primaryText="Cloning" leftIcon={iconsClone} />
            <ListItem primaryText="Building Base-Image" leftIcon={iconsBase} />
            <ListItem primaryText="Deploying" leftIcon={iconsDeploy} />
          </List>              
        </CardActions>            
      </Card>
      {this.props.deploy.isComplete?<Domain/>:null}
    </div>
    );
  }
});

export default deploymentCard;