export const CONFIG = {
  // Increase poll interval to reduce API calls
  POLL_INTERVAL: 60000, // 1 minute instead of 1 minute

  // Add caching duration
  CACHE_DURATION: 120, // 2 minutes in seconds

  // Rate limiting
  RATE_LIMIT: {
    MAX_REQUESTS: 20,
    WINDOW_MS: 60000, // 1 minute
  },
} as const;
