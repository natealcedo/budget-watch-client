import React from "react";
import axios from "axios";
import validator from "validator";
import { connect } from "react-redux";

import SignupForm from "./SignupForm";
import { isUserExists } from "../../actions/signupActions";

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
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

  checkUserExists(e){
    e.persist();
    const errors = this.state.errors;
    isUserExists(e.target.value).then(val => {
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
      <div>
        <SignupForm
          onSubmit={this.onSubmit} 
          validatePassword={this.validatePassword}
          checkUserExists={this.checkUserExists}
          onChange={this.onChange}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

export default connect(null,{ isUserExists})(Signup);
