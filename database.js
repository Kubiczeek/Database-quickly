const fs = require("fs");
const path = require("path");

const defaultSchmeas = require("./Defaults/deafult.schema.js");

const defaultDbPath = "DB/data.json";
const dbJSON = {
  dbName: "",
  description: "",
  clusters: [],
};

const clusterJSON = {
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

function createCluster(name, description) {
  if (!name) throw new Error("Cluster name is required");
  if (typeof name !== defaultSchmeas.ClusterSchema.name) throw new Error("Cluster name must be a string");
  if (typeof description !== defaultSchmeas.ClusterSchema.description) throw new Error("Cluster description must be a string");
  const cluster = { ...clusterJSON };
  cluster.clusterName = name;
  cluster.description = description;
  return cluster;
}

function addCluster(cluster) {
  const db = loadJSON();
  if (cluster.name === "") throw new Error("Cluster name is required");
  if (typeof cluster.name !== defaultSchmeas.ClusterSchema.name) throw new Error("Cluster name must be a string");
  if (typeof cluster.description !== defaultSchmeas.ClusterSchema.description) throw new Error("Cluster description must be a string");
  if (typeof cluster.data !== defaultSchmeas.ClusterSchema.data) throw new Error("Cluster data must be an array");
  db.clusters.push(cluster);
  saveJSON(defaultDbPath, db);
}

function initializeDatabase(name, description) {
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
}