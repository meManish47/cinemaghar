import "dotenv/config";
import cron from "node-cron";
import { softDeleteShows } from "./src/services/cronservice.js";

declare global {
  var cronStarted: boolean;
}

console.log("Cron started-_------__--_-");

if (!global.cronStarted) {
  global.cronStarted = true;

  cron.schedule("*/10 * * * *", async () => {
    console.log("Cron hitted at:", new Date().toISOString());

    try {
      await softDeleteShows();
    } catch (err) {
      console.error("Cron error:", err);
    }
  });
}
