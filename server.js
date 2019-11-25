const Bundler = require('parcel-bundler')
const express = require('express')
const proxy = require('express-http-proxy')

const { API_URL } = process.env
const API_PREFIX = '/api'

const app = express()

app.use(API_PREFIX, proxy(API_URL))

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

listen(Number(process.env.PORT || 8080))
