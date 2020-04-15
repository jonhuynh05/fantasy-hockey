import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import "./navbar.css"

class NavBar extends Component{

    state = {
        width: window.innerWidth,
        open: false
    }

    updateWindowSize = () => {
        this.setState({
            width: window.innerWidth
        })
    }

    async componentDidMount(){
        window.addEventListener("resize", this.updateWindowSize)
    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render(){
        return(
            <>
                {
                    this.state.width <= 720
                    ?
                    <div id="mobile-nav-container">
                        <div id="mobile-top-row">
                            <div id="mobile-header">
                                L x L
                            </div>
                            <div id="hamburger-stack" onClick={this.handleOpen}>
                                <div className="hamburger-bars"></div>
                                <div className="hamburger-bars"></div>
                                <div className="hamburger-bars"></div>
                            </div>
                        </div>
                        <div id=
                            {

                                this.state.open
                                ?
                                "navbar-mobile-menu-open"
                                :
                                "navbar-mobile-menu"
                            
                            }
                        >
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
                    </div>
                    :
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
                }
            </>
        )
    }
}

export default withRouter(NavBar)