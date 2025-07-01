import path from "path";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { mongoConnect } from "./services/mongodb/mongodb.service.js";
import { app } from "./app.js";

import { buildSchema } from "graphql";
import { loadFilesSync } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import { redisConnect } from "./services/redis/redis.service.js";
import { postgresConnect } from "./services/postgres/postgres.service.js";

const server = http.createServer(app);
const PORT = process.env.PORT;

async function startServer() {
  console.log("App is starting...");

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
  });

  try {
    await mongoConnect();
    await redisConnect()
    await postgresConnect()
  
    // const typesArray = loadFilesSync("**/*", {
    //   extensions: ["graphql"],
    // });
  
    // const resolversArray = loadFilesSync(path.resolve("**/*.resolvers.js"));
  
    // const schema = makeExecutableSchema({
    //   typeDefs: typesArray,
    //   resolvers: resolversArray,
    // });
  
    // const apolloServer = new ApolloServer({
    //   schema: schema,
    // });
  
    // await apolloServer.start();
    // apolloServer.applyMiddleware({
    //   app,
    //   path: "/graphql",
    // });
  
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Fatal startup error: ", err);
    process.exit(1); // Optionally fail fast
  }
}

startServer();
