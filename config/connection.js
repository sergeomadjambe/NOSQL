// Import mongoose for database connectivity.
const mongoose = require('mongoose');
const URL_DB = 'mongodb://127.0.0.1:27017/';
const DB_NAME = 'socialNetworkDB';


// // Drop Database if it exists...
// const connection = mongoose.connection;
// connection.once("open", async () => await mongoose.connection.db.dropDatabase( console.log(`${connection.db.databaseName} database dropped.`)));


//Wrap Mongoose around local connection to MongoDB
mongoose.connect(URL_DB + DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Export connection 
module.exports = mongoose.connection;
