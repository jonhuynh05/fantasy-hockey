import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Admin extends Component{
    render(){

        const admins = this.props.allAdmin.map((admin, i) => {
            return(
                <div key={i}>
                    {admin.username}
                    <button value={i} onClick={this.props.handleRemove}>Remove</button>
                </div>
            )
        })

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
                        <button onClick={this.props.handleLogin} className="submit-button">Log In</button>
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
                        <button onClick={this.props.handleRegister} className="submit-button">Add User</button>
                    </form>
                    {
                        this.props.newAdminError === ""
                        ?
                        null
                        :
                        this.props.newAdminError
                    }
                </div>

                {
                    this.props.masterAcc === true
                    ?
                    <div>
                        DELETE USER HERE
                        {admins}
                    </div>
                    :
                    null
                }
                {admins}
            </div>
        )
    }
}

export default withRouter(Admin)