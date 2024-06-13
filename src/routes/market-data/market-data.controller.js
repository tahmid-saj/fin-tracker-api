const { getMarketDataStocks, getMarketDataIndices,
  getMarketDataCrypto, getMarketDataForex
} = require("../../utils/requests/market-data/market-data.requests")

// market data

// stocks
async function httpGetMarketDataStocks(req, res) {
  try {
    const marketDataType = String(req.body.marketDataType)
    const marketDataTicker = String(req.body.marketDataTicker)
    const marketDataInterval = String(req.body.marketDataInterval)
    const marketDataStartDate = String(req.body.marketDataStartDate)
    const marketDataEndDate = String(req.body.marketDataEndDate)
    const resGetMarketDataStocks = await getMarketDataStocks(marketDataType, marketDataTicker, marketDataInterval,
      marketDataStartDate, marketDataEndDate)

    if (resGetMarketDataStocks) return res.status(200).json(resGetMarketDataStocks)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// indices
async function httpGetMarketDataIndices(req, res) {
  try {
    const marketDataType = String(req.body.marketDataType)
    const marketDataTicker = String(req.body.marketDataTicker)
    const marketDataInterval = String(req.body.marketDataInterval)
    const marketDataStartDate = String(req.body.marketDataStartDate)
    const marketDataEndDate = String(req.body.marketDataEndDate)
    const resGetMarketDataIndices = await getMarketDataIndices(marketDataType, marketDataTicker, marketDataInterval,
      marketDataStartDate, marketDataEndDate)

    if (resGetMarketDataIndices) return res.status(200).json(resGetMarketDataIndices)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// crypto
async function httpGetMarketDataCrypto(req, res) {
  try {
    const marketDataType = String(req.body.marketDataType)
    const marketDataTicker = String(req.body.marketDataTicker)
    const marketDataInterval = String(req.body.marketDataInterval)
    const marketDataStartDate = String(req.body.marketDataStartDate)
    const marketDataEndDate = String(req.body.marketDataEndDate)
    const resGetMarketDataCrypto = await getMarketDataCrypto(marketDataType, marketDataTicker, marketDataInterval,
      marketDataStartDate, marketDataEndDate)

    if (resGetMarketDataCrypto) return res.status(200).json(resGetMarketDataCrypto)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

// forex
async function httpGetMarketDataForex(req, res) {
  try {
    const marketDataType = String(req.body.marketDataType)
    const marketDataTicker = String(req.body.marketDataTicker)
    const marketDataInterval = String(req.body.marketDataInterval)
    const marketDataStartDate = String(req.body.marketDataStartDate)
    const marketDataEndDate = String(req.body.marketDataEndDate)
    const resGetMarketDataForex = await getMarketDataForex(marketDataType, marketDataTicker, marketDataInterval,
      marketDataStartDate, marketDataEndDate)

    if (resGetMarketDataForex) return res.status(200).json(resGetMarketDataForex)
  } catch (error) {
    // TODO: handle error
    console.log(error)
  }
}

module.exports = {
  httpGetMarketDataStocks,
  httpGetMarketDataIndices,
  httpGetMarketDataCrypto,
  httpGetMarketDataForex
}