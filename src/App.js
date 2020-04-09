import React, { Component } from 'react';
import {withRouter, Switch, Route} from "react-router-dom"
import './App.css';
import Home from "./Home"
import Admin from "./Admin"

class App extends Component {
  state={
    username: "",
    password: ""
  }

  handleChange =(e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path={"/"} render={() => <Home />}/>
          <Route exact path={"/thecommissioner"} render={() => <Admin username={this.state.username} password={this.state.password} handleChange={this.handleChange}/>}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
