import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router";

const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    flexDirection: "column"
};

export default () => {
    return (
        <div style={styles}>
            <h1>Page not found</h1>
            <Button as={Link} to="/">Return to Home Page</Button>
        </div>
    );
};
