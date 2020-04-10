import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import "./navbar.css"

class NavBar extends Component{
    render(){
        return(
            <div id="navbar-container">
                <Link to="/" className="nav-link" id="home-link">
                    <div className="link-tab">
                        League of Leagues
                    </div>
                </Link>
                <Link to="/about" className="nav-link" id="about-link">
                    <div className="link-tab">
                        About
                    </div>
                </Link>
                <Link to="/champions" className="nav-link" id="champions-link">
                    <div className="link-tab">
                            Champions
                    </div>
                </Link>
                <Link to="/trade-history" className="nav-link" id="trade-link">
                    <div className="link-tab">
                            Trade History
                    </div>
                </Link>
                <Link to="/draft-history" className="nav-link" id="draft-link">
                    <div className="link-tab">
                            Draft History
                    </div>
                </Link>

            </div>
        )
    }
}

export default withRouter(NavBar)