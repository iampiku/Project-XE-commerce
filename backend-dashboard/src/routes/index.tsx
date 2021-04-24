import React from "react";
import { Route } from "react-router-dom";
import { Login, SignUp } from "../components";
import { Dashboard } from "../containers";

export function AuthenticatedRoutes() {
  console.log(`render authenticated routes`);
  return (
    <React.Fragment>
      <Route exact={true} path="/" component={Dashboard} />
    </React.Fragment>
  );
}
export function UnAuthenticatedRoutes() {
  console.log(`render unauthenticated routes`);

  return (
    <React.Fragment>
      <Route exact={true} path="/signup" component={SignUp} />
      <Route exact={true} path="/" component={Login} />
    </React.Fragment>
  );
}
