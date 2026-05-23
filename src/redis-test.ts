import "dotenv/config";
import { createClient } from "redis";

async function main() {
  console.log("URL exists:", !!process.env.REDIS_URL);

  const client = createClient({
    url: process.env.REDIS_URL,
    socket: {
      tls: true,
    },
  });

  client.on("error", (e) => console.error("ERROR", e));
  client.on("connect", () => console.log("CONNECT"));
  client.on("ready", () => console.log("READY"));
  client.on("reconnecting", () => console.log("RECONNECTING"));
  client.on("end", () => console.log("END"));

  await client.connect();

  console.log("PING =", await client.ping());

  await client.quit();
}

main().catch(console.error);