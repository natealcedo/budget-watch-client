import React from "react";
import { Container, Message } from "semantic-ui-react";

import AddEntryForm from "./AddEntryForm";

class AddEntry extends React.Component {
  render() {
    const formStyle={
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "5vh"
    };
    return (
      <div>
        <Container>
          <Message>
            <Message.Header> Add entries to track your spending</Message.Header> 
            <p>Be honest to yourself!</p>
          </Message> 
        </Container>
        <Container style={formStyle}>
          <AddEntryForm /> 
        </Container>
      </div>
    );
  }
}

export default AddEntry;
