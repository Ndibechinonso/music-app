import Axios from 'axios'
const baseURL = 'https://muzify-api.herokuapp.com'
// Create an axios instance
const api = Axios.create({
  baseURL,
})
export default api