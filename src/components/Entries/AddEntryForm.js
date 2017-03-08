import React from "react";
import axios from "axios";
import validator from "validator";
import { Form, Grid, Message, Button, Dropdown } from "semantic-ui-react";
import { dayOptions, monthOptions, yearOptions, categoryOptions } from "./EntryOptions";
import { isEmpty } from "lodash";

class AddEntryForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      amount: "",
      category: "",
      day: "",
      description: "",
      month: "",
      year: "",
      errors: {}
    }; 
    this.updateFieldState = this.updateFieldState.bind(this);
    this.updateAmountField = this.updateAmountField.bind(this);
    this.updateDescriptionField = this.updateDescriptionField.bind(this);
    this.onSubmitButton=this.onSubmitButton.bind(this);
  }

  updateFieldState(e, data){
    e.preventDefault();
    this.setState({
      [data.name]: data.value
    });
  }

  updateDescriptionField(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validateInput(e){
    // const { amount, category, day, description, month, year, errors } = this.state;
    // if(validator.isEmpty)
  }

  updateAmountField(e){
    let errors = this.state.errors;
    e.preventDefault(); 
    e.persist();
    if(isNaN(e.target.value)){
      errors.amount = "Value must be a number";
      this.setState({ errors });
    } else {
      let errors = this.state.errors;
      errors = {};
      this.setState({
        [e.target.name]: e.target.value,
        errors
      });
    }
  }

  onSubmitButton(e){
    e.preventDefault();
    const errors = this.state.errors;
    if(isEmpty(errors)){
      axios.post("/api/entry", this.state).then(res => {
        console.log(res);
        this.context.router.push("/entries");
      }).catch(err => {
        alert("Some error occured");
      });
    }
  }

  render() {
    const style = {
      marginBottom: "5vh"
    };
    return (
      <div style={style}>
        <Grid centered>
          <Grid.Column width={14}>
            <Message
              header="Fill it up!" 
              content="Fill in this form to add an entry"
              attached
              color="teal"
            />
            <Form size="big" className="attached  segment">
              <Form.Input name="amount" onChange={this.updateAmountField} label="Amount $"></Form.Input>
              {
              this.state.errors.amount && 
              <Message size="tiny" negative>
                <Message.Header>{ this.state.errors.amount }</Message.Header>
              </Message>
              }
              <Form.Field
                name="description"
                control="input"
                onChange={this.updateDescriptionField}
                label="Description"
              />
              <Message size="tiny" negative>
                <Message.Header>hello</Message.Header>
              </Message>
              <Form.Field
                control={Dropdown}
                name="category"
                fluid
                onChange={this.updateFieldState}
                options={categoryOptions}
                selection
                label="Category"
              />
              <Message size="tiny" negative>
                <Message.Header>hello</Message.Header>
              </Message>
              <Form.Field
                control={Dropdown}
                fluid
                name="day"
                onChange={this.updateFieldState}
                options={dayOptions}
                selection
                search
                label="Day"
              />
              <Message size="tiny" negative>
                <Message.Header>hello</Message.Header>
              </Message>
              <Form.Field
                control={Dropdown}
                name="month"
                search
                fluid
                onChange={this.updateFieldState}
                options={monthOptions}
                selection
                label="Month"
              />     
              <Message size="tiny" negative>
                <Message.Header>hello</Message.Header>
              </Message>
              <Form.Field
                control={Dropdown}
                name="year"
                search
                fluid
                onChange={this.updateFieldState}
                options={yearOptions}
                selection
                label="Year"
              />    
              <Message size="tiny" negative>
                <Message.Header>hello</Message.Header>
              </Message>
            </Form>
            <br />
            <Button size="large"  onClick={this.onSubmitButton} primary>Add</Button>
          </Grid.Column>
        </Grid>         
      </div>
    );
  }
}

AddEntryForm.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AddEntryForm;
