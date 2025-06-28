import { Request, Response } from "express"
import { getMarketDataStocks, getMarketDataIndices,
  getMarketDataCrypto, getMarketDataForex
} from "../../utils/requests/market-data/market-data.requests.js"
import { MarketDataRequest } from "../../models/market-data/market-data.types.js"
import { getInitialLivePrices, getPopularTickers, getRecentLivePricesRequests, hasRequestBeenAsked, 
  saveInitialLivePrices } from "../../redis/queries/live-prices/live-prices.queries.js"

// market data

// returning popular tickers
export async function httpGetPopularTickers(req: Request, res: Response): Promise<any> {
  try {
    const resPopularTickers = await getPopularTickers()
    return res.status(200).json(resPopularTickers)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// returning the recent live price requests
export async function httpGetRecentRequests(req: Request, res: Response): Promise<any> {
  try {
    const resRecentLivePricesRequests = await getRecentLivePricesRequests()
    return res.status(200).json(resRecentLivePricesRequests)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// stocks
export async function httpGetLivePricesStocks(req: Request, res: Response): Promise<any> {
  try {
    if (req.body) {
      const marketDataType = String(req.body.marketDataType)
      const marketDataTicker = String(req.body.marketDataTicker)
      const marketDataInterval = String(req.body.marketDataInterval)
      const marketDataStartDate = String(req.body.marketDataStartDate)
      const marketDataEndDate = String(req.body.marketDataEndDate)

      const marketDataRequest: MarketDataRequest = {
        marketDataType, 
        marketDataTicker, 
        marketDataInterval, 
        marketDataStartDate, 
        marketDataEndDate
      }

      // first check in redis if the livePricesRequest is current stored:
      const requestBeenAsked = await hasRequestBeenAsked(marketDataRequest)
      
      // if the request was asked before, then return it from the cache:
      if (requestBeenAsked) {
        const cachedMarketDataRequest = await getInitialLivePrices(marketDataRequest)
        return res.status(200).json(cachedMarketDataRequest)
      } else {
        // if request was not asked before, then store it's result and return the result:
        const resGetMarketDataStocks = await getMarketDataStocks(marketDataType, marketDataTicker, marketDataInterval,
          marketDataStartDate, marketDataEndDate)
        
        if (resGetMarketDataStocks) {
          await saveInitialLivePrices(marketDataRequest, resGetMarketDataStocks)
          return res.status(200).json(resGetMarketDataStocks)
        }
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// indices
export async function httpGetLivePricesIndices(req: Request, res: Response): Promise<any> {
  try {
    const marketDataType = String(req.body.marketDataType)
    const marketDataTicker = String(req.body.marketDataTicker)
    const marketDataInterval = String(req.body.marketDataInterval)
    const marketDataStartDate = String(req.body.marketDataStartDate)
    const marketDataEndDate = String(req.body.marketDataEndDate)

    const marketDataRequest: MarketDataRequest = {
      marketDataType, 
      marketDataTicker, 
      marketDataInterval, 
      marketDataStartDate, 
      marketDataEndDate
    }

    const requestBeenAsked = await hasRequestBeenAsked(marketDataRequest)

    if (requestBeenAsked) {
      const cachedMarketDataRequest = await getInitialLivePrices(marketDataRequest)
      return res.status(200).json(cachedMarketDataRequest)
    } else {
    const resGetMarketDataIndices = await getMarketDataIndices(marketDataType, marketDataTicker, marketDataInterval,
      marketDataStartDate, marketDataEndDate)

      if (resGetMarketDataIndices) {
        await saveInitialLivePrices(marketDataRequest, resGetMarketDataIndices)
        return res.status(200).json(resGetMarketDataIndices)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// crypto
export async function httpGetLivePricesCrypto(req: Request, res: Response): Promise<any> {
  try {
    const marketDataType = String(req.body.marketDataType)
    const marketDataTicker = String(req.body.marketDataTicker)
    const marketDataInterval = String(req.body.marketDataInterval)
    const marketDataStartDate = String(req.body.marketDataStartDate)
    const marketDataEndDate = String(req.body.marketDataEndDate)

    const marketDataRequest: MarketDataRequest = {
      marketDataType, 
      marketDataTicker, 
      marketDataInterval, 
      marketDataStartDate, 
      marketDataEndDate
    }

    const requestBeenAsked = await hasRequestBeenAsked(marketDataRequest)

    if (requestBeenAsked) {
      const cachedMarketDataRequest = await getInitialLivePrices(marketDataRequest)
      return res.status(200).json(cachedMarketDataRequest)
    } else {
    const resGetMarketDataCrypto = await getMarketDataCrypto(marketDataType, marketDataTicker, marketDataInterval,
      marketDataStartDate, marketDataEndDate)

      if (resGetMarketDataCrypto) {
        await saveInitialLivePrices(marketDataRequest, resGetMarketDataCrypto)
        return res.status(200).json(resGetMarketDataCrypto)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// forex
export async function httpGetLivePricesForex(req: Request, res: Response): Promise<any> {
  try {
    const marketDataType = String(req.body.marketDataType)
    const marketDataTicker = String(req.body.marketDataTicker)
    const marketDataInterval = String(req.body.marketDataInterval)
    const marketDataStartDate = String(req.body.marketDataStartDate)
    const marketDataEndDate = String(req.body.marketDataEndDate)

    const marketDataRequest: MarketDataRequest = {
      marketDataType, 
      marketDataTicker, 
      marketDataInterval, 
      marketDataStartDate, 
      marketDataEndDate
    }

    const requestBeenAsked = await hasRequestBeenAsked(marketDataRequest)

    if (requestBeenAsked) {
      const cachedMarketDataRequest = await getInitialLivePrices(marketDataRequest)
      return res.status(200).json(cachedMarketDataRequest)
    } else {
    const resGetMarketDataForex = await getMarketDataForex(marketDataType, marketDataTicker, marketDataInterval,
      marketDataStartDate, marketDataEndDate)

      if (resGetMarketDataForex) {
        await saveInitialLivePrices(marketDataRequest, resGetMarketDataForex)
        return res.status(200).json(resGetMarketDataForex)
      }
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
