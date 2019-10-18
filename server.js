const Bundler = require('parcel-bundler')
const express = require('express')
const proxy = require('http-proxy-middleware')

const API_URL = process.env.API
const API_PREFIX = '/api'

const app = express()

const proxyRouter = (apiPrefix) => (req) => {
  const pathname = req.url
  return API_URL + pathname.replace(apiPrefix,'')
}

app.use(API_PREFIX, proxy({
  target: API_URL,
  router: proxyRouter(API_PREFIX),
  changeOrigin: true,
  logLevel: 'debug'
}))


const bundler = new Bundler('./src/index.html')
app.use(bundler.middleware())

app.listen(Number(process.env.PORT || 1234))
