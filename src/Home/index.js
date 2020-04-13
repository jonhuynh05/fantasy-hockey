import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import "./home.css"

class Home extends Component{
    state = {
        imgURL: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleUpload = async (e) => {
        await fetch("/home")
    }

    render(){
        return(
            <div id="home-container">
                <div className="header" id="champion-header">
                    All Hail 2018 Champion, Evil Empire!
                </div>
                <div>
                    IMAGE OF STANLEY JR HERE
                </div>
                {/* {
                    this.props.isLoggedIn
                    ?
                    STUFF HERE
                    :
                    null
                } */}
                <div className="category-input-row">
                    <form id="category-input-form">
                        <input className="category-input" id="image-input" placeholder="Image URL" name="imgURL" value={this.state.imgURL} onChange={this.handleChange}/>
                        <button onClick={this.handleUpload}id="image-submit-button">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Home)