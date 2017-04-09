import fs from 'fs'
import http from 'http'
import https from 'https'
import express from 'express'
import path from 'path'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'

const app = express(),
  router = express.Router(),
  privateKey = fs.readFileSync(),
  certificate = fs.readFileSync('/home/danilo'),
  options = {key:privateKey, cert:certificate}


const server = https.createServer(options, app)

app.use(compression())

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/public')))

server.listen(443)
console.log(
  'Express server listening on port %d in %s mode',
  server.address().port, app.settings.env
)
