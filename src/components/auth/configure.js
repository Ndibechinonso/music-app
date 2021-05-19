import Axios from 'axios'
const baseURL = 'http://localhost:5000'
// Create an axios instance
const api = Axios.create({
  baseURL,
})
export default api