import React, { useState } from "react";
import Button from "../../components/Button";
import styles from "./AccountForm.module.css";

function AccountForm({
  account,
  onSave,
  disabled,
  onDelete,
}) {
  const [changes, setChanges] = useState({});

  const formData = {
    ...account,
    ...changes,
  };

  const changeField = (field, value) => {
    setChanges({
      ...changes,
      [field]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(changes);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.formTitle}>
        {`${account.id ? "Update" : "Create"} Account`}
      </h1>

      <fieldset disabled={disabled ? "disabled" : undefined}>
        <div className={styles.formRow}>
          <label htmlFor="name">Name</label>
          <input
            required
            id="name"
            type="text"
            value={formData.name}
            onChange={(event) => changeField("name", event.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="bankNumber">Bank Number</label>
          <input
            required
            id="bankNumber"
            type="text"
            value={formData.bankNumber}
            onChange={(event) => changeField("bankNumber", event.target.value)}
          />
        </div>

        {account.id && (
          <div className={styles.formRow}>
            <label htmlFor="balance">Balance</label>
            <input
              required
              disabled
              id="balance"
              type="number"
              value={formData.balance}
            />
          </div>
        )}
      </fieldset>

      <div className={styles.formFooter}>
        {account.id && (
          <Button action={onDelete} kind="danger" disabled={disabled}>
            Delete
          </Button>
        )}
        <Button
          type="submit"
          disabled={Object.keys(changes).length === 0 || disabled}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default AccountForm;
