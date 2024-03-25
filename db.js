const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL ;
// const MONGODB_URL = process.env.MONGODB_LOCAL_URL ;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", ()=> {console.log( "connection error:")});
db.on("connected", ()=> { console.log( "connection connected")});
db.on("disconnected", ()=> { console.log( "connection disconnected")});

module.exports = db;