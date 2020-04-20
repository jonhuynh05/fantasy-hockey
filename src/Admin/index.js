import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import "./admin.css"

class Admin extends Component{

    render(){

        const admins = this.props.allAdmin.map((admin, i) => {
            return(
                <div key={i} className="row-with-delete" id="registered-admins-container">
                    <div key={i} className=
                        {
                            i%2 === 0
                            ?
                            "row-1"
                            :
                            "row-2"
                        }
                        id="registered-rows"
                    >
                        <div className="category" id="registered-admins">
                            {admin.username}
                        </div>
                    </div>
                    <div className="remove-button-container" id="admin-remove-button-container">
                        <button className="remove-button" value={i} onClick={this.props.handleRemove}>Remove</button>
                    </div>
                </div>
            )
        })

        return(
            <div>
                {
                    this.props.isLoggedIn
                    ?
                    null
                    :
                    <>
                        <div className="admin-header">
                            Are you an Admin? Prove it below.
                        </div>
                        <div id="login-form">
                            <form>
                                <input className="admin-input" onChange={this.props.handleChange} placeholder="Username" name="username" value={this.props.username}></input>
                                <input className="admin-input" onChange={this.props.handleChange}  placeholder="Password" name="password" type="password" value={this.props.password}></input>
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
                        <div id="register-form">
                            <form>
                                <input className="admin-input" onChange={this.props.handleChange} placeholder="Username" name="newAdminUsername" value={this.props.newAdminUsername}></input>
                                <input className="admin-input" onChange={this.props.handleChange}  placeholder="Password" name="newAdminPassword" type="password" value={this.props.newAdminPassword}></input>
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
                    </>
                }
                {
                    this.props.masterAcc === true
                    ?
                    <>
                        <div className="admin-header">
                            Update Password
                        </div>
                        <div id="register-form">
                            <form>
                                <input className="admin-input" onChange={this.props.handleChange} placeholder="New Password" name="updatePassword"
                                type="password" value={this.props.updatePassword}></input>
                                <input className="admin-input" onChange={this.props.handleChange} placeholder="Old Password" name="confirmPassword" type="password" value={this.props.confirmPassword}></input>
                                <button onClick={this.props.handleUpdatePassword} className="submit-button">Confirm</button>
                            </form>
                            {
                                this.props.updatePasswordError === ""
                                ?
                                null
                                :
                                this.props.updatePasswordError
                            }
                        </div>
                        <div className="admin-header">
                            Register More Admins
                        </div>
                        <div id="register-form">
                            <form>
                                <input className="admin-input" onChange={this.props.handleChange} placeholder="Username" name="newAdminUsername" value={this.props.newAdminUsername}></input>
                                <input className="admin-input" onChange={this.props.handleChange}  placeholder="Password" name="newAdminPassword" type="password" value={this.props.newAdminPassword}></input>
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
                        {admins}
                    </>
                    :
                    null
                }
            </div>
        )
    }
}

export default withRouter(Admin)