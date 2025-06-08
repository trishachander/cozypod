/**
 * Logger utility for better visibility into application flow
 * Used throughout the application for consistent debugging
 */
const logger = {
    info: (message) => {
      console.log(`[INFO] [${new Date().toISOString()}] ${message}`);
    },
    
    debug: (message) => {
      console.log(`[DEBUG] [${new Date().toISOString()}] ${message}`);
    },
    
    error: (message, error) => {
      console.error(`[ERROR] [${new Date().toISOString()}] ${message}`);
      if (error) {
        console.error(error);
      }
    },
    
    // For tracking API calls specifically
    api: (method, url, body) => {
      console.log(`[API] [${new Date().toISOString()}] ${method} ${url}`);
      if (body) {
        console.log(`Request Body: ${JSON.stringify(body, null, 2)}`);
      }
    },
    
    // For tracking state transitions
    state: (from, to) => {
      console.log(`[STATE] [${new Date().toISOString()}] Transition: ${from} → ${to}`);
    }
  };
  
  module.exports = logger;