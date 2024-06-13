const { restClient } = require("@polygon.io/client-js")
require('dotenv').config()

const polygonRestClient = restClient(process.env.REACT_APP_POLYGON_API_KEY)

module.exports = {
  polygonRestClient
}