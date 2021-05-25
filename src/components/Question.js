import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
    render() {

        const { question} = this.props
        return (
            <div className='question'>
                    <div className='question-header'>
                        <span>{question.name} asks: </span>
                    </div>
                    <hr style={{margin: '0px'}}/>
                    <div className='question-body'>
                        <img
                            src={question.avatar}
                            alt={`Avatar of ${question.name}`}
                            className='avatar'
                        />
                        <hr style={{margin: '0px', marginLeft: '15px', marginRight: '5px'}}/>
                        <div className='question-info'>
                            <h5  style={{margin: '0px'}}>Would you rather</h5><br />
                            <span>...{question.optionOne.text}...</span> <br />
                            <Link to={`/question/${question.id}`} className="poll-view">
                                {/* <button className='btn'> */}
                                    View Poll
                                {/* </button> */}
                            </Link>
                        </div>
                    </div>
            </div>
        )
    }
}


export default withRouter(connect()(Question))