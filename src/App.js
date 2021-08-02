import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/layout/Header"
import TargetsList from "./components/pages/target-list/index";
import EditTarget from "./components/pages/edit-target"
import CreateTarget from "./components/pages/create-target"
import CreateUser from "./components/pages/create-user"
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import ThemeColor from "./components/changeThemeColor/theme";
import NewFeatures from "./components/pages/new-features/index"

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "https://mernfirstapp.herokuapp.com/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token}}
      );
      if (tokenRes.data){
        const userRes = await Axios.get("https://mernfirstapp.herokuapp.com/users/",
         {headers: {"x-auth-token": token},
        });
        setUserData({
          token,
          user: userRes.data,
        })
      }
    };

    checkLoggedIn();
  }, [])

  return (
    <>
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
          <Header />
          <ThemeColor/>
          <div className="container">
            <Switch>
              <Route path="/" exact component={TargetsList} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/edit/:id" component={EditTarget} />
              <Route path="/create" component={CreateTarget} />
              <Route path="/user" component={CreateUser} />
              <Route path="/new-features" component={NewFeatures}/>
            </Switch>
          </div>
        </UserContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
