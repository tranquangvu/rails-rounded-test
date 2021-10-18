import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ExpenseList from "../containers/ExpenseList";
import ExpenseEdit from "../containers/ExpenseEdit";
import AccountList from "../containers/AccountList";
import AccountEdit from "../containers/AccountEdit";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/expenses" />
      </Route>
      <Route exact path="/expenses">
        <ExpenseList />
      </Route>
      <Route exact path="/expenses/new">
        <ExpenseEdit />
      </Route>
      <Route exact path="/expenses/:id">
        <ExpenseEdit />
      </Route>
      <Route exact path="/accounts">
        <AccountList />
      </Route>
      <Route exact path="/accounts/new">
        <AccountEdit />
      </Route>
      <Route exact path="/accounts/:id">
        <AccountEdit />
      </Route>
    </Switch>
  );
}

export default Routes;
