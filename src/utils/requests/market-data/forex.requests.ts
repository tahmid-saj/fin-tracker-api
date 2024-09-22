import { restClient } from "@polygon.io/client-js"

const polygonRestClient = restClient("")

// polygonRestClient.forex.aggregates("C:USDCAD", 1, "week", "2024-01-01", "2024-02-02")
// .then(res => console.log(res))
// .catch(err => console.log(err))

polygonRestClient.forex.previousClose("C:CADUSD")
.then(res => console.log(res))
.catch(err => console.log(err))