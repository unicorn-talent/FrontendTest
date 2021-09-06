import React from "react";
import { Redirect, Route } from "react-router-dom";
import Authentication from "./auth.service";

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const user = Authentication();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
