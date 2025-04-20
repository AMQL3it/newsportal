const express = require('express');
// const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

// Internal Imports
const initRoutes = require('../modules');
const Error = require('../common/errorHandler');

const createServer = () => {
    const app = express();
  
    // CORS
    app.use(cors("*"));
  
    // Request parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  
    // Set static folder
    app.use(express.static(path.join(__dirname, "public")));
  
    // Parse cookies
    // app.use(cookieParser(process.env.COOKIE_SECRET));
  
    // Routing setup - Initialize routes
    initRoutes(app);
  
    // 404 not found handler
    app.use(Error.notFoundHandler);
  
    // Default error handler
    app.use(Error.errorHandler);
  
    return app;
};

module.exports = createServer;