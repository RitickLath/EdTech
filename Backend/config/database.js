const mongoose = require("mongoose");
require("dotenv").config();

exports.dbconnect = () => {
  mongoose
    .connect(process.env.DB_URL, {
      unifiedUrlParse: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected Succesfully").catch((e) => {
        console.error(e);
        console.log("Error Occured while connecting to database");
        process.exit(1);
      });
    });
};
