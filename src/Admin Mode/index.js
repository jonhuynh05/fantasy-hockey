import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./adminmode.css"

class AdminMode extends Component{
    render(){
        return(
            <div id="admin-mode-container">
                <div>
                    Admin mode activated. You now have Gretzky powers.
                </div>
                <button id="log-out">Log Out</button>
            </div>
        )
    }
}


export default withRouter(AdminMode)