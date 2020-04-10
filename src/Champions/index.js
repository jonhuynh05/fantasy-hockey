import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./champions.css"

class Champions extends Component{
    state = {
        recipients: []
    }

    async componentDidMount(){
        console.log("abc")
    }


    render(){
        return(
            <div id="champions-container">
                <div className="header" id="champions-header">
                    Stanley Jr. Recipients
                </div>
                <div className="category-header-row">
                    <div className="category" id="recipient">
                        Recipient
                    </div>
                    <div className="category" id="year">
                        Year
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Champions)