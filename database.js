const fs= require("fs");
const path = require("path");

const defaultDbPath = "DB/data.json";
const dbJSON = {
  dbName: "",
  description: "",
  clusters: [],
};

const clusterJSON = {
  _id: "",
  clusterName: "",
  description: "",
  data: [],
}

function generateId() {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
}

function createCluster(name = "Cluster1", description =  "ClusterDescription") {
  const cluster = { ...clusterJSON };
  cluster._id = generateId();
  cluster.clusterName = name;
  cluster.description = description;
  return cluster;
}

function addCluster(cluster) {
  const db = loadJSON();
  if (!cluster.clusterName || !cluster.description || !cluster.data) throw new Error("Your cluster doesn't either have name, description or data array!");
  db.clusters.push(cluster);
  saveJSON(defaultDbPath, db);
}

function getClusterByName(clusterName) {
  const db = loadJSON();
  const clusters = db.clusters;
  for (const cluster of clusters) {
    if (cluster.clusterName === clusterName) return cluster;
  }
}

function createAndAddEmptyCluster(name = "Cluster1", description =  "ClusterDescription") {
  addCluster(createCluster(name, description));
}

function initializeDatabase(name = "defaultName", description = "default description") {
  const db = { ...dbJSON };
  db.dbName = name;
  db.description = description;
  saveJSON(defaultDbPath, db);
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

module.exports = {
  createCluster,
  addCluster,
  initializeDatabase,
  getClusterByName,
  createAndAddEmptyCluster
}