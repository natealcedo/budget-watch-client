import React from "react";
import validateEntryForm from "../../utilities/validateEntryForm";
import { Form, Grid, Message, Button, Dropdown } from "semantic-ui-react";
import { addEntry } from "../../actions/entryActions";
import { connect } from "react-redux";
import { dayOptions, monthOptions, yearOptions, categoryOptions } from "./EntryOptions";

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
    this.updateDropDownFieldState = this.updateDropDownFieldState.bind(this);
    this.updateInputFieldState = this.updateInputFieldState.bind(this);
    this.onSubmitButton=this.onSubmitButton.bind(this);
  }

  updateDropDownFieldState(e, data){
    e.preventDefault();
    this.setState({
      [data.name]: data.value
    });
  }

  updateInputFieldState(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmitButton(e){
    e.preventDefault();
    const { errors, isValid } = validateEntryForm(this.state);
    if(isValid){
      this.props.addEntry(this.state).then(() => {
        this.context.router.push("/entries"); 
      }).catch(err => {
        this.setState({
          errors: err
        });
      });
    } else {
      this.setState({
        errors
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
              <Form.Input name="amount" onChange={this.updateInputFieldState} label="Amount $"></Form.Input>
              {
              this.state.errors.amount && 
              <Message size="tiny" negative>
                <Message.Header>{ this.state.errors.amount }</Message.Header>
              </Message>
              }
              <Form.Field
                name="description"
                control="input"
                onChange={this.updateInputFieldState}
                label="Description"
              />
              {
                this.state.errors.description && 
                <Message size="tiny" negative>
                  <Message.Header>{ this.state.errors.description }</Message.Header>
                </Message>
              }
              <Form.Field
                control={Dropdown}
                name="category"
                fluid
                onChange={this.updateDropDownFieldState}
                options={categoryOptions}
                selection
                label="Category"
              />
              {
                this.state.errors.description && 
                <Message size="tiny" negative>
                  <Message.Header>{ this.state.errors.description }</Message.Header>
                </Message>
              } 
              <Form.Field
                control={Dropdown}
                fluid
                name="day"
                onChange={this.updateDropDownFieldState}
                options={dayOptions}
                selection
                search
                label="Day"
              />
              {
                this.state.errors.day && 
                <Message size="tiny" negative>
                  <Message.Header>{ this.state.errors.day }</Message.Header>
                </Message>
              } 
              <Form.Field
                control={Dropdown}
                name="month"
                search
                fluid
                onChange={this.updateDropDownFieldState}
                options={monthOptions}
                selection
                label="Month"
              />  
              {
                this.state.errors.month && 
                <Message size="tiny" negative>
                  <Message.Header>{ this.state.errors.month }</Message.Header>
                </Message>
              } 
              <Form.Field
                control={Dropdown}
                name="year"
                search
                fluid
                onChange={this.updateDropDownFieldState}
                options={yearOptions}
                selection
                label="Year"
              /> 
              {
                this.state.errors.year && 
                <Message size="tiny" negative>
                  <Message.Header>{ this.state.errors.year }</Message.Header>
                </Message>
              }   
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

export default connect(null, { addEntry })(AddEntryForm);
