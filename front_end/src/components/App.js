/* eslint-disable */

import React, { Component} from "react";
import { Switch, Route} from "react-router-dom";
import { Main, Auth, TimeLine, Profile, NotFound, FeedPage } from "../pages";
import BaseContainer from "../containers/BaseContainer";

class App extends Component {
  render(){
    return (
      <div>
        <BaseContainer />
        <Switch>
          <Route path="/" exact={true} component={TimeLine}></Route>
          <Route path="/auth/:kind" exact={true} component={Auth}></Route>
          <Route path="/Profile" exact={true} component={Profile}></Route>
          <Route path="/FeedPage/:feedId" exact={true} component={FeedPage}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;