import React, { Component } from 'react';
import {withRouter, Switch, Route} from "react-router-dom"
import './App.css';
import Home from "./Home"
import Admin from "./Admin"

class App extends Component {
  state={
    username: "",
    password: "",
    newAdminUsername: "",
    newAdminPassword: "",
    error: "",
    newAdminError: "",
    isLoggedIn: false,
    masterAcc: false,
    allAdmin: []
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
    await fetch(`/admin/login`, {
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
          isLoggedIn: true,
          username: "",
          password: ""
        })
        if(response.master === true){
          this.setState({
            masterAcc: true
          })
        }
        //MAKE SURE TO UPDATE BACKENED TO ONLY GIVE MASTER ACCOUNT ACCESS TO USERS
        if(response.adminList){
          this.setState({
            allAdmin: response.adminList
          })
        }
      }
      else{
        this.setState({
          error: response.message
        })
      }
    })
  }

  handleRegister = async(e) => {
    e.preventDefault()
    this.setState({
      newAdminError: ""
    })
    await fetch(`/admin/register`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(async res => {
      const response = await res.json()
      if (response.message === "Admin created."){
        this.setState({
          newAdminError: response.message,
          newAdminUsername: "",
          newAdminPassword: ""
        })
      }
      else{
        this.setState({
          newAdminError: response.message
        })
      }
    })
  }

  render(){
    return(
      <div>
        <Switch>
          <Route exact path={"/"} render={() => <Home />}/>
          <Route exact path={"/thecommissioner"} render={() => <Admin username={this.state.username} password={this.state.password} error={this.state.error} isLoggedIn={this.state.isLoggedIn} newAdminUsername={this.state.newAdminUsername} newAdminPassword={this.state.newAdminPassword} newAdminError={this.state.newAdminError} masterAcc={this.state.masterAcc} allAdmin={this.state.allAdmin} handleChange={this.handleChange} handleLogin={this.handleLogin} handleRegister={this.handleRegister}/>}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
