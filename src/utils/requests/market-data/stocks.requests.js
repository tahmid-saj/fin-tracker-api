const { restClient } = require("@polygon.io/client-js")

const polygonRestClient = restClient("")

polygonRestClient.stocks.aggregates("AAPL", 1, "day", "2024-01-01", "2024-02-02")
.then(res => console.log(res))
.catch(err => console.log(err))