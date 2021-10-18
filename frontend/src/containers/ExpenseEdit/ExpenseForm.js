import React, { useState } from "react";
import Button from "../../components/Button";
import styles from "./ExpenseForm.module.css";

function ExpenseForm({
  title,
  expense,
  accounts,
  onSave,
  disabled,
  onDelete,
}) {
  const [changes, setChanges] = useState({});

  const changeField = (field, value) => {
    setChanges({
      ...changes,
      [field]: value,
    });
  };

  const formData = {
    ...expense,
    ...changes,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(changes);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.formTitle}>{title}</h1>

      <fieldset disabled={disabled ? "disabled" : undefined}>
        <div className={styles.formRow}>
          <label htmlFor="amount">Amount</label>
          <input
            required
            min="0"
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(event) => changeField("amount", event.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="date">Date</label>
          <input
            required
            id="date"
            type="date"
            value={formData.date}
            onChange={(event) => changeField("date", event.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="description">Description</label>
          <input
            required
            id="description"
            type="text"
            value={formData.description}
            onChange={(event) => changeField("description", event.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="accountId">Account</label>
          <select
            required
            id="accountId"
            value={formData.accountId}
            onChange={(event) => changeField("accountId", event.target.value)}
          >
            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <div className={styles.formFooter}>
        {expense.id && (
          <Button action={onDelete} kind="danger" disabled={disabled}>
            Delete
          </Button>
        )}
        <Button type="submit" disabled={Object.keys(changes).length === 0 || disabled}>
          Save
        </Button>
      </div>
    </form>
  );
}

export default ExpenseForm;
