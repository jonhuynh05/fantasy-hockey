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
                    <form>
                        <input onChange={this.props.handleChange} placeholder="Username" name="username"></input>
                        <input onChange={this.props.handleChange}  placeholder="Password" name="password" type="password"></input>
                        <button onClick={this.props.handleLogin}>Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Admin)