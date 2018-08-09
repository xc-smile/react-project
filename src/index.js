import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {HashRouter,Route,Switch} from "react-router-dom";

import store from "./redux/store/store"
import Register from "./containers/register/register"
import Main from "./containers/main/main"
import Login from "./containers/login/login"
import "./assets/style.less"

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route component={Main}/>
      </Switch>
    </HashRouter>
  </Provider>
,document.getElementById("root"))