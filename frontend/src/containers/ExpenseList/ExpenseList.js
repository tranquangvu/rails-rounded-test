import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import camelcaseKeys from "camelcase-keys";
import request from "../../request";

import Button from "../../components/Button";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import DataTable from "../../components/DataTable/DataTable";
import { formatCurrency } from "../../utils";
import styles from "./ExpenseList.module.css";

const expenseDataTableColumn = [
  {
    key: "id",
    name: "ID",
  },
  {
    key: "description",
    name: "Description",
  },
  {
    key: "date",
    name: "Date",
  },
  {
    key: "amount",
    name: "Amount",
    render: (expense) => formatCurrency(expense.amount),
  },
];

function ExpenseList() {
  const history = useHistory();
  const [expenses, setExpenses] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");

  useEffect(() => {
    async function loadExpenses() {
      const response = await request("/expenses", {
        method: "GET",
      });
      if (response.ok) {
        setExpenses(camelcaseKeys(response.body));
        setLoadingStatus("loaded");
      } else {
        setLoadingStatus("error");
      }
    }

    loadExpenses();
  }, []);

  const handleRowClick = (expense) => {
    history.push(`/expenses/${expense.id}`);
  };

  switch (loadingStatus) {
    case "loading":
      return <LoadingIndicator />;
    case "error":
      return <ErrorMessage />;
    case "loaded":
      return (
        <>
          <DataTable
            data={expenses}
            columns={expenseDataTableColumn}
            onRowClick={handleRowClick}
            emptyMessage="You haven't recorded any expenses"
            rowKey="id"
          />
          <div className={styles.actions}>
            <Button to="/expenses/new">New Expense</Button>
          </div>
        </>
      );
    default:
      throw new Error(`Unexpected loadingStatus: ${loadingStatus}`);
  }
}

export default ExpenseList;
