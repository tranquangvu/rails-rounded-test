import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Notifications from "../../components/Notifications";
import Routes from "../../routes";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <Notifications>
        <div className={styles.app}>
          <nav className={styles.mainNav}>
            <div className={styles.navInner}>
              <h1 className={styles.title}>Expense Tracker</h1>
              <ul>
                <li>
                  <Link to="/">Expenses</Link>
                </li>
                <li>
                  <Link to="/accounts">Accounts</Link>
                </li>
              </ul>
            </div>
          </nav>
          <main className={styles.main}>
            <Routes />
          </main>
        </div>
      </Notifications>
    </Router>
  );
}

export default App;
