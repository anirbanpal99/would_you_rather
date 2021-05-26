import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'

class NotFound extends Component {
    render() {
        return (
            <div className='not-found'>
                <p>404</p>
                <h1>Oops! This page does not exist</h1>
                <Link to='/' className='back'>
                    <span><IoMdArrowRoundBack /> Go Back</span>
                </Link>
            </div>
        )
    }
}

export default connect()(NotFound)