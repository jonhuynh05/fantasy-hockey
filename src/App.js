import React, { Component } from 'react';
import {withRouter, Switch, Route} from "react-router-dom"
import './App.css';
import Home from "./Home"
import Admin from "./Admin"

class App extends Component {
  state={
    username: "",
    password: "",
    error: "",
    isLoggedIn: false
  }

  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  handleLogin = async(e) => {
    e.preventDefault()
    this.setState({
      error: ""
    })
    await fetch(`/admin`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(async res => {
      const response = await res.json()
      if (response.message === "Log in successful."){
        this.setState({
          isLoggedIn: true
        })
      }
      else{
        this.setState({
          error: response.message
        })
      }
      console.log(response, "this is the response")
    })
  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path={"/"} render={() => <Home />}/>
          <Route exact path={"/thecommissioner"} render={() => <Admin username={this.state.username} password={this.state.password} error={this.state.error} handleChange={this.handleChange} handleLogin={this.handleLogin}/>}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
