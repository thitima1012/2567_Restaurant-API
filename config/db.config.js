require("dotenv").config({ path: "../.env" });
console.log(process.env.dialect);
module.exports = {
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// module.exports = {
//   HOST: "ep-divine-lake-a19v1e3d-pooler.ap-southeast-1.aws.neon.tech",
//   USER: "default",
//   PASSWORD: "9RIhTLGNY4Hz",
//   DB: "verceldb",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

// HOST = "ep-divine-lake-a19v1e3d-pooler.ap-southeast-1.aws.neon.tech"
// USER = "default"
// PASSWORD = "9RIhTLGNY4Hz"
// DB = "verceldb"
// dialect ="postgres"