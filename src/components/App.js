import React, { Component } from "react";
import NavigationBar from "./NavigationBar";

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
