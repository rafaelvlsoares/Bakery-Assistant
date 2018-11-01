const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
//const manifestParser = require("js-yaml")
const cfenv = require("cfenv");
const fs = require('fs');

const conversationRouter = require('./routes/assistant.router')();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Credentials",
    "true"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));

app.use('/api/v1', conversationRouter);

const configfileName = path.join(__dirname, "/public/assets/back_config.json");

//const manifest = manifestParser.safeLoad(fs.readFileSync(path.join(__dirname,'/manifest.yml'), 'utf8'))

const appEnv = cfenv.getAppEnv()

if(appEnv.isLocal){
  // var file = require(configfileName);
  // file.url = manifest.applications[0].routes[0].route || "localhost:3000"
  console.log("Is local")
}else{
  //console.log(JSON.stringify(manifest))
  console.log(configfileName)
  try{
    var file = require(configfileName);
    file.url = appEnv.url
    console.log(file)
    fs.writeFile(configfileName, JSON.stringify(file), function (err) {
      if (err) return console.log(err);
      //console.log(JSON.stringify(file));
      console.log('writing to ' + configfileName);
    });
  }catch(err){
    console.log(err)
  }
}

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
