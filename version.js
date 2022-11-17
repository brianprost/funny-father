// modify the version number in package.json to be YYYYMMDD.69420
// where YYYYMMDD is the current date

var fs = require("fs");
var path = require("path");

var packageJsonPath = path.join(__dirname, "package.json");
var packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
var date = new Date();
var dateString =
  date.getFullYear() +
  `0${date.getMonth() + 1}`.slice(-2) +
  `0${date.getDate()}`.slice(-2);
var newVersion = `${dateString}.${Math.floor(Math.random() * 100000)}`;
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
