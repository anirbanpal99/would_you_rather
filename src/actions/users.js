import { saveQuestionAnswer } from '../utils/api';
import { addAnswer } from '../actions/questions';
import { showLoading, hideLoading } from "react-redux-loading"

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function addQuestionToUser({ id, author }) {
    return {
      type: ADD_QUESTION_TO_USER,
      id,
      author
    };
}

export function addAnswerToUser (authedUser, qid, answer) {
    return{
        type: ADD_ANSWER_TO_USER,
        authedUser, 
        qid, 
        answer
    }
}

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
    return dispatch => {

      dispatch(showLoading())
    
      dispatch(addAnswerToUser(authedUser, qid, answer));
      dispatch(addAnswer(authedUser, qid, answer));
  
      return saveQuestionAnswer({authedUser, qid, answer})
      .then(() => dispatch(hideLoading()))

    };
  }