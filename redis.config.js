import { createClient } from "redis";

export const client = createClient();

const clientConn = async () => {
  try {
    await client.connect({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    });
    console.log("Reddis Is Connencted");
  } catch (err) {
    console.log("Redis Connection error");
  }
};

export default clientConn;
