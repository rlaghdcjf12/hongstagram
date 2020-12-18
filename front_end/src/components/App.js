import React, { Component} from "react";
import { Switch, Route} from "react-router-dom";
import { Main, Auth, NotFound } from "../pages";
import BaseContainer from "../containers/BaseContainer";

class App extends Component {
  render(){
    return (
      <div>
        <Switch>
          <Route path="/" exact={true} component={Main}></Route>
          <Route path="/auth/:kind" exact={true} component={Auth}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        <BaseContainer />
      </div>
    );
  }
}

export default App;