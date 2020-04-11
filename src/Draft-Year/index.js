import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./draftyear.css"

class DraftYear extends Component{
    render(){
        return(
            <div id="draft-year-container">
                <div className="header" id="year-header">
                    YEAR GOES HERE
                </div>
                <div className="category-header-row">
                    <div className="category" id="round">
                        Round
                    </div>
                    <div className="category" id="pick">
                        Pick
                    </div>
                    <div className="category" id="team">
                        Team
                    </div>
                    <div className="category" id="selection">
                        Selection
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(DraftYear)