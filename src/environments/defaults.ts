export const defaults = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
  authCallbackUrl: 'http://localhost:4200/auth/callback',
  notification: {
    delay: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'center'
  },
  http: {
    timeout: 120 * 1000, // 2 minutes
    retries: 0, // no retries
    retryTimeout: 3 * 1000 // 3 seconds
  }
};
