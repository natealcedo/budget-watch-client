import React from "react";
import { Button, Form, Grid, Message } from "semantic-ui-react";
import axios from "axios";
import validator from "validator";

const styles = {
  marginTop: "5%",
  alignItems: "center",
  textAlign:"left"
};

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state ={
      errors: {},
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
  }

  onSubmit(e){
    e.preventDefault();
    alert("Submit!");
  }
  
  validatePassword(e){
    e.preventDefault();
    const { password, passwordConfirm } = this.state;
    const errors = this.state.errors;
    if(!validator.equals(password, passwordConfirm)){
      errors["password"] = "Password should be the same";
    } else {
      delete errors["password"];
    }
    this.setState({errors});
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validateInput(e){
    e.persist();
    const errors = this.state.errors;
    axios.get(`/api/users/${e.target.value}`).then(val => {
      errors[e.target.name] = `${e.target.name} is already being used`; 
      this.setState({errors});
    }).catch(err => {
      delete errors[e.target.name];
      if(e.target.name === "email"){
        if(!validator.isEmail(e.target.value)){
          errors[e.target.name] =`${e.target.name} is not a valid email adress`;
        }
      }
      this.setState({errors});
    });
  }

  render() {
    return (
      <Grid centered style={styles}>
        <Grid.Column width={6}>
          <Form size="large">
            <Form.Input onBlur={this.validateInput} name="username" label="Username" onChange={this.onChange} type="text"/>
            {
            this.state.errors.username && 
            <Message size="tiny" negative><Message.Header>{this.state.errors.username}</Message.Header></Message>
            }
            <Form.Field onChange={this.onChange}onBlur={this.validateInput}> 
              <label>Email</label>
              <input name="email" type="text" placeholder="Type email" />
            </Form.Field>
            {
            this.state.errors.email && 
            <Message size="tiny" negative><Message.Header>{this.state.errors.email}</Message.Header></Message>
            }
            <Form.Field > 
              <label>Password</label>
              <input type="password" onChange={this.onChange}name="password" placeholder="Type password" />
            </Form.Field>
            <Form.Field > 
              <label>Confirm Password</label>
              <input type="password" name="passwordConfirm" onBlur={this.validatePassword}onChange={this.onChange} placeholder="Repeat password" />
            </Form.Field>
            {
            this.state.errors.password && 
            <Message size="tiny" negative><Message.Header>{this.state.errors.password}</Message.Header></Message>
            }

            <Button color="blue" size="large" onClick={this.onSubmit} type="submit">Submit</Button>
          </Form>
        </Grid.Column> 
      </Grid>
    );
  }
}

export default Signup;
