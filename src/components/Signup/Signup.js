import React from "react";
import validator from "validator";
import { connect } from "react-redux";
import { Message, Grid } from "semantic-ui-react";

import SignupForm from "./SignupForm";
import { isUserExists, userSignUp } from "../../actions/signupActions";

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
    const { userSignUp } = this.props;
    const { username, password, passwordConfirm, email } = this.state;
    const data = { username, password, passwordConfirm, email };
    userSignUp(data)
      .then(res => {
        this.context.router.push("/login");
      })
      .catch( err =>{
        this.setState({errors: err.response.data.errors });
      });
  }

  validatePassword(e){
    e.preventDefault();
    const { password, passwordConfirm } = this.state;
    const errors = this.state.errors;
    if(!validator.equals(password, passwordConfirm)){
      errors["passwordConfirm"] = "passwords must match";
    } else {
      delete errors["passwordConfirm"];
    }
    this.setState({errors});
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkUserExists(e){
    const { isUserExists } = this.props;
    e.persist();
    const errors = this.state.errors;
    isUserExists(e.target.value).then(val => {
      errors[e.target.name] = `${e.target.name} is already being used`; 
      this.setState({errors});
    }).catch(err => {
      delete errors[e.target.name];
      if(e.target.name === "email"){
        if(!validator.isEmail(e.target.value)){
          errors[e.target.name] = "must be a valid email address";
        }
      }
      this.setState({errors});
    });
  }

  render() {
    return (
      <div >
        <SignupForm
          onSubmit={this.onSubmit} 
          validatePassword={this.validatePassword}
          checkUserExists={this.checkUserExists}
          updateFieldState={this.onChange}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  userSignUp: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired
};

Signup.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null,{ isUserExists, userSignUp })(Signup);
