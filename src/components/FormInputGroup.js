import React from "react";
import { Message, Form } from "semantic-ui-react";

const styles = {
  marginBottom: 10
};

const FormInputGroup = ({ validateField ,label, onChange, name, type, errors}) => (
  <div style={styles}>
    <Form.Input onBlur={validateField} onChange={onChange} name={name} label={label}  type={type}/>
    {
    errors && 
    <Message size="tiny" negative><Message.Header>{errors}</Message.Header></Message>
    } 
  </div>
);

FormInputGroup.propTypes = {
  name: React.PropTypes.string.isRequired,
  onBlur: React.PropTypes.func,
  type: React.PropTypes.string.isRequired,
  errors: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired
};

FormInputGroup.defaultProps ={
  type: "text"
};

export default FormInputGroup;
