// TODO: Initialize variables (set port variable, and import http, httpStatus, fs, path modules)
var http = require("http");
var httpStatus = require("http-status");
var fs = require("fs");
var path = require("path");

const port = 8000;

// Import resources for API
const resources = require("./models/resources");

// Create error handling / response
const sendErrorResponse = (res) => {
  res.writeHead(httpStatus.NOT_FOUND, {
    "Content-Type": "text/html",
  });
  res.end("<h1>Resource not found</h1>");
};

function requestHandler(req, res) {
  if (req.url === "/") {
    res.end("Welcome");
  } else {
    sendErrorResponse(res);
  }
}

// Create Web Server
const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`The server has started and is listening on port number: ${port}`);
});

server.on("request", (req, res) => {
  // Implement healthcheck URL at /healthcheck
  if (req.url === "/healthcheck") {
    res.writeHead(httpStatus.OK, { "Content-Type": "text/plain" });
    res.end("Health check OK");
  }

  // Implement static file system and serve /views/index.html
  else if (req.url === "/views/index.html") {
    fs.readFile(path.join(__dirname, "views", "index.html"), (error, data) => {
      if (error) {
        sendErrorResponse(res);
      } else {
        res.writeHead(httpStatus.OK, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }

  // Add a basic api to serve resources.js
  else if (req.url == "/api/resources") {
    res.writeHead(httpStatus.OK, { "Content-Type": "application/json" });
    res.end(JSON.stringify(resources));
  } else {
    sendErrorResponse(res);
  }
});
