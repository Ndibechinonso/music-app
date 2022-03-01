import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import Terms from "../components/Terms/Terms";
import Artists from "../pages/Artists/Artists";
import DataLoad from "../components/DataLoad/DataLoad";
import Genre from "../pages/Genre/Genre";
import Playlists from "../pages/Playlists/Playlists";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/dataload" component={DataLoad} />
      <Route path="/home" component={HomePage} />
      <Route path="/genres" component={Genre} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/artists" component={Artists} />
      <Route exact path="/" component={LoginPage} />
      <Route path="/playlists" component={Playlists} />
      <Route exact path="*" component={() => <div>Page No Found</div>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
