import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./about.css"

class About extends Component {
    render(){
        return(
            <div id="about-container">
                <div className="header" id="about-header">
                    What is the League of Leagues?
                </div>
                <div id="about-description">
                    The League of Leagues is a fantasy hockey league that was started in 2014. Originally a 6-team league, the League of Leagues expanded to 8 teams in 2017.

                    Current Commissioner: Jordan Matsunaga (2014 - present)
                </div>
            </div>
        )
    }
}

export default withRouter(About)