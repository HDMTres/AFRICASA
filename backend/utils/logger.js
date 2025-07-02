const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logDir = path.join(__dirname, '../logs');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  formatMessage(level, message, metadata = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...metadata
    };
    return JSON.stringify(logEntry);
  }

  writeToFile(filename, content) {
    const filePath = path.join(this.logDir, filename);
    fs.appendFileSync(filePath, content + '\n');
  }

  log(level, message, metadata = {}) {
    const formattedMessage = this.formatMessage(level, message, metadata);
    
    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      const colors = {
        error: '\x1b[31m',
        warn: '\x1b[33m',
        info: '\x1b[36m',
        debug: '\x1b[90m',
        reset: '\x1b[0m'
      };
      console.log(`${colors[level] || colors.info}[${level.toUpperCase()}]${colors.reset} ${message}`);
    }

    // Always log to file
    this.writeToFile('app.log', formattedMessage);
    
    // Separate error logs
    if (level === 'error') {
      this.writeToFile('error.log', formattedMessage);
    }

    // Separate auth logs for security monitoring
    if (metadata.type === 'auth') {
      this.writeToFile('auth.log', formattedMessage);
    }
  }

  info(message, metadata = {}) {
    this.log('info', message, metadata);
  }

  warn(message, metadata = {}) {
    this.log('warn', message, metadata);
  }

  error(message, metadata = {}) {
    this.log('error', message, metadata);
  }

  debug(message, metadata = {}) {
    this.log('debug', message, metadata);
  }

  // Security-specific logging methods
  authSuccess(userId, email, ip) {
    this.info('Connexion réussie', {
      type: 'auth',
      action: 'login_success',
      userId,
      email,
      ip,
      timestamp: new Date().toISOString()
    });
  }

  authFailure(email, ip, reason) {
    this.warn('Tentative de connexion échouée', {
      type: 'auth',
      action: 'login_failed',
      email,
      ip,
      reason,
      timestamp: new Date().toISOString()
    });
  }

  registrationAttempt(email, ip) {
    this.info('Tentative d\'inscription', {
      type: 'auth',
      action: 'registration_attempt',
      email,
      ip,
      timestamp: new Date().toISOString()
    });
  }

  suspiciousActivity(description, metadata = {}) {
    this.error('Activité suspecte détectée', {
      type: 'security',
      action: 'suspicious_activity',
      description,
      ...metadata,
      timestamp: new Date().toISOString()
    });
  }
}

// Export singleton instance
module.exports = new Logger();
