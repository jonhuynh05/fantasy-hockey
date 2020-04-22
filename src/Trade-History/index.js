import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./tradehistory.css"

let tradesMap = ""

class TradeHistory extends Component{
    state = {
        number: "",
        team1: "",
        team2: "",
        acquisition1: "",
        acquisition2: "",
        date: "",
        trades: [],
        tradeDetails: ""
    }

    async getTradeList () {
        const tradeList = await(await fetch(`/trades`)).json()
        this.setState({
            trades: tradeList,
            number: Number(tradeList.length + 1)
        })
        this.getMapDetails()
    }

    async componentDidMount(){
        this.getTradeList()
    }


    async getMapDetails () {
        tradesMap = this.state.trades.map((trade, i) => {
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
                        <div className="category" id="team">
                            {trade.team1}
                        </div>
                        <div className="category" id="arrivals">
                            {trade.acquisition1}
                        </div>
                        <div className="category" id="departures">
                            {trade.acquisition2}
                        </div>
                        <div className="category" id="departures">
                            {trade.team2}
                        </div>
                        <div className="category" id="date">
                            {trade.date}
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
        this.setState({
            tradeDetails: tradesMap
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        await fetch(`/trades/new`, {
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
                team1: "",
                team2: "",
                acquisition1: "",
                acquisition2: "",
                date: "",
            })
            this.getMapDetails()
            this.getTradeList()
        })
    }

    handleDelete = async (e) => {
        try{
            await fetch(`/trades/remove/`, {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify(this.state.trades[e.currentTarget.value]),
                headers: {
                  "Content-Type": "application/json"
                }
              })
            this.getTradeList()
        }
        catch(err){
            console.log(err)
        }
    }

    render(){
        return(
            <div id="trade-history-container">
                <div className="header" id="trade-header">
                    League of Leagues Trades: A History
                </div>
                <div className="row-with-spacer">
                    <div className="category-header-row">
                        <div className="category-col" id="team">
                            Team
                        </div>
                        <div className="category-col" id="acquisition">
                            Acquisition
                        </div>
                        <div className="category-col" id="acquisition">
                            Acquisition
                        </div>
                        <div className="category-col" id="team">
                            Team
                        </div>
                        <div className="category-col" id="departure">
                            Date
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
                {tradesMap}
                {
                    this.props.isLoggedIn
                    ?
                    <div className="category-input-row">
                        <form id="category-input-form">
                            <input className="category-input" id="team-input" placeholder="Trade Number" name="number" value={this.state.number} required/>
                            <input className="category-input" id="team-input" placeholder="Team 1" name="team1" value={this.state.team1} onChange={this.handleChange} required/>
                            <input className="category-input" id="arrivals-input" placeholder="Acquisition 1" name="acquisition1" value={this.state.acquisition1} onChange={this.handleChange} required/>
                            <input className="category-input" id="arrivals-input" placeholder="Acquisition 2" name="acquisition2" value={this.state.acquisition2} onChange={this.handleChange} required/>
                            <input className="category-input" id="team-input" placeholder="Team 2" name="team2" value={this.state.team2} onChange={this.handleChange} required/>
                            <input className="category-input" id="date-input" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange} required/>
                            <button onClick={this.handleSubmit}className="submit-button" id="trade-submit-button">Submit</button>
                        </form>
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default withRouter(TradeHistory)