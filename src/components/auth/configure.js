import Axios from 'axios'
const baseURL = 'https://music-app-feeder.herokuapp.com'
// Create an axios instance
const api = Axios.create({
  baseURL,
})
export default api