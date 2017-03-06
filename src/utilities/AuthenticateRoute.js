import React from "react";
import { connect } from "react-redux";

export default function(Component){

  class AuthenticateRoute extends React.Component {
    componentWillMount(){
      if(!this.props.isAuthenticated){
        this.context.router.push("/login");
      }
    }
    componentWillUpdate(nextProps){
      if(!nextProps.isAuthenticated){
        this.context.router.push("/login");
      }
    }
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  function mapStateToProps(state){
    return {
      isAuthenticated: state.authentication.isAuthenticated
    };
  }

  AuthenticateRoute.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
  };

  AuthenticateRoute.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  return connect(mapStateToProps)(AuthenticateRoute);
}


