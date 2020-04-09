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
                        <input onChange={this.props.handleChange} placeholder="Username" name="username"></input>
                        <input onChange={this.props.handleChange}  placeholder="Password" name="password" type="password"></input>
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
                    {/* IF LOGIN IS TRUE ADD RULE */}
                    <form>
                        <input onChange={this.props.handleChange} placeholder="Username" name="username"></input>
                        <input onChange={this.props.handleChange}  placeholder="Password" name="password" type="password"></input>
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
            </div>
        )
    }
}

export default withRouter(Admin)