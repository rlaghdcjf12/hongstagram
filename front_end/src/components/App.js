import React, { Component} from "react";
import { Switch, Route} from "react-router-dom";
import { Main, Auth, TimeLine, NotFound } from "../pages";
import BaseContainer from "../containers/BaseContainer";

class App extends Component {
  render(){
    return (
      <div>
        <BaseContainer />
        <Switch>
          <Route path="/" exact={true} component={Main}></Route>
          <Route path="/auth/:kind" exact={true} component={Auth}></Route>
          <Route path="/TimeLine" exact={true} component={TimeLine}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;