import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

    handleLogout = (e) => {
        e.preventDefault()

        this.props.setAuthedUser(null)
    }

    render() {
        const { user } = this.props
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active' style={{textDecoration: 'none', color: 'black'}}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' exact activeClassName='active' style={{textDecoration: 'none', color: 'black'}}>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' exact activeClassName='active' style={{textDecoration: 'none', color: 'black'}}>
                            Leader Board
                        </NavLink>
                    </li>
                    <li>
                        <label className='nav-profile'>
                            Hello, {user.name}
                            <img className='nav-image' src={user.avatarURL} alt={user.name}/>
                        </label>
                    </li>
                    <li>
                        <button className='logout' style={{textDecoration: 'none', color: 'black', textAlign: 'center'}} onClick={this.handleLogout}>
                            <Redirect to='/'/>
                            Logout
                        </button>
                    </li>
                </ul>
                <hr className='nav-line'/>
            </nav>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        authedUser,
        user: (Object.values(users).filter((user) => user.id === authedUser && user))[0]
    }
}

export default connect( mapStateToProps, { setAuthedUser })(Nav)