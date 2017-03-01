import React from "react";
import { Message, Form } from "semantic-ui-react";

const styles = {
  marginBottom: 10
};

const FormInputGroup = ({ validateField ,label, updateFieldState, name, type, errors}) => (
  <div style={styles}>
    <Form.Input onBlur={validateField} onChange={updateFieldState} name={name} label={label}  type={type}/>
    {
    errors && 
    <Message size="tiny" negative><Message.Header>{errors}</Message.Header></Message>
    } 
  </div>
);

FormInputGroup.propTypes = {
  name: React.PropTypes.string.isRequired,
  validateField: React.PropTypes.func,
  type: React.PropTypes.string.isRequired,
  errors: React.PropTypes.string,
  updateFieldState: React.PropTypes.func.isRequired
};

FormInputGroup.defaultProps ={
  type: "text"
};

export default FormInputGroup;
