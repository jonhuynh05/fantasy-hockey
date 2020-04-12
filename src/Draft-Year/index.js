import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./draftyear.css"

class DraftYear extends Component{

    state = {
        draftDetails: []
    }

    async getDraftDetails (){
        await fetch(`/drafts/${this.props.match.params.draftyear}`)
        .then(async res => {
            const response = await res.json()
            this.setState({
            draftDetails: response
            })
        })
    }

    async componentDidMount(){ 
        this.getDraftDetails()
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

    render(){
            const draftDetails = this.state.draftDetails.map((detail, i) => {
                return(
                    <div key={i} className="draft-row">
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
                        <div className="category" id="remove-button-container">
                            <button onClick={this.handleDeleteDetails} value={i} id="remove-button">Remove</button>
                        </div>
                    </div>
                )
            })
        return(
            <div id="draft-year-container">
                <div className="header" id="year-header">
                    {this.props.selectYear}
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
                {draftDetails}
                <div className="category" id="remove-button-container">
                    <button onClick={this.handleDeleteYear} id="remove-button">Remove Draft</button>
                </div>
            </div>
        )
    }
}

export default withRouter(DraftYear)