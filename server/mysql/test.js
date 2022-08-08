require("dotenv").config();

console.log(
  process.env.REACT_APP_DBhost,
  process.env.REACT_APP_DBuser,
  process.env.REACT_APP_DBpassword,
  process.env.REACT_APP_DBdatabase
);
