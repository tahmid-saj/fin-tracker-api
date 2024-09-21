const http_ = require('http');
const mongoose_ = require('mongoose');
require("dotenv").config();
const { mongoConnect_ } = require("../src/services/mongodb/mongodb.service");
const { app } = require("../src/app");
const server_ = http.createServer(app);

const PORT_ = process.env.PORT;

async function startServer_(): Promise<void> {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();

module.exports = app

export {};