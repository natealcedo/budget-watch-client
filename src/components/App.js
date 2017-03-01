import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import "reset-css/reset.css";
import "semantic-ui-css/semantic.min.css";

class App extends Component {
  render() {
    return (
      <div >
        <NavigationBar path={this.props.location.pathname} />
        { this.props.children }
      </div>
    );
  }
}

export default App;
