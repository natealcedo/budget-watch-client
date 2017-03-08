import React from "react";
import { isUserExists, userLogin } from "../../actions/loginActions.js";
import { connect } from "react-redux";
import { addFlashMessage } from "../../actions/flashMessagesActions";

import LoginForm from "./LoginForm";

class Login extends React.Component {
  constructor(props){
    super(props);
    this.updateFieldState = this.updateFieldState.bind(this);
    this.validateUserInput = this.validateUserInput.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.state = {
      userInput: "",
      password: "",
      isLoading: false,
      errors: {}
    };
  }
  
  componentWillMount(){
    if(this.props.isAuthenticated){
      this.context.router.push("/");
    }
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

  loginSubmit(e){
    const { userLogin } = this.props;
    const userData = {
      userInput: this.state.userInput,
      password: this.state.password
    };
    e.preventDefault();
    this.setState({ isLoading: true });  
    userLogin(userData).then(res => {
      this.context.router.push("/");
      this.props.addFlashMessage("Welcome! Login Success!");
    }).catch(err => {
      this.setState({
        isLoading: false,
        errors: err.response.data.errors
      });
    });
  }

  render() {
    return (
      <LoginForm 
        errors={this.state.errors} 
        updateFieldState={this.updateFieldState}
        validateUserInput={this.validateUserInput}
        loginSubmit={this.loginSubmit}
        isLoading={this.state.isLoading}
      />
    );
  }
}

Login.propTypes = {
  isUserExists: React.PropTypes.func.isRequired,
  userLogin: React.PropTypes.func.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
}

export default connect( mapStateToProps, { isUserExists, userLogin, addFlashMessage })(Login);
