import AnalysisTable from "./AnalysisTable";
import React from "react";
import validateEntriesByTime from "../../utilities/validateEntriesByTime";
import { Container, Form, Table, Dropdown, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { getEntriesByYear, getEntriesByMonth, unsetEntries } from "../../actions/entryActions";
import { monthOptions, yearOptions } from "../Entries/EntryOptions";

class Analysis extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      year: "",
      month: "",
      errors: {},
      isLoading: false
    };
    this.updateFieldState = this.updateFieldState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentWillUnmount(){
    this.props.unsetEntries();
  }

  updateFieldState(e,data){
    e.preventDefault();
    this.setState({
      [data.name]: data.value
    });
  }

  calculateTotalSpend(){

  }

  onSubmit(e){
    e.preventDefault();
    const { isValid, errors } = validateEntriesByTime(this.state);
    if(isValid){
      this.setState({ errors });
      const { month } = this.state;
      if(!month){
        this.setState({
          isLoading: true
        });
        this.props.getEntriesByYear(this.state).then(() => {
          this.setState({
            isLoading: false
          });
        });
      } else {
        this.props.getEntriesByMonth(this.state).then(() => {
          this.setState({
            isLoading: false
          });
        });
      }
    } else {
      this.setState({ 
        errors
      });
    }
  }

  onClick(e, data){
    e.preventDefault();
    const { id } = data;
    this.props.deleteEntry({ id });
  }

  render() {
    return (
      <Container>
        <Table size="large">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Form.Field
                  control={Dropdown}
                  name="year"
                  selection
                  search
                  options={yearOptions}
                  onChange={this.updateFieldState}
                  label="Choose Year: "
                />
                {
                  this.state.errors.year &&
                  <Message negative compact>
                    <Message.Header>Year is required</Message.Header> 
                  </Message>
                }
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Form.Field
                  control={Dropdown}
                  name="month"
                  selection
                  search
                  options={monthOptions}
                  label="Choose Month: "
                  onChange={this.updateFieldState}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Button
                  loading={this.state.isLoading}
                  color="green"
                  inverted
                  onClick={this.onSubmit}>
                  Get Entries
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          { this.props.entries.length > 0 && <AnalysisTable entries={this.props.entries} />}
        </Table>
        {
        !this.props.entries.length  && 
        <Message negative>
          <Message.Header>No entries found for specified time period</Message.Header> 
        </Message>
        }
      </Container>
    );
  }
}

Analysis.propTypes = {
  entries: React.PropTypes.array.isRequired,
  getEntriesByYear: React.PropTypes.func.isRequired,
  getEntriesByMonth: React.PropTypes.func.isRequired,
  unsetEntries: React.PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    entries: state.entries
  };
}

export default connect(mapStateToProps, { 
  getEntriesByMonth,
  getEntriesByYear,
  unsetEntries,
})(Analysis);
