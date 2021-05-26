import React, { Component } from 'react'
import NewQuestion from "./NewQuestion";
import Nav from './Nav'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import QuestionPage from './QuestionPage';
import Login from './Login';
import LoadingBar from 'react-redux-loading'
import NotFound from './NotFound';
import { Redirect  } from 'react-router';

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
          ? (
            <Router>
              <Route path='/' component={Login} />
            </Router>
          )
          : (<Router>
            <Nav />
              <div className='container'>
                <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/add' exact component={NewQuestion} />
                    <Route path='/leaderboard' exact component={Leaderboard} />
                    <Route path='/questions/:id' exact component={QuestionPage} />
                    <Route component={NotFound} />
                  </Switch>
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
