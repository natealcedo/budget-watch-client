import React from "react";
import { Container, Header } from "semantic-ui-react";

import AddEntryForm from "./AddEntryForm";

class AddEntry extends React.Component {
  render() {
    const formStyle={
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: "10vh"
    };
    const divStyle={
      textAlign: "center",
      marginTop: "5vh"
    };
    return (
      <div>
        <div style={divStyle}>
          <Header as="h1">Add Entries to Track where your money goes!</Header>
        </div>
        <Container style={formStyle}>
          <AddEntryForm /> 
        </Container>
      </div>
    );
  }
}

export default AddEntry;
