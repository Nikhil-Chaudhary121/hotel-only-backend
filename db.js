const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Dhava", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", ()=> {console.log( "connection error:")});
db.on("connected", ()=> { console.log( "connection connected")});
db.on("disconnected", ()=> { console.log( "connection disconnected")});

module.exports = db;