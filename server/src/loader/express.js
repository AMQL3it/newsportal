const express = require("express");
// const cookieParser = require('cookie-parser');
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

// Internal Imports
const initRoutes = require("../modules");
const Error = require("../common/errorHandler");
// const authRoute = require("../modules/auth");
// const smsRoutes = require("../modules/sms");

const createServer = () => {
  const app = express();

  // CORS
  app.use(cors("*"));

  // Request parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Set static folder
  // app.use(express.static(path.join(__dirname, "../uploads")));
  app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

  // Parse cookies
  // app.use(cookieParser(process.env.COOKIE_SECRET));

  // login route
  // app.use("/auth", authRoute);

  // // sms route
  // app.use("/sms", smsRoutes);

  // Routing setup - Initialize routes
  initRoutes(app);

  // 404 not found handler
  app.use(Error.notFoundHandler);

  // Default error handler
  app.use(Error.errorHandler);

  return app;
};

module.exports = createServer;
