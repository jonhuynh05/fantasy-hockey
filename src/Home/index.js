import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Home extends Component{
    render(){
        return(
            <div>
                <div>
                    All Hail 2018 Champion, Evil Empire!
                </div>
                <div>
                    IMAGE OF STANLEY JR HERE
                </div>
            </div>
        )
    }
}

export default withRouter(Home)