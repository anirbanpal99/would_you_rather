import React, { Component } from 'react'
import { connect } from 'react-redux'

class UnansweredQuestion extends Component {
    state = {
        isAnswered: ''
    }

    handleChange = (e) => {
        const isAnswered = e.target.value

        this.setState({
            isAnswered
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onHandleSubmit(this.state.isAnswered)

    }
    render() {
        const { isAnswered } = this.state
        const { question } = this.props
        return (
            <form onSubmit={this.handleSubmit}>
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
                        <h5  style={{margin: '0px'}}>Would you rather...</h5><br />
                        <label><input  type="radio" 
                            value={'optionOne'} 
                            checked={this.state.isAnswered === 'optionOne'} 
                            onChange={this.handleChange} name='answers'
                        /> {question.optionOne.text}
                        </label><br />
                        <label><input  type="radio" 
                            value={'optionTwo'} 
                            checked={this.state.isAnswered === 'optionTwo'}
                            onChange={this.handleChange} name='answers'
                        /> {question.optionTwo.text}
                        </label><br />
                        <button className='submit' type='submit' disabled={isAnswered === ''}>Submit</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default connect()(UnansweredQuestion)