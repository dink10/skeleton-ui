const Bundler = require('parcel-bundler')
const express = require('express')
const proxy = require('express-http-proxy')

const API_URL = process.env.API_URL
const API_PREFIX = '/api'

const app = express()

app.use(API_PREFIX, proxy(API_URL))

const bundler = new Bundler('./src/index.html')
app.use(bundler.middleware())

app.listen(Number(process.env.PORT || 8080))
