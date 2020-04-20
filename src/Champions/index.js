import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./champions.css"

class Champions extends Component{
    state = {
        recipients: [],
        recipient: "",
        year: ""
    }

    async getChampList () {
        const champList = await(await fetch(`/champions`)).json()
        this.setState({
            recipients: champList
        })
    }

    async componentDidMount(){
        this.getChampList()
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        await fetch(`/champions/new`, {
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
                recipient: "",
                year: ""
            })
            this.getChampList()
        })
    }

    handleDelete = async (e) => {
        try{
            await fetch(`/champions/remove/`, {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify(this.state.recipients[e.currentTarget.value]),
                headers: {
                  "Content-Type": "application/json"
                }
              })
            this.getChampList()
        }
        catch(err){
            console.log(err)
        }
    }


    render(){

        const champions = this.state.recipients.map((champion, i) => {
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
                        <div className="category" id="champion">
                            {champion.recipient}
                        </div>
                        <div className="category" id="winner-year">
                            {champion.year}
                        </div>
                    </div>
                    {
                        this.props.isLoggedIn
                        ?
                        <div className="remove-button-container">
                        <button onClick={this.handleDelete} value={i} className="remove-button">Remove</button>
                        </div>
                        :
                        null
                    }
                </div>
            )
        })

        return(
            <div id="champions-container">
                <div className="header" id="champions-header">
                    Stanley Jr. Recipients
                </div>
                <div className="row-with-spacer">
                    <div className="category-header-row">
                        <div className="category-col" id="recipient">
                            Recipient
                        </div>
                        <div className="category-col" id="year">
                            Year
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
                {champions}
                {
                    this.props.isLoggedIn
                    ?
                    <div className="category-input-row">
                        <form id="category-input-form">
                            <input className="category-input" id="recipient-input" placeholder="Recipient" name="recipient" value={this.state.recipient} onChange={this.handleChange} required/>
                            <input className="category-input" id="year-input" placeholder="Year" name="year" value={this.state.year} onChange={this.handleChange} required/>
                            <button onClick={this.handleSubmit} className="submit-button" id="champion-submit-button">Submit</button>
                        </form>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default withRouter(Champions)