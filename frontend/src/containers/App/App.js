import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Notification from "../../components/Notification";
import NotificationProvider from "../../providers/NotificationProvider";
import Routes from "../../routes";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <NotificationProvider>
        <Notification />
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
      </NotificationProvider>
    </Router>
  );
}

export default App;
