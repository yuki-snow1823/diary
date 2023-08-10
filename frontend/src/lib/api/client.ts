import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
  ignoreHeaders: true
}

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_ENDPOINT
    : 'http://localhost:3000/'

const client = applyCaseMiddleware(
  axios.create({
    baseURL: baseURL
  }),
  options
)

export default client
