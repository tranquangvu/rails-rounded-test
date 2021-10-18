import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";

import ExpenseForm from "./ExpenseForm";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingIndicator from "../../components/LoadingIndicator";
import useNotification from "../../hooks/useNotification";
import request from "../../request";

const defaultExpenseData = {
  date: new Date().toISOString().substr(0, 10),
  amount: 0,
  description: "",
  accountId: "",
};

function ExpenseEdit() {
  const { id } = useParams();
  const { notify } = useNotification();
  const [accounts, setAccounts] = useState([]);
  const [expense, setExpense] = useState(id ? null : defaultExpenseData);
  const [loadingStatus, setLoadingStatus] = useState(id ? "loading" : "loaded");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

  useEffect(
    () => {
      async function loadResources(loadExpense) {
        try {
          const [accountResponse, expenseResponse] = await Promise.all([
            request("/accounts", { method: "GET" }),
            loadExpense ? request(`/expenses/${id}`, { method: "GET" }) : null,
          ]);
          const success = accountResponse.ok && (!loadExpense || (loadExpense && expenseResponse.ok));

          if (!success) {
            setLoadingStatus("error");
            return;
          }

          setAccounts(camelcaseKeys(accountResponse?.body));
          loadExpense && setExpense(camelcaseKeys(expenseResponse?.body));
          setLoadingStatus("loaded");
        } catch (error) {
          setLoadingStatus("error");
        }
      }
      loadResources(!!id);
    },
    [id],
  );

  const handleSave = async (changes) => {
    try {
      setIsSaving(true);
      const url = expense.id ? `/expenses/${expense.id}` : "/expenses";
      const method = expense.id ? "PATCH" : "POST";
      const body = snakecaseKeys({ expense: expense.id ? changes : { ...defaultExpenseData, ...changes } });
      const response = await request(url, {
        method,
        body,
      });
      if (response.ok) {
        setExpense(response.body);
        notify({
          message: `${expense.id ? "Update" : "Create"} expense successfully`,
          type: "success",
        });
      } else {
        const errors = Object.values(response.body).flat();
        const errorsDetail = errors.join(", ");
        notify({
          message: `Failed to save expense: ${errorsDetail}. Please try again`,
          type: "error",
        });
      }
    } catch (error) {
      notify({
        message: "Failed to save expense. Please check your internet connection",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await request(`/expenses/${expense.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        history.push("/expenses");
        notify({
          message: "Delete expense successfully",
          type: "success",
        });
      } else {
        notify({
          message: "Failed to delete expense. Please try again",
          type: "error",
        });
      }
    } catch (error) {
      notify({
        message: "Failed to delete expense. Please check your internet connection",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  switch (loadingStatus) {
    case "loading":
      return <LoadingIndicator />;
    case "error":
      return <ErrorMessage />;
    case "loaded":
      return (
        <ExpenseForm
          accounts={accounts}
          expense={expense}
          onSave={handleSave}
          disabled={isSaving || isDeleting}
          onDelete={handleDelete}
        />
      );
    default:
      console.error(`Unexpected loadingStatus: ${loadingStatus}`);
      return null;
  }
}

export default ExpenseEdit;
