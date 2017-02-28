import React from "react";
import { Button, Form, Grid, Message } from "semantic-ui-react";
import axios from "axios";
import validator from "validator";

import FormInputGroup from "./FormInputGroup";

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

            <FormInputGroup
              errors={this.state.errors.username}
              name="username"
              label="username"
              onChange={this.onChange}
              validateField={this.validateInput}
            />

          <FormInputGroup
            name="email" 
            label="email"
            onChange={this.onChange}
            validateField={this.validateInput}
            errors={this.state.errors.email}
          />

        <FormInputGroup 
          name="password"
          label="password"
          type="password"
          onChange={this.onChange}
        />

      <FormInputGroup
        name="passwordConfirm"
        label="repeat password"
        onChange={this.onChange}
        validateField={this.validatePassword}
        type="password"
        errors={this.state.errors.password}
      />

      <Button color="blue" size="large" onClick={this.onSubmit} type="submit">Submit</Button>
    </Form>
  </Grid.Column> 
</Grid>
    );
  }
}

export default Signup;
