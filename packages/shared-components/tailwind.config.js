const sharedConfig = require('@brince-mono-repo/shared-tailwind-config/tailwind.config.js');

module.exports = {
  ...sharedConfig,
  content: [...sharedConfig.content, './stories/**/*.{js,jsx,ts,tsx}'],
};
