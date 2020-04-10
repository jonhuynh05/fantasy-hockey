import React, { Component } from 'react';
import {withRouter, Switch, Route} from "react-router-dom"
import './App.css';
import AdminMode from "./Admin Mode"
import NavBar from "./NavBar"
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

  async getAdminList () {
    try{
      const response = await( await fetch(`/admin/adminList`)).json()
      this.setState({
        allAdmin: response.adminList
      })
    }
    catch(err){
      console.log(err)
    }
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

  handleLogout = async() => {
    await fetch(`/admin/logout`)
    .then(async res => {
      this.setState({
        username: "",
        password: "",
        newAdminUsername: "",
        newAdminPassword: "",
        error: "",
        newAdminError: "",
        isLoggedIn: false,
        masterAcc: false,
        allAdmin: []
      })
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
        this.getAdminList()
      }
      else{
        this.setState({
          newAdminError: response.message
        })
      }
    })
  }

  handleRemove = async (e) => {
    try{
      await fetch(`/admin/remove/`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(this.state.allAdmin[e.currentTarget.value]),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(async res => {
        this.getAdminList()
      })
    }
    catch(err){
      console.log(err)
    }
  }

  render(){
    return(
      <div>
        {
          this.state.isLoggedIn === true
          ?
          <AdminMode handleLogout={this.handleLogout}/>
          :
          null
        }
        <NavBar />
        <Switch>
          <Route exact path={"/"} render={() => <Home />}/>
          <Route exact path={"/thecommissioner"} render={() => <Admin username={this.state.username} password={this.state.password} error={this.state.error} isLoggedIn={this.state.isLoggedIn} newAdminUsername={this.state.newAdminUsername} newAdminPassword={this.state.newAdminPassword} newAdminError={this.state.newAdminError} masterAcc={this.state.masterAcc} allAdmin={this.state.allAdmin} handleChange={this.handleChange} handleLogin={this.handleLogin} handleRegister={this.handleRegister} handleRemove={this.handleRemove}/>}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
