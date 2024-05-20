const { restClient } = require("@polygon.io/client-js")

const polygonRestClient = restClient("")
const { toDate } = require("unix-timestamp")

// polygonRestClient.stocks.aggregates("AAPL", 1, "day", "2024-01-01", "2024-02-02")
// .then(res => console.log(res))
// .catch(err => console.log(err))

// helper functions

function convUnix(unix_timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds
  var date = new Date(unix_timestamp);
  
  // Hours part from the timestamp
  var hours = date.getHours();
  
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  
  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  
  return {
    date: date,
    time: formattedTime
  }
}

async function processMarketDataResponse(marketDataRes) {
  return marketDataRes.results.map((marketDataRecord) => {
    return {
      closing: marketDataRecord.c,
      time: convUnix(marketDataRecord.t)
    }
  })
}

// stocks
async function getStocksMarketData(marketDataQuery) {
  const res = polygonRestClient.stocks.aggregates(
    marketDataQuery.marketDataTicker, 
    1, 
    marketDataQuery.marketDataInterval,
    marketDataQuery.marketDataStartDate,
    marketDataQuery.marketDataEndDate
    ).then(async (res) => {
      const marketData = await processMarketDataResponse(res)
      return marketData
    }).catch((error) => {
      console.log(error)
      return Object({})
    })
  
  return res
}

async function getRes() { 
  const res = await getStocksMarketData({
    marketDataType: "stocks",
    marketDataTicker: "AAPL",
    marketDataInterval: "hour",
    marketDataStartDate: "2024-01-01",
    marketDataEndDate: "2024-01-03",
  })
}

getRes()