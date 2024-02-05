import { client } from "./redis.config.js";

export const redisMiddleware = async (req, res, next) => {
  try {
    const { method, originalUrl } = req;
    const key = `${method}:${originalUrl}`;
    const cachedData = JSON.parse(await client.get(key));
    console.log("into middleware");
    cachedData
      ? (console.log("Data from Redis", cachedData),
        res.status(200).json(cachedData))
      : next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
