import EntryRow from "../Entries/EntryRow";
import React from "react";
import validateEntriesByTime from "../../utilities/validateEntriesByTime";
import { Container, Form, Table, Dropdown, Button, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteEntry, getEntriesByYear, getEntriesByMonth, unsetEntries, sortEntries } from "../../actions/entryActions";
import { monthOptions, yearOptions, sortOptions } from "../Entries/EntryOptions";

class ViewEntriesByTime extends React.Component {

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
    this.setSortFilter = this.setSortFilter.bind(this);
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

  setSortFilter(e,data){
    e.preventDefault();
    this.props.sortEntries(data.value);
  }

  render() {
    const entryList = this.props.entries.map(entry => (       
      <EntryRow
        category={entry.category} 
        amount={entry.amount}
        day={entry.day}
        description={entry.description}
        month={entry.month}
        year={entry.year}
        id={entry._id}
        key={entry._id}
        deleteEntry={this.onClick}
      />
    ));
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
                <Form.Field
                  control={Dropdown}
                  inline
                  options={sortOptions}
                  selection
                  label="Sort Entries By: "
                  onChange={this.setSortFilter}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Button
                  loading={this.state.isLoading}
                  color="green"
                  size="small"
                  inverted
                  fluid
                  onClick={this.onSubmit}>
                  Get Entries
                </Button>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Day</Table.HeaderCell>
              <Table.HeaderCell>Month</Table.HeaderCell>
              <Table.HeaderCell>Year</Table.HeaderCell>
              <Table.HeaderCell>Amount $</Table.HeaderCell>
              <Table.HeaderCell>Delete Entry </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { entryList } 
          </Table.Body>
        </Table>
        {
          !this.props.entries.length  && 
          <Message negative>
            <Message.Header>No entries found</Message.Header> 
          </Message>
        }
      </Container>
    );
  }
}

ViewEntriesByTime.propTypes = {
  deleteEntry: React.PropTypes.func.isRequired,
  entries: React.PropTypes.array.isRequired,
  getEntriesByYear: React.PropTypes.func.isRequired,
  getEntriesByMonth: React.PropTypes.func.isRequired,
  sortEntries: React.PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    entries: state.entries
  };
}

export default connect(mapStateToProps, { 
  deleteEntry,
  getEntriesByYear,
  unsetEntries,
  getEntriesByMonth,
  sortEntries
})(ViewEntriesByTime);
