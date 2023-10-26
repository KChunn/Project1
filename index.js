// TODO: Initialize variables (set port variable, and import http, httpStatus, fs, path modules)

var http = require("http");
const port = 8000;

// Import resources for API
const resources = require("./models/resources");

// Create error handling / response
const sendErrorResponse = (req, res) => {
  res.writeHead(httpStatus.NOT_FOUND, {
    "Content-Type": "text/html",
  });
  
  
  // TODO: Implement res.end with error message in h1 tags with text "Resource not found"
};
function requestHandler(req, res) {
  if (req.url === "/") {
    res.end("Welcome");
  }  else {
    res.end(h1, "Resource File not found.");
  }
}
// Create Web Server
const server = http.createServer(function (req, res) {
  // Implement healthcheck URL at /healthcheck
  if (req.url === "/healthcheck") {
    // TODO: Implement healthcheck code here
  }

  // Implement static file system and serve /views/index.html
  // ** OPTIONAL: Setup dynamic reading and serving of other static files (Hint: see lesson 6.1 Wexxler)
  else if (req.url === "/views/index.html") {
    fs.readFile(path.join(__dirname, "views", "index.html"), (error, data) => {
      if (error) {
        sendErrorResponse(res);
      }
      // TODO: Implement res.writehead to send header information - 200 response content type html
      // TODO: Implement res.end to send data
    });
  }

  // Add a basic api to serve resources.js
  else if (req.url == "/api/resources") {
    // TODO: Implement res.writeHead to send httpStatus.OK with JSON content type
    // TODO: Implement res.end and use JSON.stringify to return resources
  } else {
    sendErrorResponse(res);
  }
});

server.listen(port); // listen for any incoming requests;

console.log(`The server has started and is listening on port number: ${port}`);
