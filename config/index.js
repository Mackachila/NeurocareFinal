require("dotenv").config();

// App Configuration
const app_port = process.env.APP_PORT;
const app_name = process.env.APP_NAME;
const app_secret = process.env.APP_SECRET;
const googl_key = process.env.GOOGLE_MAPS_API_KEY;
const cohere_key = process.env.COHERE_API_KEY;
const hugginface_key = process.env.HUGGINGFACE_API_KEY;

// DB Configuration

const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;
const db_name = process.env.DB_DATABASE;
const db_port = process.env.DB_PORT;

module.exports = {
  app_port,
  app_name,
  app_secret,
  db_host,
  db_user,
  db_pass,
  db_name,
  db_port,
  googl_key,
};