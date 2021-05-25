import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {

    render() {
        const { users } = this.props
        return (
            <div className='leaderboard'>
                <ul>
                    {
                        users.map((user) => (
                            <li key={user.id}>
                                <div  className='leaderboard-profile'>
                                    <img
                                        src={user.avatarURL}
                                        alt={`Avatar of ${user.name}`} 
                                        className='leaderboard-avatar'
                                    /> <hr />
                                    <div className='profile-info'>
                                        <h3>{user.name}</h3>
                                        <span style={{float: 'left'}}>Answered Question <span style={{float: 'right', marginRight: '7%'}}>{Object.keys(user.answers).length}</span> </span>
                                        <hr />
                                        <span style={{float: 'left'}}>Created Question <span style={{float: 'right', marginRight: '7%'}}>{user.questions.length}</span> </span>
                                    </div>
                                    <div className='score'>
                                        <h4 className='score-tag'>Score</h4> 
                                        <div className='score-value'>
                                            <h4>{user.score}</h4>
                                        </div> 
                                    </div> 
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users, questions }) {

    const userNames = Object.keys(users)
    const questionIds = Object.keys(questions)

    userNames.forEach(function(userName) {
        questionIds.forEach(function(id) {
            if(questions[id].author === userName && !(users[userName].questions.includes(id))) {
                users[userName].questions.push(id)
            }
        })
    })

    const score = userNames.map((userName) => users[userName].questions.length + 
    Object.keys(users[userName].answers).length)

    users = userNames.map(function(userName, idx) {
        users[userName]['score'] = score[idx] 
        return users[userName]
    })
    users.sort((a,b) => b.score - a.score)

    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)