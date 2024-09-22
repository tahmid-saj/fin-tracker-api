import { restClient } from "@polygon.io/client-js"
import dotenv from "dotenv"

dotenv.config()

export const polygonRestClient = restClient(process.env.REACT_APP_POLYGON_API_KEY)
