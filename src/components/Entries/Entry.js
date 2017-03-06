import React from "react";
import { connect } from "react-redux";

class Entry extends React.Component {
  render() {
    return (
      <div>
        <h1>View Entries by the month</h1>
      </div>
    );
  }
}

export default connect()(Entry);
