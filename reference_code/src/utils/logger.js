const fs = require('fs');
const path = require('path');


const logDirectory = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

class Logger {
  static log(level, message) {
    const logMessage = `${new Date().toISOString()} [${level.toUpperCase()}] ${message}\n`;
    fs.appendFileSync(path.join(logDirectory, 'app.log'), logMessage);
    console.log(logMessage);
  }

  static info(message) {
    this.log("info", message);
  }

  static warn(message) {
    this.log("warn", message);
  }

  static error(message) {
    this.log("error", message);
  }
}

module.exports = Logger;
