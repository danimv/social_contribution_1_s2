import React, { Component } from "react";

import {  HashRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import Navbar from "./components/layout/Navbar";
import PostForm from "./components/posts/PostFormUnic";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Test from "./components/layout/Test";
import Login from "./components/auth/Login";
import Redux from "./components/posts/Redux";
import Register from "./components/auth/Register";
import Profile from "./components/profile/Profile";
import Profiles from "./components/profiles/Profiles";
import Post from "./components/post/Post";
import Posts from "./components/posts/Posts";
import Stats from "./components/dashboard/Stats";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import AddExperience from "./components/addCredentials/AddExperience";
import AddEducation from "./components/addCredentials/AddEducation";
import EditProfile from "./components/edit-profile/EditProfile";
import NotFound from "./components/not-found/NotFound";
import PrivateRoute from "./components/common/PrivateRoute";

import "./App.css";

// check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());

    // clear current profile
    store.dispatch(clearCurrentProfile());

    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/test" component={Test} />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/form" component={PostForm} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/stats"
                  component={Stats}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/config"
                  component={Stats}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
