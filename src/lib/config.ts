/**
 * Store & App Configuration
 * Server-only secrets should NEVER be prefixed with NEXT_PUBLIC_
 */
export const APP_CONFIG = {
  appName: 'APNA Bazar',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://apnabazar.pk',
  github: {
    owner: process.env.GITHUB_OWNER || '',
    repo: process.env.GITHUB_REPO || '',
    branch: process.env.GITHUB_BRANCH || 'main',
    // Token is strictly server-side, never exposed to browser
    token: process.env.GITHUB_TOKEN || '',
    dataPath: 'src/data',
  },
};
