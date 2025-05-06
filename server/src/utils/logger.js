const { createLogger, format, transports, addColors } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");
const fs = require("fs");

// Custom log levels and colors
const customLevels = {
  levels: {
    debug: 0,
    info: 1,
    notice: 2,
    warning: 3,
    error: 4,
    crit: 5,
    alert: 6,
  },
  colors: {
    debug: "blue",
    info: "green",
    notice: "cyan",
    warning: "yellow",
    error: "red",
    crit: "magenta",
    alert: "redBG",
  },
};
addColors(customLevels.colors);

// Function to create directory if not exist
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Move two levels up from current __dirname
const logsBaseDir = path.resolve(__dirname, "../../");

// Create folders for logs
["info", "warning", "error"].forEach((level) => {
  ensureDirExists(path.join(logsBaseDir, "logs", level));
});

// Common log format
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ level, message, timestamp }) => {
    return `[${level} - ${timestamp}] ${message}`;
  })
);

// Filter format for specific level only
const filterOnly = (level) =>
  format((info) => (info.level === level ? info : false))();

// Create rotating file transports with filtering
const errorTransport = new DailyRotateFile({
  level: "error",
  dirname: path.join(logsBaseDir, "logs/error"),
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  zippedArchive: true,
  format: format.combine(filterOnly("error"), logFormat),
});

const warningTransport = new DailyRotateFile({
  level: "warning",
  dirname: path.join(logsBaseDir, "logs/warning"),
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  zippedArchive: true,
  format: format.combine(filterOnly("warning"), logFormat),
});

const infoTransport = new DailyRotateFile({
  level: "info",
  dirname: path.join(logsBaseDir, "logs/info"),
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  zippedArchive: true,
  format: format.combine(filterOnly("info"), logFormat),
});

// Create the logger
const logger = createLogger({
  levels: customLevels.levels,
  level: "debug", // Log everything, filtering happens in transports
  format: logFormat,
  transports: [
    errorTransport,
    warningTransport,
    infoTransport,
    new transports.Console({
      level: "warning",
      format: format.combine(format.colorize(), logFormat),
    }),
  ],
});

module.exports = logger;
