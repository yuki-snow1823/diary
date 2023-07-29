import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
  ignoreHeaders: true
}

let baseURL: string

const productionHost = process.env.REACT_APP_PRODUCTION_HOST || '';

if (window.location.host === productionHost) {
  baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000/';
} else {
  baseURL = 'http://localhost:3000/';
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: baseURL
  }),
  options
)

export default client
