import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <h1 className={styles.navTitle}>Expense Tracker</h1>
        <ul className={styles.navLink}>
          <li>
            <Link to="/">Expenses</Link>
          </li>
          <li>
            <Link to="/accounts">Accounts</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default React.memo(NavBar);
