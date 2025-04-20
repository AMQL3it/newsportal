const { createLogger, format, transports, config } = require('winston');

// Custom log levels
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
    debug: 'blue',
    info: 'green',
    warning: 'yellow',
    error: 'red'
  },
};
// Apply custom colors
require('winston').addColors(customLevels.colors);

// Add custom levels to Winston
const logger = createLogger({
  levels: customLevels.levels,
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => {
      return `[${level}] ${timestamp}: ${message}`;
    })
  ),
  transports: [
    new transports.Console({
        level: 'warning', 
      }),
    // new transports.File({ filename: 'logs/custom.log', level: ['warning'] }),
  ],
});


module.exports = logger;
