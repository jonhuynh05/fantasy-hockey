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
                </div>
                <div id="about-teams">
                    <div id="teams-header">
                        Teams
                    </div>
                    Evil Empire - Jordan Matsunaga<br/>
                    Soft Dump in the Corner - Sasha Zanjani<br/>
                    Hands Off My Pekka - Pasha Zanjani<br/>
                    A Girl Has No Team Name - Sarah Hamada<br/>
                    Black Jesus - Alex Wong<br/>
                    It's Bill Fucking Murray - Jonathan Huynh<br/>
                    Samurai Ducks - Tobias Mahonen<br/>
                    TBD - Jesse Seilhan<br/>
                </div>              
                <div id="about-commissioner">
                    <div id="commissioner-header">
                        Current Commissioner
                    </div>
                    Jordan Matsunaga (2014 - present)
                </div>
            </div>
        )
    }
}

export default withRouter(About)