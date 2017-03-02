import React from "react";
import { isUserExists } from "../../actions/loginActions.js";
import { connect } from "react-redux";

import LoginForm from "./LoginForm";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.updateFieldState = this.updateFieldState.bind(this);
    this.validateUserInput = this.validateUserInput.bind(this);
    this.state = {
      userInput: "",
      password: "",
      errors: {}
    };
  }

  validateUserInput(e){
    const errors = this.state.errors;
    const { isUserExists } = this.props;
    isUserExists(e.target.value).then(user => {
      delete errors.userInput;
      // setting state in the then or catch block because of async nature where ui doesnt
      // update on time
      this.setState({errors});
    }).catch(err => {
      errors.userInput = "User does not exist";
      this.setState({errors});
    });
  }

  updateFieldState(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <LoginForm 
        errors={this.state.errors} 
        updateFieldState={this.updateFieldState}
        validateUserInput={this.validateUserInput}
      />
    );
  }
}

Login.propTypes = {
  isUserExists: React.PropTypes.func.isRequired
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(null, { isUserExists })(Login);
