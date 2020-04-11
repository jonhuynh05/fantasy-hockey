import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./drafthistory.css"
import DraftYear from "../Draft-Year"

class DraftHistory extends Component{
    state = {
        years: []
    }
    render(){
        return(
            <div id="draft-history-container">
                ADD A SINGLE DRAFT HERE
                <div className="header" id="draft-header">
                    League of Leagues Drafts: A History
                </div>
                <DraftYear />
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

export default withRouter(DraftHistory)