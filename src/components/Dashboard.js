import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'

class Dashboard extends Component {
    state = {
        voted: 'false',
    }

    changeVoted = (e) => {
        e.preventDefault()
        this.setState({
            voted: e.target.value
        })
    }

    render() {
        return (
            <div className='question-lists'>
                <button className={this.state.voted === 'false' ? 'activated-button' : ''} value={'false'} onClick={this.changeVoted}>Unanswered Question</button>
                <button className={this.state.voted === 'true' ? 'activated-button' : ''} value={'true'} onClick={this.changeVoted}>Answered Question</button>
                {this.state.voted === 'true'
                    ? <QuestionList voted={true}/>
                    : <QuestionList voted={false}/>
                }
            </div>
        )
    }
}

export default connect()(Dashboard)