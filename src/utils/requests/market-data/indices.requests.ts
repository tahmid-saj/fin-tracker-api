import { restClient } from "@polygon.io/client-js"

const polygonRestClient = restClient("")

polygonRestClient.indices.aggregates("VPU", 1, "day", "2024-01-01", "2024-02-02")
.then(res => console.log(res))
.catch(err => console.log(err))