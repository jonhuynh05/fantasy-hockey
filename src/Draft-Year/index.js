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
                {/* <div className="category-input-row">
                    <form id="category-input-form">
                        <input className="category-input" id="team-input" placeholder="Team" name="team" value={this.state.team} onChange={this.handleChange}/>
                        <input className="category-input" id="arrivals-input" placeholder="Arrivals" name="arrivals" value={this.state.arrivals} onChange={this.handleChange}/>
                        <input className="category-input" id="departures-input" placeholder="Departures" name="departures" value={this.state.departures} onChange={this.handleChange}/>
                        <input className="category-input" id="date-input" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange}/>
                        <button onClick={this.handleSubmit}id="trade-submit-button">Submit</button>
                    </form>
                </div> */}
            </div>
        )
    }
}

export default withRouter(DraftYear)