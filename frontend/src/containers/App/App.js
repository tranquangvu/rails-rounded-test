import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "../../components/NavBar";
import Notifications from "../../components/Notifications";
import NotificationsProvider from "../../providers/NotificationsProvider";
import Routes from "../../routes";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <NotificationsProvider>
        <div className={styles.app}>
          <Notifications />
          <NavBar />
          <main className={styles.main}>
            <Routes />
          </main>
        </div>
      </NotificationsProvider>
    </Router>
  );
}

export default App;
