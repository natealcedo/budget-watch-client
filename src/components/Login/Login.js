import React from "react";
import { Message, Form, Grid } from "semantic-ui-react";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.updateField = this.updateField.bind.this;
    this.state = {
      input: "",
      password: ""
    };
  }

  validateUsername(e){

  }

  updateField(e){
    console.log(this.props);
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const style={
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "60vh"
    };

    return (
      <div style={style}>
        <Grid centered>
          <Grid.Column width={6} size>
            <Message
              header="Welcome to Budget Watch" 
              content="Fill in the form for more awesomeness"
              attached
              color="teal"
            />
            <Form className="attached fluid segment">
              <Form.Field>
                <label>Username or Email</label> 
                <input type="text" placeholder="Type username" name="username" onChange={this.updateFieldState}/>
              </Form.Field>
            </Form> 
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
