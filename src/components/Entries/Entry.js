import React from "react";
import { connect } from "react-redux";
import { Container, Form, Table, Dropdown, Message } from "semantic-ui-react";
import { getAllEntries, unsetEntries, deleteEntry, sortEntries } from "../../actions/entryActions";
import EntryRow from "./EntryRow";
import { sortOptions } from "./EntryOptions";

class Entry extends React.Component {

  constructor(props){
    super(props);
    this.deleteEntry = this.deleteEntry.bind(this);
    this.setSortFilter = this.setSortFilter.bind(this);
  }

  componentWillMount(){
    this.props.getAllEntries();
  }

  componentWillUnmount(){
    this.props.unsetEntries();
  }

  deleteEntry(id){
    const data = { id };
    this.props.deleteEntry(data);
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
        deleteEntry={this.deleteEntry}
      />
      ));
    return (
      <Container>
        <Table >
          <Table.Header>
            <Table.Row>
              <Table.Cell>
                <Form.Field
                  control={Dropdown}
                  inline
                  options={sortOptions}
                  selection
                  label="Sort Entries By: "
                  onChange={this.setSortFilter}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Header>
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

function mapStateToProps(state){
  return {
    entries: state.entries
  };
}

Entry.propTypes = {
  entries: React.PropTypes.array.isRequired,
  getAllEntries: React.PropTypes.func.isRequired,
  unsetEntries: React.PropTypes.func.isRequired,
  sortEntries: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, { 
  getAllEntries,
  unsetEntries, 
  deleteEntry, 
  sortEntries })(Entry);
