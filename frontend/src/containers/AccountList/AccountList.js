import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import request from "../../request";
import Button from "../../components/Button";
import LoadingIndicator from "../../components/LoadingIndicator";
import ErrorMessage from "../../components/ErrorMessage";
import DataTable from "../../components/DataTable/DataTable";
import { formatCurrency } from "../../utils";
import styles from "./AccountList.module.css";

const accountDataTableColumn = [
  {
    key: "id",
    name: "ID",
  },
  {
    key: "name",
    name: "Name",
  },
  {
    key: "bank_number",
    name: "Bank Number",
  },
  {
    key: "balance",
    name: "Balance",
    render: (account) => formatCurrency(account.balance),
  },
];

function AccountList() {
  const history = useHistory();
  const [accounts, setAccounts] = useState([]);
  const [loadingStatus, setStatus] = useState("loading");

  useEffect(() => {
    async function loadAccounts() {
      const response = await request("/accounts", {
        method: "GET",
      });
      if (response.ok) {
        setAccounts(response.body);
        setStatus("loaded");
      } else {
        setStatus("error");
      }
    }

    loadAccounts();
  }, []);

  const handleRowClick = (account) => {
    history.push(`/accounts/${account.id}`);
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
            data={accounts}
            columns={accountDataTableColumn}
            onRowClick={handleRowClick}
            emptyMessage="You haven't recorded any accounts"
            rowKey="id"
          />
          <div className={styles.actions}>
            <Button to="/accounts/new">New Account</Button>
          </div>
        </>
      );
    default:
      throw new Error(`Unexpected loadingStatus: ${loadingStatus}`);
  }
}

export default AccountList;
