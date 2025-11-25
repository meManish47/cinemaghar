import "dotenv/config";
import cron from "node-cron";
import { softDeleteShows } from "./src/services/cronservice.js";

console.log("Cron started-_------__--_-");

cron.schedule("*/10 * * * *", async () => {
  console.log("Cron hitted s at:", new Date().toISOString());

  try {
    await softDeleteShows();
  } catch (err) {
    console.error("Cron error:", err);
  }
});
