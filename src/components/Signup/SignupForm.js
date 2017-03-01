import React from "react";
import { Button, Form, Grid, Message } from "semantic-ui-react";

import FormInputGroup from "./FormInputGroup";

const styles = {
  marginTop: "5%",
  alignItems: "center",
  textAlign:"left"
};

const SignupForm = ({errors, updateFieldState, validatePassword, onSubmit, checkUserExists, validateField}) => (
  <div> 
    <Message color="green" size="massive">
      <Message.Header>Welcome!</Message.Header>
      <p>Please fill in this form to get going!</p>
    </Message>
    <Grid centered style={styles}>
      <Grid.Column width={6}>

      <Form size="large">
        <FormInputGroup
          errors={errors.username}
          name="username"
          label="Username"
          updateFieldState={updateFieldState}
          validateField={checkUserExists}
        />

        <FormInputGroup
          name="email" 
          label="Email"
          updateFieldState={updateFieldState}
          validateField={checkUserExists}
          errors={errors.email}
        />

        <FormInputGroup 
          name="password"
          label="Password"
          type="password"
          updateFieldState={updateFieldState}
        />

        <FormInputGroup
          name="passwordConfirm"
          label="Repeat Password"
          updateFieldState={updateFieldState}
          validateField={validatePassword}
          type="password"
          errors={errors.passwordConfirm}
        />

        <Button color="blue" size="large" onClick={onSubmit} type="submit">Submit</Button>

      </Form>
     </Grid.Column> 
   </Grid>
  </div>
);

SignupForm.propTypes = {
  errors: React.PropTypes.object,
  updateFieldState: React.PropTypes.func.isRequired,
  validatePassword: React.PropTypes.func.isRequired,
  checkUserExists: React.PropTypes.func.isRequired
};

export default SignupForm;
