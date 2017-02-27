import React from "react";
import { Button, Form, Grid, Message } from "semantic-ui-react";
import axios from "axios";

const styles = {
  marginTop: "5%",
  alignItems: "center",
  textAlign:"left"
};

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.state ={
      errors: {}
    };
  }
  onSubmit(e){
    e.preventDefault();
    alert("Submit!");
  }
  onBlur(e){
    e.persist();
    const errors = this.state.errors;
    axios.get(`/api/users/${e.target.value}`).then(val => {
      errors[e.target.name] = `${e.target.name} is already being used`; 
      this.setState({errors});
    }).catch(err => {
      delete errors[e.target.name];
      this.setState({errors});
    });
  }
  render() {
    return (
      <Grid centered style={styles}>
        <Grid.Column width={6}>
          <Form size="large">
            <Form.Input onBlur={this.onBlur} name="username" label="Username" type="text"/>
            {
            this.state.errors.username && 
            <Message size="tiny" negative><Message.Header>{this.state.errors.username}</Message.Header></Message>
            }
            <Form.Field onBlur={this.onBlur}> 
              <label>Email</label>
              <input name="email" type="text" placeholder="Type email" />
            </Form.Field>
            {
            this.state.errors.email && 
            <Message negative><Message.Header>{this.state.errors.email}</Message.Header></Message>
            }
            <Form.Field > 
              <label>Password</label>
              <input type="password" placeholder="Type password" />
            </Form.Field>
            <Form.Field > 
              <label>Confirm Password</label>
              <input type="password" placeholder="Repeat password" />
            </Form.Field>
            <Button color="blue" size="large" onClick={this.onSubmit} type="submit">Submit</Button>
          </Form>
        </Grid.Column> 
      </Grid>
    );
  }
}

export default Signup;
