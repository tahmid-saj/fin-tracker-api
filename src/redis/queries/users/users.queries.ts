import { User } from "../../../models/users/users.types.js";
import { redisClient } from "../../../services/redis/redis.service.js";
import { usersKey, usersUniqueKey } from "./users.keys.js";

// helper functions
const serialize = (user: User) => {
  return {
    userId: user.userId,
    email: user.email
  }
}

const deserialize = (userId: string, user: { [key: string]: string }) => {
  return {
    userId: userId,
    email: user.email
  }
}

export const getUser = async (user: User) => {
  const resUser = await redisClient.hGetAll(usersKey(user))

  return deserialize(resUser.userId!, resUser)
}

export const createUser = async (user: User) => {
  // generate key for the user
  const userkey = usersKey(user)

  // see if the key is already in the set of users
  const exists = await redisClient.sIsMember(usersUniqueKey(), userkey)

  // if so, return
  if (exists) {
    return
  }
  
  // otherwise, continue - we'll store the user in both a hash (containing user's info, such as 
  // their email) and a set (containing only unique users)
  await Promise.all([
    redisClient.hSet(userkey, serialize(user)),
    redisClient.sAdd(usersUniqueKey(), userkey)
  ])
}