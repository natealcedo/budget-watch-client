import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";

import FormInputGroup from "./FormInputGroup";

const styles = {
  marginTop: "5%",
  alignItems: "center",
  textAlign:"left"
};

const SignupForm = ({errors, onChange, validatePassword, onSubmit, checkUserExists, validateField}) => (
  <Grid centered style={styles}>
    <Grid.Column width={6}>
      <Form size="large">
        <FormInputGroup
          errors={errors.username}
          name="username"
          label="username"
          onChange={onChange}
          validateField={checkUserExists}
        />

      <FormInputGroup
        name="email" 
        label="email"
        onChange={onChange}
        validateField={checkUserExists}
        errors={errors.email}
      />

      <FormInputGroup 
        name="password"
        label="password"
        type="password"
        onChange={onChange}
      />

      <FormInputGroup
        name="passwordConfirm"
        label="repeat password"
        onChange={onChange}
        validateField={validatePassword}
        type="password"
        errors={errors.password}
      />

      <Button color="blue" size="large" onClick={onSubmit} type="submit">Submit</Button>

      </Form>
    </Grid.Column> 
  </Grid>

);

SignupForm.propTypes = {
  errors: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  validatePassword: React.PropTypes.func.isRequired,
  checkUserExists: React.PropTypes.func.isRequired
};

export default SignupForm;
