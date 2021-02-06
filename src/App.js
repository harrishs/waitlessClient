import React, {useContext} from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import {AuthContext} from "./context/authContext";
import Layout from "./MainComponents/Layout/Layout";
import MenuEditor from "./RestaurantComponents/MenuEditor/MenuEditor";
import Login from "./MainComponents/Auth/Login";
import Register from "./MainComponents/Auth/Register";


function App() {
  const [auth, setAuth] = useContext(AuthContext);

  let routes = (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      {/* add route for main page */}
      <Redirect to="/register" />
    </Switch>
  )

  if (auth.isAuth){
    routes = (
      <Switch>
        {/* add route for logout */}
        <Route path="/" exact component={MenuEditor} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div className="App">
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

export default App;
