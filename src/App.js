import React, { Component } from 'react';
import {withRouter, Switch, Route} from "react-router-dom"
import './App.css';
import Home from "./Home"

class App extends Component {
  render(){
    return(
      <div>
        <Switch>
          <Route exact path={"/"} render={() => <Home />}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
