import {FETCH_PAYLIST_REQUEST, FETCH_PAYLIST_SUCCESS, FETCH_PAYLIST_FAILURE} from './playListDataTypes'
import {fetchUsers} from '../userData/userDataAction'
import axios from 'axios'

const fetchDataRequest = () =>{
   return {type: FETCH_PAYLIST_REQUEST
}
}
const fetchDataSuccess = (playlist) =>{
return {type: FETCH_PAYLIST_SUCCESS,
payload: playlist
}
}

const fetchDataFailure = (error) =>{
 return{
     type: FETCH_PAYLIST_FAILURE,
     payload: error
 }
}

const tracklistUrl = localStorage.getItem("playlistUrl")
const requestOptions2 = {
    headers: { "Content-Type": "application/json" },
    body: {
      tracklist: tracklistUrl

    },
  };


  export const fetchPlaylist =  (url) => {
      if(fetchUsers && tracklistUrl){
    return (dispatch) => {
     dispatch(fetchDataRequest())
        axios.post('https://music-app-feeder.herokuapp.com/users', {
            tracklist: url
          })

            .then(response => {
                const playlist = response.data
                console.log(playlist.data, "playlistdata")
                dispatch(fetchDataSuccess(playlist.data))
            }
            )
            .catch(error => {
              
                const errorMsg = error.message
                dispatch(fetchDataFailure(errorMsg))
            })
    }
}}