import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./tradehistory.css"

class TradeHistory extends Component{
    state = {
        team: "",
        arrivals: "",
        departures: "",
        date: "",
        trades: []
    }

    async getTradeList () {
        const tradeList = await(await fetch(`/trades`)).json()
        this.setState({
            trades: tradeList
        })
    }

    async componentDidMount(){
        this.getTradeList()
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
                team: "",
                arrivals: "",
                departures: "",
                date: ""
            })
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

        const trades = this.state.trades.map((trade, i) => {
            return(
                <div key={i} id="trade-row-with-delete">
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
                            {trade.team}
                        </div>
                        <div className="category" id="arrivals">
                            {trade.arrivals}
                        </div>
                        <div className="category" id="departures">
                            {trade.departures}
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

        return(
            <div id="trade-history-container">
                <div className="header" id="trade-header">
                    League of Leagues Trades: A History
                </div>
                <div id="row-with-spacer">
                    <div className="category-header-row">
                        <div className="category" id="team">
                            Team
                        </div>
                        <div className="category" id="acquisition">
                            Arrivals
                        </div>
                        <div className="category" id="departure">
                            Departures
                        </div>
                        <div className="category" id="departure">
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
                {trades}
                {
                    this.props.isLoggedIn
                    ?
                    <div className="category-input-row">
                        <form id="category-input-form">
                            <input className="category-input" id="team-input" placeholder="Team" name="team" value={this.state.team} onChange={this.handleChange}/>
                            <input className="category-input" id="arrivals-input" placeholder="Arrivals" name="arrivals" value={this.state.arrivals} onChange={this.handleChange}/>
                            <input className="category-input" id="departures-input" placeholder="Departures" name="departures" value={this.state.departures} onChange={this.handleChange}/>
                            <input className="category-input" id="date-input" placeholder="Date" name="date" value={this.state.date} onChange={this.handleChange}/>
                            <button onClick={this.handleSubmit}id="trade-submit-button">Submit</button>
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