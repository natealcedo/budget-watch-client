import React from "react";
import { connect } from "react-redux";
import { Container, Form, Table, Dropdown } from "semantic-ui-react";
import { yearOptions } from "./EntryOptions";
import { getAllEntries, unsetEntries, deleteEntry } from "../../actions/entryActions";
import EntryRow from "./EntryRow";

class Entry extends React.Component {

  constructor(props){
    super(props);
    this.deleteEntry = this.deleteEntry.bind(this);
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

  render() {
    const entryList = this.props.entries.sort((prev, curr) => {
      return curr.year - prev.year;
    }).map(entry => (       
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
                  fluid
                  options={yearOptions}
                  selection
                  label="View Entries by Time Periods"
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
  unsetEntries: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getAllEntries, unsetEntries, deleteEntry })(Entry);
