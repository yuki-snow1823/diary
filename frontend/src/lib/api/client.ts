import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
  ignoreHeaders: true
}

// TODO: 本番環境でも動くようにする
const client = applyCaseMiddleware(
  axios.create({
    baseURL: 'http://localhost:3000/'
  }),
  options
)

export default client