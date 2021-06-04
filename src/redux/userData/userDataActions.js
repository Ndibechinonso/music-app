import axios from 'axios'

import {USER_DATA_REQUEST, USER_DATA_SUCCESS, USER_DATA_FAILURE} from './userDataTypes'

const fetchUserRequest = ()=>{
    return{
        type: USER_DATA_REQUEST
    }
}

const fetchUserSuccess = (user) =>{
    return{
        type: USER_DATA_SUCCESS,
        payload: user
    }
}

const fetchUserFailure = (error) =>{
    return{
        type: USER_DATA_FAILURE,
        payload: error
    }
}

const savedToken = localStorage.getItem("token");
console.log(savedToken, 'savedToken')
const requestOptions = {
    headers: { "Content-Type": "application/json" },
    body: {
      code: savedToken
    },
  };

export const fetchUsers = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(fetchUserRequest()) 
        }, 2000); 
        axios.post('https://deezify-app-feeder.herokuapp.com/navbar', requestOptions.body)

            .then(response => {
                const users = response.data
                console.log(users, 'data')
                dispatch(fetchUserSuccess(users))

            }
            )
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchUserFailure(errorMsg))
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