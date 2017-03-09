import FlashMessage from "./FlashMessage";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import React from "react";
import { deleteFlashMessage } from "../../actions/flashMessagesActions";

class FlashMessageList extends React.Component {
  render() {
    const flashMessages = this.props.messages.map(flashMessage => 
      (<FlashMessage
        deleteFlashMessage={this.props.deleteFlashMessage}
        type={flashMessage.success}
        text={flashMessage.text}
        id={flashMessage.id}
        key={flashMessage.id}
      />)
    );
    return (
      <Container>
        { flashMessages } 
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    messages: state.flashMessages
  };
}


export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessageList);
