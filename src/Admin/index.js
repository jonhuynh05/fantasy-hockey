import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Admin extends Component{
    render(){
        return(
            <div>
                <div>
                    Are you the commish? Log in below.
                </div>
                <div>
                    {/* IF LOGIN IS TRUE ADD RULE */}
                    <form>
                        <input onChange={this.props.handleChange} placeholder="Username" name="username" value={this.props.username}></input>
                        <input onChange={this.props.handleChange}  placeholder="Password" name="password" type="password" value={this.props.password}></input>
                        <button onClick={this.props.handleLogin}>Log In</button>
                    </form>
                    {
                        this.props.error === ""
                        ?
                        null
                        :
                        this.props.error
                    }
                </div>
                <div>
                    Register More Admins
                </div>
                <div>
                    {/* IF LOGIN IS TRUE ADD RULE */}
                    <form>
                        <input onChange={this.props.handleChange} placeholder="Username" name="newAdminUsername" value={this.props.newAdminUsername}></input>
                        <input onChange={this.props.handleChange}  placeholder="Password" name="newAdminPassword" type="password" value={this.props.newAdminPassword}></input>
                        <button onClick={this.props.handleRegister}>Add User</button>
                    </form>
                    {
                        this.props.newAdminError === ""
                        ?
                        null
                        :
                        this.props.newAdminError
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Admin)