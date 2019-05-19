/***
 * Start an instance of Node-Red under Express.JS
 *
 * Allows multiple instances of Node-Red to be run, even different versions in parallel.
 ***/

"use strict" /* always for Node.JS, never global in the browser */;

// The TCP port for this systems web interface - picked up from env, package.json or fixed value

const http_port = process.env.PORT || 3000;
const use_https =  process.env.USEHTTPS ||  process.env.npm_package_config_use_https == "true" || false;

const http = use_https ? require("https") : require("http");

const express = require("express"); // THE std library for serving HTTP
const RED = require("node-red");
var nrSettings = require("./settings.js"); // Node-Red settings file
const fs = require("fs");

// Create an Express app
var app = express();

// Add a simple route for static content served from './public'
app.use("/", express.static("public"));

// Add static route for bower components from './bower_components'
app.use("/bower_components", express.static("bower_components"));

// Create the http(s) server
if (use_https) {
  var privateKey = fs.readFileSync("server.key", "utf8");
  var certificate = fs.readFileSync("server.crt", "utf8");
  var credentials = {
    key: privateKey,
    cert: certificate
  };
}
var httpServer = use_https
  ? http.createServer(credentials, app)
  : http.createServer(app);

// Initialise the runtime with a server and settings
// @see http://nodered.org/docs/configuration.html
RED.init(httpServer, nrSettings);

// Serve the editor UI from /admin
app.use(nrSettings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes from /
app.use(nrSettings.httpNodeRoot, RED.httpNode);

app.listen(http_port, function () {
  if (http_port === 3000) {
    console.log(`http://localhost:${http_port}`)
  }
});

// Start the runtime
RED.start();
