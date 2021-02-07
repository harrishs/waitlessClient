import React, {useContext, useEffect} from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import {AuthContext} from "./context/authContext";
import Layout from "./MainComponents/Layout/Layout";
import MenuEditor from "./RestaurantComponents/MenuEditor/MenuEditor";
import Login from "./MainComponents/Auth/Login";
import Register from "./MainComponents/Auth/Register";
import Logout from "./MainComponents/Auth/Logout";


function App() {
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    //check for auth in localstorage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (token && userId && auth.isAuth === false){
      const newAuth = {
        userId,
        token,
        isAuth: true
      }
      setAuth(newAuth);
    }
  });

  let routes = (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      {/* add route for main page */}
      <Redirect to="/login" />
    </Switch>
  )

  if (auth.isAuth){
    routes = (
      <Switch>
        <Route path="/logout" exact component={Logout}/>
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
