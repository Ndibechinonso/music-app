import {combineReducers} from 'redux'
import userDataReducer from './userData/userDataReducer'

 const rootReducer = combineReducers({userData: userDataReducer})

 export default rootReducer