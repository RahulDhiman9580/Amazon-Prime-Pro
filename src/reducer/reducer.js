import {combineReducers} from 'redux'

//custom imports
import {authReducer} from '../modules/onBoarding/authReducer'
import {movieReducer} from '../modules/home/movieReducer'

export default combineReducers({
    authReducer : authReducer, 
    movieReducer : movieReducer
});