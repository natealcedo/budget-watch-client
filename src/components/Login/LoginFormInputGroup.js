import React from "react";
import { Form, Message } from "semantic-ui-react";

const style={
  marginBottom: 20
};

const LoginFormInputGroup = ({ updateFieldState, type, name, label, validateUserInput, errors }) => (
  <div style={style}>
    <Form.Input
        onChange={updateFieldState} 
        label={label}
        name={name}
        onBlur={validateUserInput}
        type={type}
    />
      {
      errors && 
      <Message negative>
        <Message.Header>{ errors }</Message.Header>
      </Message>
      }
  </div>
  );

LoginFormInputGroup.propTypes = {
  updateFieldState: React.PropTypes.func.isRequired,
  validateUserInput: React.PropTypes.func,
  errors: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired
};

LoginFormInputGroup.defaultProps = {
  type: "text"
};

export default LoginFormInputGroup;
