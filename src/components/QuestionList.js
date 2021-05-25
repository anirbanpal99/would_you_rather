import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { formatQuestion } from '../utils/helpers'

class QuestionList extends Component {

    render() {
        const { allQuestions } = this.props
        return (
            <div>
                <ul>
                {allQuestions.map((question) => (
                        <li key={question.id}>
                            <Question question={question}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, { voted }) {
    const questionIds = Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    const formattedQuestions = questionIds.map((id) =>
        formatQuestion(questions[id], users[questions[id].author], authedUser))
    var allQuestions = []
    formattedQuestions.map((question) => 
    question.hasVoted === voted && allQuestions.push(question))
    return {
        allQuestions: allQuestions
    }
}

export default connect(mapStateToProps)(QuestionList)