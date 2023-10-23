const { getBankingData } = require("../../models/banking/banking.model")

async function httpGetBankingData(req, res) {
  return res.status(200).json(await getBankingData());
};

module.exports = {
  httpGetBankingData,
}