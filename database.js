const fs = require("fs");
const path = require("path");

const defaultDbPath = "DB/data.json";
const preparedJSON = {
  moduleName: "",
  data: [],
};

function generateId() {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
}

function addData(dataDictionary) {
  dataDictionary["_id"] = generateId();
  let JsonFile = loadJSON(defaultDbPath);
  console.log(JsonFile);
  JsonFile.data.push(dataDictionary);
  saveJSON(defaultDbPath, JsonFile);
}

function loadJSON(filepath = defaultDbPath) {
  return fs.existsSync(path.resolve(__dirname, filepath))
    ? JSON.parse(fs.readFileSync(path.resolve(__dirname, filepath)))
    : "";
}

function saveJSON(filepath = defaultDbPath, json = "") {
  return fs.writeFileSync(
    path.resolve(__dirname, filepath),
    JSON.stringify(json)
  );
}

function initializeDatabase(databaseName = "Super Cool Database") {
  console.log("Initializing database...");
  let modifiedJSON = preparedJSON;
  modifiedJSON.moduleName = databaseName;
  saveJSON(defaultDbPath, modifiedJSON);
  console.log(`Database "${databaseName}" initialized!`);
}

module.exports = {
  addData,
  initializeDatabase,
  loadJSON,
};
