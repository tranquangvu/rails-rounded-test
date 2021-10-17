import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

export default function Button({
  to,
  children,
  action,
  disabled,
  type = "button",
  kind = "primary",
}) {
  if (to) {
    return (
      <Link
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
          }
        }}
        to={to}
        className={styles.btn}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={() => {
        if (!disabled) {
          action && action();
        }
      }}
      className={`${styles.btn} ${disabled ? styles.disabled : ""} ${
        kind === "danger" ? styles.danger : ""
      }`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
