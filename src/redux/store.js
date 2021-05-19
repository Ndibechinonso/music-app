import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer'
import userDataReducer from './userData/userDataReducer'

const store = createStore(userDataReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store