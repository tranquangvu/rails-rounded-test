import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Notification from "../../components/Notification";
import NotificationProvider from "../../providers/NotificationProvider";
import Routes from "../../routes";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <NotificationProvider>
        <div className={styles.app}>
          <Notification />
          <NavBar />
          <main className={styles.main}>
            <Routes />
          </main>
        </div>
      </NotificationProvider>
    </Router>
  );
}

export default App;
