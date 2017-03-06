import React from "react";
import { dayOptions } from "./EntryOptions";
import { Dropdown } from "semantic-ui-react";

class AddEntry extends React.Component {
  render() {
    const style={
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      flexDirection: "column",
      padding: 10
    };

    return (
      <div style={style}>
        <Dropdown options={dayOptions}></Dropdown>
      </div>
    );
  }
}

export default AddEntry;
