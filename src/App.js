import React, { Component } from 'react';
import {withRouter, Switch, Route} from "react-router-dom"
import './App.css';
import AdminMode from "./Admin Mode"
import NavBar from "./NavBar"
import Home from "./Home"
import Admin from "./Admin"
import About from "./About"
import Champions from "./Champions"
import TradeHistory from "./Trade-History"
import DraftHistory from "./Draft-History"

class App extends Component {
  state={
    username: "",
    password: "",
    updatePassword: "",
    confirmPassword: "",
    updatePasswordError: "",
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
      if(response.master === true){
        this.setState({
          masterAcc: true
        })
      }
      if(response.adminList){
        this.setState({
          allAdmin: response.adminList
        })
      }
      if(response.message === "Log in successful." && this.state.masterAcc === false){
        this.setState({
          isLoggedIn: true,
          username: "",
          password: ""
        })
        this.props.history.push("/")
      }
      if(response.message === "Log in successful." && this.state.masterAcc === true){
        this.setState({
          isLoggedIn: true,
          username: "",
          password: ""
        })
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

  handleUpdatePassword = async(e) => {
    e.preventDefault()
    this.setState({
      updatePasswordError: ""
    })
    await fetch(`/admin/edit`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        updatePassword: this.state.updatePassword,
        confirmPassword: this.state.confirmPassword
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(async res => {
      const response = await res.json()
      if(response.message === "Admin updated."){
        this.setState({
          updatePasswordError: response.message,
          updatePassword: "",
          confirmPassword: ""
        })
      }
      else{
        this.setState({
          updatePasswordError: response.message
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
          <Route exact path={"/"} render={() => <Home isLoggedIn={this.state.isLoggedIn}/>}/>
          <Route exact path={"/thecommissioner"} render={() => <Admin username={this.state.username} password={this.state.password} error={this.state.error} isLoggedIn={this.state.isLoggedIn} updatePassword={this.state.updatePassword} confirmPassword={this.state.confirmPassword} updatePasswordError={this.state.updatePasswordError} handleUpdatePassword={this.handleUpdatePassword} newAdminUsername={this.state.newAdminUsername} newAdminPassword={this.state.newAdminPassword} newAdminError={this.state.newAdminError} masterAcc={this.state.masterAcc} allAdmin={this.state.allAdmin} handleChange={this.handleChange} handleLogin={this.handleLogin} handleRegister={this.handleRegister} handleRemove={this.handleRemove}/>}/>
          <Route exact path={"/about"} render={() => <About isLoggedIn={this.state.isLoggedIn}/>}/>
          <Route exact path={"/champions"} render={() => <Champions isLoggedIn={this.state.isLoggedIn}/>}/>
          <Route exact path={"/trade-history"} render={() => <TradeHistory isLoggedIn={this.state.isLoggedIn}/>}/>
          <Route exact path={"/draft-history"} render={() => <DraftHistory isLoggedIn={this.state.isLoggedIn}/>}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
