import {combineReducers} from 'redux'
import getTokenReducer from './getToken/getTokenReducer'
import playlistReducer from './playListData/playListReducer'
import homePageReducer from './homePageData/homePageReducer'
import userDataReducer from './userData/userDataReducer'
import artistsReducer from './artistsData/artistsDataReducer'
import playlistsPageReducer from './playlistsPageData/playlistsPageDataReducer'
import genresReducer from './genresData/genresDataReducer'
import playOnHoverReducer from './playOnHover/playOnHoverReducer'

 const rootReducer = combineReducers({userToken: getTokenReducer, userData: userDataReducer, playlist: playlistReducer, homePageData: homePageReducer, artistsData: artistsReducer, playlistsPageData: playlistsPageReducer, genresData: genresReducer, playOnHover: playOnHoverReducer})

 export default rootReducer