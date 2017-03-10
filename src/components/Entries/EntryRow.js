import React from "react";
import { Table, Button } from "semantic-ui-react";

class EntryRow extends React.Component {

  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e, data){
    e.preventDefault();
    this.props.deleteEntry(data.id);
  }
  render() {
    const { id, category, description, day, month, year, amount } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{ category }</Table.Cell>
        <Table.Cell>{ description }</Table.Cell>
        <Table.Cell>{ day }</Table.Cell>
        <Table.Cell>{ month }</Table.Cell>
        <Table.Cell>{ year }</Table.Cell>
        <Table.Cell>{ amount }</Table.Cell>
        <Table.Cell><Button negative id={id} onClick={this.onClick} size="medium">Delete</Button></Table.Cell>
      </Table.Row>
    );
  }
}

EntryRow.propTypes = {
  id: React.PropTypes.string.isRequired,
  amount: React.PropTypes.number.isRequired,
  day: React.PropTypes.number.isRequired,
  description: React.PropTypes.string.isRequired,
  month: React.PropTypes.number.isRequired,
  year: React.PropTypes.number.isRequired,
  category: React.PropTypes.string.isRequired,
  deleteEntry: React.PropTypes.func.isRequired
};

export default EntryRow;
