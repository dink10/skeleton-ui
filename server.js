const Bundler = require('parcel-bundler')
const express = require('express')
const proxy = require('express-http-proxy')
const apiMocker = require('connect-api-mocker');

const { API_URL, PORT } = process.env
const API_PREFIX = '/api'

const app = express()
if (API_URL) {
  app.use(API_PREFIX, proxy(API_URL))
} else {
  app.use(API_PREFIX, apiMocker('mocks/api'));
}

const bundler = new Bundler('./src/index.html')
app.use(bundler.middleware())

function listen(port, tries = 0) {
  app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`\nApp running on http://localhost:${port}\n`)
  }).on('error', (error) => {
    if (error.code === 'EADDRINUSE' && tries < 10) {
      listen(port + 1, tries + 1)
    }
  })
}

listen(Number(PORT || 8080))
