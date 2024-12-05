require("dotenv").config();

module.exports = {
  HOST: "ep-divine-lake-a19v1e3d-pooler.ap-southeast-1.aws.neon.tech",
  USER: "default",
  PASSWORD: "9RIhTLGNY4Hz",
  DB: "verceldb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};