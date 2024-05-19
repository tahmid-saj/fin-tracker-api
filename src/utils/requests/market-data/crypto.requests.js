const { restClient } = require("@polygon.io/client-js")

const polygonRestClient = restClient("")

polygonRestClient.crypto.aggregates("X:BTCUSD", 1, "hour", "2024-01-01", "2024-01-02")
.then(res => console.log(res))
.catch(err => console.log(err))