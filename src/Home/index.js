import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./home.css"

class Home extends Component{
    render(){
        return(
            <div id="home-container">
                <div id="champion-header">
                    All Hail 2018 Champion, Evil Empire!
                </div>
                <div>
                    IMAGE OF STANLEY JR HERE
                </div>
            </div>
        )
    }
}

export default withRouter(Home)