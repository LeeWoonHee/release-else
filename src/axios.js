// axios
import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? 'https://web.else.blue/api' : 'http://192.168.35.2:8000'
// const baseURL = 'https://api.bluepoint-oi.com'

export default axios.create({
  baseURL
  // You can add your headers here
})
