const http = require("http");
const mongodb = require("mongodb");

let db;
const connectString = "mongodb+srv://janob_Jay:6Y8oSwhZKx881AlL@cluster0.xfidt4d.mongodb.net/"

mongodb.connect(
connectString, 
{
  useNewUrl: true, 
  useUnifiedTopology: true,
}, 
(err, client) => {
  if(err) console.log("ERROR on connection MongoDB");
  else {
    console.log("MongoDB connection suceed");
    module.exports = client;
    const app = require("./app");
    const server = http.createServer(app); 
    let PORT = 3000;
    server.listen(PORT, function () {
      console.log(
        `The server is running succesfully on port: ${PORT}, http://localhost:${PORT}`
      );       
    });
   }  
  }
);

