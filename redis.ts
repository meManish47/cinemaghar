import dotenv from "dotenv";

const result = dotenv.config();

console.log("DOTENV RESULT:", result);
console.log("REDIS_URL:", process.env.REDIS_URL);

async function main() {
  console.log("ENV LOADED");
}

main();