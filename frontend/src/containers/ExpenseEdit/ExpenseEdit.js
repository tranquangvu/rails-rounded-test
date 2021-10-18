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
  accountId: null,
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
  const isEditMode = !!id;

  useEffect(
    () => {
      async function loadExpense() {
        try {
          const [accountResponse, expenseResponse] = await Promise.all([
            request("/accounts", { method: "GET" }),
            request(`/expenses/${id}`, { method: "GET" }),
          ]);

          if (accountResponse.ok && expenseResponse.ok) {
            const accounts = camelcaseKeys(accountResponse.body);
            const expense = camelcaseKeys(expenseResponse.body);

            setAccounts(accounts);
            setExpense(expense);
            setLoadingStatus("loaded");
          } else {
            setLoadingStatus("error");
          }
        } catch (error) {
          setLoadingStatus("error");
        }
      }

      if (id) {
        loadExpense();
      }
    },
    [id],
  );

  const handleSave = async (changes) => {
    try {
      setIsSaving(true);
      const url = isEditMode ? `/expenses/${expense.id}` : "/expenses";
      const method = isEditMode ? "PATCH" : "POST";
      const body = snakecaseKeys({ expense: isEditMode ? changes : { ...defaultExpenseData, ...changes } });
      const response = await request(url, {
        method,
        body,
      });
      if (response.ok) {
        setExpense(response.body);
        notify({
          message: `${isEditMode ? "Update" : "Create"} expense successfully`,
          type: "success",
        });
      } else {
        notify({
          message: "Failed to save expense. Please try again",
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
          title={`${isEditMode ? "Update" : "Create"} Expense`}
          accounts={accounts}
          expense={expense}
          onSave={handleSave}
          disabled={isSaving || isDeleting}
          onDelete={handleDelete}
        />
      );
    default:
      throw new Error(`Unexpected loadingStatus: ${loadingStatus}`);
  }
}

export default ExpenseEdit;
