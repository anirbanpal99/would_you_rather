import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {

    state = {
        option1: '',
        option2: '',
        toHome: false,
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { option1, option2 } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(option1, option2))

        this.setState(() => ({
            option1: '',
            option2: '',
            toHome: true
        }))
    }


    handleChangeOption1 = (e) => {
        const option1 = e.target.value

        this.setState(() => ({
            option1
        }))
    }

    handleChangeOption2 = (e) => {
        const option2 = e.target.value

        this.setState(() => ({
            option2
        }))
    }

    render() {

        const { option1, option2, toHome } = this.state

        if(toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div className='center border new-question'>
                <h3 style={{paddingBottom: 15}}>Create New Question</h3>
                <form onSubmit={this.handleSubmit}>
                    <p>Complete the question:</p>
                    <h4>Would you rather...</h4>
                    <input 
                        placeholder='Enter option one text here' 
                        value={option1}
                        className='input-text'    
                        onChange={this.handleChangeOption1}
                    />
                    <br />
                    <h5>OR</h5>
                    <input 
                        placeholder='Enter option two text here' 
                        value={option2}
                        className='input-text'    
                        onChange={this.handleChangeOption2}
                    /><br /><br />
                    <button className='btn submit' type='submit' disabled={option1 === '' || option2 === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion)