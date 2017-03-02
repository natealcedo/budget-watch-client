import React from "react";
import { Menu } from "semantic-ui-react";
import { Link, Button } from "react-router";
import { connect } from "react-redux";

import { userLogout } from "../actions/loginActions";


class NavigationBar extends React.Component {
  constructor(props){
    super(props);
    this.onUserLogout = this.onUserLogout.bind(this);
  }

  onUserLogout(e){
    e.preventDefault();
    this.props.userLogout();
  }

  render() {
    const { path, isAuthenticated } = this.props;
    const authenticatedLinks = (
      <Menu.Menu position="right">
        <Menu.Item  as={Button} onClick={this.onUserLogout}>Logout</Menu.Item>
      </Menu.Menu>
      );
    const guestLinks =(
      <Menu.Menu position="right">
        <Menu.Item active={path==="/login"} as={Link} to="/login">Login</Menu.Item>
        <Menu.Item active={path==="/signup"} as={Link} to="/signup">Signup</Menu.Item>
      </Menu.Menu>
      ); 
    return(
      <Menu pointing inverted size="massive" color="blue">
        <Menu.Header>
          <Menu.Item as={Link} to="/">Budget Watch</Menu.Item>
        </Menu.Header> 
        {
          isAuthenticated? authenticatedLinks: guestLinks
        }
      </Menu>
    );
  }
}

function mapStateToProps(state){
  return{
    isAuthenticated: state.authentication.isAuthenticated
  };
}

NavigationBar.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  userLogout: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, { userLogout })(NavigationBar);
