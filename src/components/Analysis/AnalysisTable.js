import React from "react";
import { maxBy } from "lodash";
import { Table, Header } from "semantic-ui-react";

const AnalysisTable = ({ entries }) => {
  const total = entries.reduce((prev,curr) => {
    return prev + curr.amount;
  }, 0);

  const highestEntry = maxBy(entries, "amount");

  let leisure = entries.filter((entry) => entry.category === "LEISURE").reduce((prev,curr) =>{
    return {
      category: "LEISURE",
      amount: prev.amount + curr.amount
    };
  }, {
    amount: 0
  });
  let food = entries.filter((entry) => entry.category === "FOOD").reduce((prev,curr) =>{
    return {
      category: "FOOD",
      amount: prev.amount + curr.amount
    };
  }, {
    amount: 0
  });
  let expense = entries.filter((entry) => entry.category === "EXPENSE").reduce((prev,curr) =>{
    return {
      category: "EXPENSE",
      amount: prev.amount + curr.amount
    };
  }, {
    amount: 0
  });

  const highestCategory = maxBy([food, leisure, expense], "amount").category;

  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell><Header as="h3">Total Amount spent for this time period </Header></Table.Cell>
        <Table.Cell><header as="h3">${total}</header></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell><Header as="h3">Category which you spent the most on</Header></Table.Cell>
        <Table.Cell><header as="h3">{highestCategory}</header></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell ><Header as="h3">Largest Transaction in this time Period</Header></Table.Cell>  
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as="h3">Category</Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h3">Description</Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h3">Day</Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h3">Month</Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h3">Year</Header>
        </Table.Cell>
        <Table.Cell>
          <Header as="h3">Amount</Header>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>{ highestEntry.category}</Table.Cell> 
        <Table.Cell>{ highestEntry.description}</Table.Cell> 
        <Table.Cell>{ highestEntry.day}</Table.Cell> 
        <Table.Cell>{ highestEntry.month}</Table.Cell> 
        <Table.Cell>{ highestEntry.year}</Table.Cell> 
        <Table.Cell>{ highestEntry.amount}</Table.Cell> 
      </Table.Row>
    </Table.Body> 
  );
};

AnalysisTable.propTypes = {
  entries: React.PropTypes.array.isRequired 
};

export default AnalysisTable;
