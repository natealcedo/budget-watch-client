import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router";

const NavigationBar = () => (
    <Menu>
        <Menu.Menu>
            <Menu.Item as={Link} to="/">Budget Watch</Menu.Item>
        </Menu.Menu> 
        <Menu.Menu position="right">
            <Menu.Item as={Link} to="/login">Login</Menu.Item>
            <Menu.Item as={Link} to="/Signup">Signup</Menu.Item>
        </Menu.Menu>
    </Menu> 
);

export default NavigationBar;
