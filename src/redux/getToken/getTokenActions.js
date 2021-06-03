import axios from 'axios'

import {TOKEN_REQUEST, TOKEN_SUCCESS, TOKEN_FAILURE} from './getTokenTypes'

const fetchTokenRequest = ()=>{
    return{
        type: TOKEN_REQUEST
    }
}

const fetchTokenSuccess = (token) =>{
    return{
        type: TOKEN_SUCCESS,
        payload: token
    }
}

const fetchTokenFailure = (error) =>{
    return{
        type: TOKEN_FAILURE,
        payload: error
    }
}
const savedCode = localStorage.getItem("code");

const requestOptions = {
    headers: { "Content-Type": "application/json" },
    body: {
      code: savedCode
    },
  };

export const fetchToken = () => {
    return (dispatch) => {
        dispatch(fetchTokenRequest())
        axios.post('https://deezify-app-feeder.herokuapp.com', requestOptions.body)

            .then(response => {
                const token = response.data
                console.log(token, 'token')
                dispatch(fetchTokenSuccess(token))
            }
            )
            .catch(error => {
                window.location.href = '/'
                const errorMsg = error.message
                dispatch(fetchTokenFailure(errorMsg))
            })
    }
}
// export const fetchUsers = () => async(dispatch) => {
//     console.log(requestOptions.body)
// try {
//     const data = await axios.post('http://localhost:5000', requestOptions.body)
//     console.log(data)
//     dispatch({type: 'FETCH_DATA', payload: data})
   
// } catch (error) {
//     console.log(error.message)
// }
// }