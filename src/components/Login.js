import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

    state= {
        authedUser: null
    }

    handleChange = (e) => {
        const authedUser = e.target.value
        this.setState({
            authedUser
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const authedUser = this.state.authedUser

        const { setAuthedUser } = this.props
        setAuthedUser(authedUser)
    }

    generateDropdownData = () => {
        const { users } = this.props

        const allUsers = Object.values(users)

        return allUsers.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { avatar: true, src: user.avatarURL }
          }));
    }

    render() {

        const { authedUser } = this.state

        const { users } = this.props

        const allUsers = Object.values(users)
        return (
            <form onSubmit={this.handleSubmit} className='login-form'>
                <div className='login-header'>
                    <h4>Welcome to the Would You Rather App!</h4>
                    <p>Please sign in to continue</p>
                </div>
                <div>
                    <img 
                        src='https://sujanbyanjankar.com.np/wp-content/uploads/2019/02/react-redux.png' 
                        alt='Login'
                        className='login-image'
                    />
                    <h3 style={{color: '#2e8b57', marginTop: '0px'}}>Sign in</h3>
                    <select name='users' onChange={this.handleChange} style={{width: '80%', height: '30px'}}>
                        <option key="null" value={null} defaultValue={true} >Select user</option>
                        {
                            allUsers.map((user) => {
                                return (
                                <option 
                                    value={user.id} 
                                    key={user.id}>
                                    {user.id}
                                </option>)
                            })
                        }
                    </select> <br />
                    <button className='login-btn' type='submit' disabled={authedUser === null ? true : false}>Sign in</button>
                </div>
            </form>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps, { setAuthedUser })(Login)