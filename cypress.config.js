const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://account-api.sandbox.tuumplatform.com/',
  },
})