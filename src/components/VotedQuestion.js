import React, { Component } from 'react'
import { connect } from 'react-redux'

class VotedQuestion extends Component {
    render() {
        const { question } = this.props
        return (
            <div> 
                <div className='question-header'>
                    <span>Asked by {question.name}</span>
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
                        <h2  style={{margin: '0px'}}>Results</h2><br />
                        <div className={question.voted_answer === 'one' ? 'checked' : 'unchecked'}>
                            <h4>{question.optionOne.text}</h4><br />
                            <progress max="100" value={(question.voteOne / (question.voteOne + question.voteTwo) * 100)}>
                            </progress><br />
                            <span>{question.voteOne} out of {(question.voteOne + question.voteTwo)} votes </span>
                        </div>
                        <div className={question.voted_answer === 'two' ? 'checked' : 'unchecked'} style={{marginTop: '10px'}}>
                            <h4>{question.optionTwo.text}</h4><br />
                            <progress max="100" value={(question.voteTwo / (question.voteOne + question.voteTwo) * 100)}>
                            </progress><br />
                            <span>{question.voteTwo} out of {(question.voteOne + question.voteTwo)} votes </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }, { question, user }) {
    
    question['voted_answer'] = question.optionOne.votes.includes(authedUser) ? 'one' : 'two'
    question['voteOne'] = question.optionOne.votes.length
    question['voteTwo'] = question.optionTwo.votes.length
    return {
        question,
        user,
        authedUser
    }
}

export default connect(mapStateToProps)(VotedQuestion)