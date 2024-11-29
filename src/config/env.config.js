const dotenv = require("dotenv");
const program = require("./commander.config");

const { mode } = program.opts();
dotenv.config({ path: mode === "dev" ? "./.env.dev" : "./.env.build" });

const configObject = {
  server: {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL,
  },
  auth: {
    jwt_secret: process.env.JWT_SECRET,
  },
  agora: {
    agora_app_id: process.env.AGORA_APP_ID,
    agora_app_certificate: process.env.AGORA_APP_CERTIFICATE,
  },
  logger: {
    log_level: process.env.LOG_LEVEL,
    log_to_file: process.env.LOG_TO_FILE,
    log_file_name: process.env.LOG_FILE_NAME,
  },
};

module.exports = configObject;
