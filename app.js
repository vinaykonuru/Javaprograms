const CONFIG = require('./config');

const express = require('express');
const app = express();
let router = express.Router();

app.use(express.static(__dirname + "/views"));
app.use(CONFIG.rootPath, router);
app.listen(CONFIG.port, function(){
  console.log("Game Application has started at http://localhost:8080" + CONFIG.rootPath + "/index.html");
});
