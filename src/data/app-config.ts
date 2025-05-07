const ENV_CONFIG = {
  local: {
    BACKEND_API_URL: 'http://localhost:4444',
  },
  development: {
    BACKEND_API_URL: 'https://mint-muse.onrender.com/',
  },
  production: {
    BACKEND_API_URL: 'https://mint-muse.onrender.com/',
  },
} as const;

type Environment = keyof typeof ENV_CONFIG;

const currentEnv =
  (process.env.NEXT_PUBLIC_APP_ENVIRONMENT as Environment) || 'development';

export const config = ENV_CONFIG[currentEnv];
