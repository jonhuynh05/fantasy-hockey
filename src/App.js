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
import DraftYear from './Draft-Year';

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
    allAdmin: [],
    selectYear: "",
    draftDetails: []

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

  async getDraftDetails () {
    const details = await fetch(`/drafts/${this.state.selectYear}`)
    // console.log(details)
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

  handleSelect = async (e) => {
    this.setState({
        selectYear: e.currentTarget.value
    })
    await fetch(`/drafts/${e.currentTarget.value}`)
    .then(async res => {
      const response = await res.json()
      this.setState({
        draftDetails: response
      })
      this.props.history.push(`/draft-history/${this.state.selectYear}`)
    })
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
          <Route exact path={"/about"} render={() => <About />}/>
          <Route exact path={"/champions"} render={() => <Champions />}/>
          <Route exact path={"/trade-history"} render={() => <TradeHistory />}/>
          <Route exact path={"/draft-history"} render={() => <DraftHistory selectYear={this.state.selectYear} getDraftDetails={this.state.getDraftDetails} handleSelect={this.handleSelect}/>}/>
          <Route exact path={`/draft-history/:draftyear`} render={() => <DraftYear draftDetails={this.state.draftDetails} selectYear={this.state.selectYear}/>}/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
