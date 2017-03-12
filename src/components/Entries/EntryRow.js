import React from "react";
import { Table, Button } from "semantic-ui-react";

const EntryRow = ({ id, category, description, day, month, year, amount, deleteEntry }) => (
  <Table.Row>
    <Table.Cell>{ category }</Table.Cell>
    <Table.Cell>{ description }</Table.Cell>
    <Table.Cell>{ day }</Table.Cell>
    <Table.Cell>{ month }</Table.Cell>
    <Table.Cell>{ year }</Table.Cell>
    <Table.Cell>${ amount }</Table.Cell>
    <Table.Cell>
      <Button
        negative
        id={id}
        onClick={deleteEntry}
        size="medium"
      >Delete</Button>
    </Table.Cell>
  </Table.Row>
);

EntryRow.propTypes = {
  amount: React.PropTypes.number.isRequired,
  category: React.PropTypes.string.isRequired,
  day: React.PropTypes.number.isRequired,
  deleteEntry: React.PropTypes.func.isRequired,
  description: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  month: React.PropTypes.number.isRequired,
  year: React.PropTypes.number.isRequired
};

export default EntryRow;
