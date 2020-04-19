import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./drafthistory.css"
import {Dropdown} from "semantic-ui-react"

let draftMap = ""

class DraftHistory extends Component{
    state = {
        draftDetails: [],
        years: [],
        year: "",
        round: "",
        pick: "",
        team: "",
        selection: "",
        mapDetails: "",
        selectedYear: ""
    }

    async getDraftYears () {
        const yearList = await(await fetch(`/drafts`)).json()
        this.setState({
            years: yearList
        })
    }

    async getDraftDetails (){
        await fetch(`/drafts/${this.state.selectedYear}`)
        .then(async res => {
            const response = await res.json()
            this.setState({
                draftDetails: response
            })
            this.getMapDetails()
        })
    }

    async componentDidMount(){
        this.getDraftYears()
    }

    async getMapDetails () {
        draftMap = this.state.draftDetails.map((detail, i) => {
            return(
                <div key={i} className="row-with-delete">
                    <div key={i} className=
                        {
                            i%2 === 0
                            ?
                            "row-1"
                            :
                            "row-2"
                        }
                    >
                        <div className="category">
                            {detail.round}
                        </div>
                        <div className="category">
                            {detail.pick}
                        </div>
                        <div className="category">
                            {detail.team}
                        </div>
                        <div className="category">
                            {detail.selection}
                        </div>
                    </div>
                    {
                        this.props.isLoggedIn
                        ?
                        <div className="remove-button-container">
                            <button onClick={this.handleDeleteDetails} value={i} className="remove-button">Remove</button>
                        </div>
                        :
                        null
                    }
                </div>
            )
        })
        this.setState({
            mapDetails: draftMap
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.target.value
        })
    }

    handleDeleteYear = async (e) => {
        await fetch(`/drafts/${this.props.match.params.draftyear}/remove`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify(this.state.draftDetails),
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            this.props.history.push(`/draft-history`)
          })
    }

    handleDeleteDetails = async (e) => {
        await fetch(`/drafts/remove/`, {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify(this.state.draftDetails[e.currentTarget.value]),
            headers: {
              "Content-Type": "application/json"
            }
          })
        this.getDraftDetails()
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
            this.setState({
                year: "",
                round: "",
                pick: "",
                team: "",
                selection: ""
            })
            this.getDraftYears()
            this.getMapDetails()
        })
    }

    handleSelect = async (e) => {
        this.setState({
            selectedYear: e.currentTarget.firstChild.innerHTML
        })
        await fetch(`/drafts/${e.currentTarget.firstChild.innerHTML}`)
        .then(async res => {
            const response = await res.json()
            this.setState({
                draftDetails: response
            })
            this.getMapDetails()
        })
    }

    render(){

        const options = this.state.years.map((year, i) => {
            return(
                year.option
            )
        })

        return(
            <div id="draft-history-container">
                <div className="header" id="draft-header">
                    League of Leagues Drafts: A History
                </div>
                <div className="sub-header">
                    Select a year from the menu below.
                </div>
                <div className="dropdown">
                    <Dropdown
                        id="ui-dropdown"
                        onChange={this.handleSelect}
                        placeholder="Select A Year"
                        fluid
                        selection
                        options={
                            [{
                                key: "",
                                text: "Select A Year",
                                value: "",
                            },
                            ...options]
                        }
                    />
                </div>
                {
                    this.state.draftDetails.length > 0
                    ?
                    <div id="draft-year-container">
                        <div className="header" id="year-header">
                            {this.state.selectedYear}
                        </div>
                        <div className="row-with-spacer">
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
                            {
                                this.props.isLoggedIn
                                ?
                                <div id="trade-header-spacer">
                                </div>
                                :
                                null
                            }
                        </div>
                        {draftMap}
                        {
                            this.props.isLoggedIn
                            ?
                            <div className="category" id="remove-draft">
                                <button onClick={this.handleDeleteYear} className="remove-button">Remove Draft</button>
                            </div>
                            :
                            null
                        }
                    </div>
                    :
                    null
                }
                {
                    this.props.isLoggedIn
                    ?
                    <div className="category-input-row">
                        <form id="category-input-form">
                            <input className="category-input" id="round-input" placeholder="Round" name="round" value={this.state.round} onChange={this.handleChange}/>
                            <input className="category-input" id="pick-input" placeholder="Pick" name="pick" value={this.state.pick} onChange={this.handleChange} required/>
                            <input className="category-input" id="team-input" placeholder="Team" name="team" value={this.state.team} onChange={this.handleChange}/>
                            <input className="category-input" id="selection-input" placeholder="Selection" name="selection" value={this.state.selection} onChange={this.handleChange}/>
                            <input className="category-input" id="year-input" placeholder="Year" name="year" value={this.state.year} onChange={this.handleChange} required/>
                            <button onClick={this.handleSubmit}  className="submit-button" id="draft-submit-button">Submit</button>
                        </form>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default withRouter(DraftHistory)