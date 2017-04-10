/*import fs from 'fs'
import http from 'http'
import https from 'https'
import express from 'express'
import path from 'path'
import cors from 'cors'
import compression from 'compression'
import bodyParser from 'body-parser'*/
var fs = require('fs'),
  http = require('http'),
  https = require('https'),
  express = require('express'),
  path = require('path'),
  cors = require('cors'),
  compression = require('compression'),
  bodyParser = require('body-parser')

// should be const in es6
var app = express(),
  router = express.Router(),
  privateKey = fs.readFileSync('/etc/letsencrypt/live/pwa.danilozekovic.com/privkey.pem'),
  certificate = fs.readFileSync('/etc/letsencrypt/live/pwa.danilozekovic.com/fullchain.pem'),
  options = {key:privateKey, cert:certificate}

// redirect all http requests to https
http.createServer(function(req, res) {
  res.writeHead(301, {'Location':'https://' + req.headers['host'] + req.url });
  res.end();
}).listen(80);


var server = https.createServer(options, app)

// compress outbound service
app.use(compression())

// cors allows fetching images on local-hosted server
// app.use(cors())

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use('/', router)

app.use(express.static(path.join(__dirname, '/public')))

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname, 'public','index.html'));
})

server.listen(443)
console.log(
  'Express server listening on port %d in %s mode',
  server.address().port, app.settings.env
)
