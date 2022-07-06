const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CI? `http://metabase:3000` : 'http://localhost:3000',
    specPattern: [
      "cypress/e2e/api_test.cy.js",
      "cypress/e2e/metabase.cy.js",
      "cypress/e2e/mongodb.cy.js"
    ],
    setupNodeEvents(on, config) {
        on('task', {
          log(message) {
            console.log(message)
            return null
          },
        })
      }
  },
  env: {
    CI: 'localhost',
    HOST: '172.17.0.2'
  }
});
