import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./drafthistory.css"
import DraftYear from "../Draft-Year"

class DraftHistory extends Component{
    state = {
        years: [],
        year: "",
        round: "",
        pick: "",
        team: "",
        selection: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        await fetch(`/drafts/new`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(this.state),
            headers: {
              "Content-Type": "application/json"
            }
        })
        .then(async res => {
            const response = await res.json()
            console.log(response)
            this.setState({
                year: "",
                round: "",
                pick: "",
                team: "",
                selection: ""
            })
            // this.getChampList()
        })
    }

    render(){
        return(
            <div id="draft-history-container">
                ADD A SINGLE DRAFT HERE
                <div className="header" id="draft-header">
                    League of Leagues Drafts: A History
                </div>
                <DraftYear />
                <div className="category-input-row">
                    <form id="category-input-form">
                        <input className="category-input" id="round-input" placeholder="Round" name="round" value={this.state.round} onChange={this.handleChange}/>
                        <input className="category-input" id="pick-input" placeholder="Pick" name="pick" value={this.state.pick} onChange={this.handleChange}/>
                        <input className="category-input" id="team-input" placeholder="Team" name="team" value={this.state.team} onChange={this.handleChange}/>
                        <input className="category-input" id="selection-input" placeholder="Selection" name="selection" value={this.state.selection} onChange={this.handleChange}/>
                        <input className="category-input" id="year-input" placeholder="Year" name="year" value={this.state.year} onChange={this.handleChange}/>
                        <button onClick={this.handleSubmit}id="draft-submit-button">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(DraftHistory)