import {combineReducers} from 'redux'
import userDataReducer from './userData/userDataReducer'
import playlistReducer from './playListData/playListReducer'

 const rootReducer = combineReducers({userData: userDataReducer, playlist: playlistReducer})

 export default rootReducer