import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./drafthistory.css"
import {Dropdown} from "semantic-ui-react"

class DraftHistory extends Component{
    state = {
        years: [],
        year: "",
        round: "",
        pick: "",
        team: "",
        selection: ""
    }

    async getDraftYears () {
        const yearList = await(await fetch(`/drafts`)).json()
        this.setState({
            years: yearList
        })
    }


    async componentDidMount(){
        this.getDraftYears()
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
            this.getDraftYears()
        })
    }

    handleSelect = async (e) => {
        this.props.history.push(`/draft-history/${e.currentTarget.value}`)
      }

    render(){

        const selectYear = this.state.years.map((year, i) => {
            return(
                <option className="select-selected" key={i} value={year.year}>
                    {year.year}
                </option>
            )
        })

        return(
            <div id="draft-history-container">
                ADD A SINGLE DRAFT HERE
                <div className="header" id="draft-header">
                    League of Leagues Drafts: A History
                </div>
                <div className="custom-select">
                    <Dropdown 
                        placeholder="Select A Year"
                        fluid
                        selection
                        options={this.state.years}
                    />
                    <select onChange={this.handleSelect} placeholder="Select Year" defaultValue="">
                        <option value="" disabled hidden>Choose a year</option>
                        {selectYear}
                    </select>
                </div>
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