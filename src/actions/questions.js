import { saveQuestion } from '../utils/api'
import { addQuestionToUser } from './users'
import { showLoading, hideLoading } from "react-redux-loading"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addAnswer (authedUser, qid, answer) {
    return{
        type: ADD_ANSWER,
        authedUser, 
        qid, 
        answer
    }
}

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => {dispatch(addQuestion(question)); dispatch(addQuestionToUser(question));})
        .then(() => dispatch(hideLoading()))
    }
}