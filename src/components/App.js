import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import "reset-css/reset.css";
import "semantic-ui-css/semantic.min.css";
import FlashMessageList from "./FlashMessage/FlashMessageList";

class App extends Component {
  render() {
    return (
      <div >
        <NavigationBar path={this.props.location.pathname} />
        <FlashMessageList />
        { this.props.children }
      </div>
    );
  }
}

export default App;
