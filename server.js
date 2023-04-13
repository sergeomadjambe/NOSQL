// Import server connection settings and database models.
const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');

// Create Express Application.
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start server application listening.
db.once('open', () => {
  app.listen(PORT, async () => {
    console.log(`API server is listening on port ${PORT}!`);
  });
});
