import React from "react";
import validator from "validator";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import SignupForm from "./SignupForm";
import { isUserExists, userSignUp } from "../../actions/signupActions";
import { addFlashMessage } from "../../actions/flashMessagesActions";


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

  componentWillMount(){
    if(this.props.isAuthenticated){
      this.context.router.push("/");
    }
  }

  onSubmit(e){
    e.preventDefault();
    const { userSignUp } = this.props;
    const { username, password, passwordConfirm, email } = this.state;
    const data = { username, password, passwordConfirm, email };
    if(isEmpty(this.state.errors)){
      userSignUp(data)
        .then(res => {
          this.props.addFlashMessage("Account created! Login to procceed!");
          this.context.router.push("/login");
        })
        .catch( err =>{
          this.setState({errors: err.response.data.errors });
        });
    }
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
      <SignupForm
        onSubmit={this.onSubmit} 
        validatePassword={this.validatePassword}
        checkUserExists={this.checkUserExists}
        updateFieldState={this.onChange}
        errors={this.state.errors}
      />
    );
  }
}

Signup.propTypes = {
  userSignUp: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
};

Signup.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
}

export default connect( mapStateToProps, { addFlashMessage, isUserExists, userSignUp })(Signup);
