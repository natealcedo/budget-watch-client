import { Message, Icon, Button } from "semantic-ui-react";
import React from "react";

class FlashMessage extends React.Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    e.preventDefault();
    console.log(this.props);
    this.props.deleteFlashMessage(this.props.id);
  }

  render(){
    const { text } = this.props;
    return (
      <Message positive onDismiss={this.onClick} color="teal">  
        <Message.Header >{ text } </Message.Header> 
      </Message>
    );
  }
}

export default FlashMessage;
