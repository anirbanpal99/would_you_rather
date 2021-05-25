import React, { Component } from 'react'
import NewQuestion from "./NewQuestion";
import Nav from './Nav'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import QuestionPage from './QuestionPage';
import Login from './Login';
import LoadingBar from 'react-redux-loading'

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    const { authedUser } = this.props
    return (
      <div>
        <LoadingBar />
        {
          authedUser === null
          ? <Login />
          : (<Router>
            <Nav />
              <div className='container'>
                <Route path='/' exact component={Dashboard} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/question/:id' component={QuestionPage} />
              </div>
            </Router>)
        }
        
      </div>
      
      
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App);
