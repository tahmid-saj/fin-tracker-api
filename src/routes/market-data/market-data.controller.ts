import { Request, Response } from "express"
import { getMarketDataStocks, getMarketDataIndices,
  getMarketDataCrypto, getMarketDataForex
} from "../../utils/requests/market-data/market-data.requests.ts"

// market data

// stocks
export async function httpGetMarketDataStocks(req: Request, res: Response): Promise<void> {
  try {
    if (req.body) {
      const marketDataType = String(req.body.marketDataType)
      const marketDataTicker = String(req.body.marketDataTicker)
      const marketDataInterval = String(req.body.marketDataInterval)
      const marketDataStartDate = String(req.body.marketDataStartDate)
      const marketDataEndDate = String(req.body.marketDataEndDate)
      const resGetMarketDataStocks = await getMarketDataStocks(marketDataType, marketDataTicker, marketDataInterval,
        marketDataStartDate, marketDataEndDate)
  
      if (resGetMarketDataStocks) res.status(200).json(resGetMarketDataStocks)
    }
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// indices
export async function httpGetMarketDataIndices(req: Request, res: Response): Promise<void> {
  try {
    const marketDataType = String(req.body.marketDataType)
    const marketDataTicker = String(req.body.marketDataTicker)
    const marketDataInterval = String(req.body.marketDataInterval)
    const marketDataStartDate = String(req.body.marketDataStartDate)
    const marketDataEndDate = String(req.body.marketDataEndDate)
    const resGetMarketDataIndices = await getMarketDataIndices(marketDataType, marketDataTicker, marketDataInterval,
      marketDataStartDate, marketDataEndDate)

    if (resGetMarketDataIndices) res.status(200).json(resGetMarketDataIndices)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// crypto
export async function httpGetMarketDataCrypto(req: Request, res: Response): Promise<void> {
  try {
    const marketDataType = String(req.body.marketDataType)
    const marketDataTicker = String(req.body.marketDataTicker)
    const marketDataInterval = String(req.body.marketDataInterval)
    const marketDataStartDate = String(req.body.marketDataStartDate)
    const marketDataEndDate = String(req.body.marketDataEndDate)
    const resGetMarketDataCrypto = await getMarketDataCrypto(marketDataType, marketDataTicker, marketDataInterval,
      marketDataStartDate, marketDataEndDate)

    if (resGetMarketDataCrypto) res.status(200).json(resGetMarketDataCrypto)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// forex
export async function httpGetMarketDataForex(req: Request, res: Response): Promise<void> {
  try {
    const marketDataType = String(req.body.marketDataType)
    const marketDataTicker = String(req.body.marketDataTicker)
    const marketDataInterval = String(req.body.marketDataInterval)
    const marketDataStartDate = String(req.body.marketDataStartDate)
    const marketDataEndDate = String(req.body.marketDataEndDate)
    const resGetMarketDataForex = await getMarketDataForex(marketDataType, marketDataTicker, marketDataInterval,
      marketDataStartDate, marketDataEndDate)

    if (resGetMarketDataForex) res.status(200).json(resGetMarketDataForex)
  } catch (error) {
    // TODO: handle error
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
