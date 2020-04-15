import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import "./navbar.css"

class NavBar extends Component{

    state = {
        width: window.innerWidth
    }

    updateWindowSize = () => {
        this.setState({
            width: window.innerWidth
        })
    }

    async componentDidMount(){
        window.addEventListener("resize", this.updateWindowSize)
    }

    render(){
        return(
            <div id="navbar-container">
                {
                    this.state.width < 720
                    ?
                    <div id="hamburger-stack" onClick={this.handleClose}>
                        <div className="hamburger-bars"></div>
                        <div className="hamburger-bars"></div>
                        <div className="hamburger-bars"></div>
                    </div>
                    :
                    <>
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
                    </>
                }
            </div>
        )
    }
}

export default withRouter(NavBar)