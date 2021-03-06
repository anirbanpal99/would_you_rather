import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import VotedQuestion from './VotedQuestion'
import { handleSaveQuestionAnswer } from '../actions/users'
import UnansweredQuestion from './UnansweredQuestion'
import { Redirect } from 'react-router'

class QuestionPage extends Component {

    handleSubmit = (answer) => {
        const { dispatch, question, authedUser } = this.props
        const qid = question.id
        dispatch(handleSaveQuestionAnswer(authedUser, qid, answer))

    }

    render() {
        const { id, question, user, questionIds } = this.props

        return (
            questionIds.includes(id) 
            ?
            <div className="single-question">
                {
                    question.length !== 0 &&
                        question.hasVoted === false
                        && 
                        <UnansweredQuestion question={question} onHandleSubmit={this.handleSubmit}/>
                }
                {
                    question.length !== 0 &&
                        question.hasVoted === true
                        &&
                        <VotedQuestion question={question} user={user}/>
                }
            </div>
            : <Redirect to='/error'/>
        )
    }
}

function mapStateToProps ({authedUser, questions, users}, props) {
    const { id } = props.match.params
    const question = !questions[id]
    ? []
    :formatQuestion(questions[id], users[questions[id].author], authedUser)
    const originalQuestion = !questions[id]
    ? []
    : questions[id]
    return {
        id,
        question,
        authedUser,
        user: users[authedUser],
        originalQuestion,
        questionIds: Object.keys(questions)
    }
}

export default connect(mapStateToProps)(QuestionPage)