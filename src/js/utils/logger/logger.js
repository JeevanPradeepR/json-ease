class Logger {
    constructor() {
      this.level = 'info'; // default level
    }
  
    log(message, level = 'info') {
      const levels = ['debug', 'info', 'warn', 'error'];
      if (levels.indexOf(level) >= levels.indexOf(this.level)) {
        const timestamp = new Date().toISOString();
        console[level](`[${timestamp}] ${message}`);
      }
    }
  }
  
  const logger = new Logger();
  logger.log('This is an info message');
  logger.log('This is a debug message', 'debug');
  logger.log('This is an error message', 'error');
  