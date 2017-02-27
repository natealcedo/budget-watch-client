import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router";

const NavigationBar = ({ path }) => (
  <Menu inverted  size="huge" color="blue">
    <Menu.Header>
      <Menu.Item as={Link} to="/">Budget Watch</Menu.Item>
    </Menu.Header> 
    <Menu.Menu position="right">
      <Menu.Item active={path==="/login"} as={Link} to="/login">Login</Menu.Item>
      <Menu.Item active={path==="/signup"} as={Link} to="/signup">Signup</Menu.Item>
    </Menu.Menu>
  </Menu> 
);

export default NavigationBar;
