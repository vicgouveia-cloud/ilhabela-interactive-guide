const {defineConfig} = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  testMatch: '*.spec.cjs',
  timeout: 120000,
  workers: 2,
  use: {baseURL: process.env.PREVIEW_URL || 'http://127.0.0.1:4173', screenshot:'only-on-failure', trace:'retain-on-failure'},
  reporter: [['list'], ['html', {open:'never'}]],
  webServer: process.env.PREVIEW_URL ? undefined : {command:'node tests/server.cjs', url:'http://127.0.0.1:4173', reuseExistingServer:true}
});
