const fs = require("fs");
const path = require("path");
const Cluster = require("./Cluster");

class Database {
    constructor(name, description) {
        this.name = name || "defaultName";
        this.description = description || "Default description";
        this.defaultDbPath = "DB/data.json";
        this.clusters = [];
    }

    /**
     * Function used for initializing the database.
     * @param {string} name
     * @param {string} description
     * @param {boolean} override
     * @returns {string} - Returns a string that says if the database was initialized or not.
     */
    initializeDatabase(name = "defaultName", description = "default description", override = false) {
        if (!fs.existsSync(this.defaultDbPath) || override) {
            const db = new Database(name, description);
            this.saveJSON(db);
        }
        return "Database initialized!"
    }


    /**
     * Function used for loading the database.
     * @returns {Database} - Returns the database object.
     */
    loadJSON() {
        return fs.existsSync(this.defaultDbPath)
            ? JSON.parse(fs.readFileSync(this.defaultDbPath))
            : "";
    }

    /**
     * Function used for saving the database.
     * @param {Database} json - The database object that you want to save.
     * @returns {string} - Returns a string that says if the database was saved or not.
     */
    saveJSON(json) {
        return fs.writeFileSync(
            this.defaultDbPath,
            JSON.stringify(json)
        );
    }

    /**
     * Function used for creating a cluster.
     * @param {string} name - The name of the cluster that you want to create.
     * @param {string} description - The description of the cluster that you want to create.
     * @returns {Cluster} - Returns the cluster object.
     */
    createCluster(name= "Cluster1", description= "ClusterDescription") {
        const c = new Cluster();
        return c.createCluster(name, description);
    }

    /**
     * Sorts the data inside cluster by the sorter. The data must be objects.
     * @returns {array} sorted data
     * @param {Cluster} cluster - The cluster that you want to sort.
     * @param sorter - The sorter that you want to sort by.
     */
    sortClusterDataByObjects(cluster, sorter) {
        cluster.data.sort((a, b) => {
            if (a[sorter] < b[sorter]) {
                return -1;
            }
            if (a[sorter] > b[sorter]) {
                return 1;
            }
            return 0;
        });
        return cluster;
    }

    /**
     * Sorts the data inside cluster by the sorter. The data must be strings or numbers.
     * @returns {array} sorted data
     * @param {Cluster} cluster - The cluster that you want to sort.
     */
    sortClusterDataNoneObjects(cluster) {
        cluster.data.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });
        return cluster.data;
    }

    /**
     * Function used for adding a cluster to the database.
     * @param {Cluster} cluster - The cluster object that you want to add to the database.
     * @returns {string} - Returns a string that says if the cluster was added or not.
     */
    addCluster(cluster) {
        const db = this.loadJSON();
        if (!cluster.clusterName || !cluster.clusterDescription || !cluster.data) throw new Error("Your cluster doesn't either have name, description or data array!");
        db.clusters.push(cluster);
        this.saveJSON(db);
        return "Cluster added!";
    }

    /**
     * Function used for getting all the clusters in the database.
     * @returns {array} - Returns an array of all the clusters in the database.
     */
    getAllClusters() {
        const db = this.loadJSON();
        return db.clusters;
    }

    /**
     * Function used for getting a cluster by its name.
     * @param {string} clusterName - The name of the cluster that you want to get.
     * @returns {Cluster} - Returns the cluster object.
     */
    getClusterByName(clusterName) {
        const db = this.loadJSON();
        const clusters = db.clusters;
        for (const cluster of clusters) {
            if (cluster.clusterName === clusterName) return cluster;
        }
    }

    /**
     * Function used for getting a cluster by its id.
     * @param {string} clusterId - The id of the cluster that you want to get.
     * @returns {Cluster} - Returns the cluster object.
     */
    getClusterById(clusterId) {
        const db = this.loadJSON();
        const clusters = db.clusters;
        for (const cluster of clusters) {
            if (cluster._id === clusterId) return cluster;
        }
    }

    /**
     * Function used for deleting a cluster by its name.
     * @param {string} clusterName - The name of the cluster that you want to delete.
     * @returns {string} - Returns a string that says if the cluster was deleted or not.
     */
    deleteClusterByName(clusterName) {
        const db = this.loadJSON();
        for (let i = 0; i < db.clusters.length; i++) {
            if (db.clusters[i].clusterName === clusterName) {
                db.clusters.splice(i, 1);
            }
        }
        this.saveJSON(db);
        return "Cluster deleted!";
    }

    /**
     * Function used for deleting a cluster by its id.
     * @param {string} clusterId - The id of the cluster that you want to delete.
     * @returns {string} - Returns a string that says if the cluster was deleted or not.
     */
    deleteClusterById(clusterId) {
        const db = this.loadJSON();
        for (let i = 0; i < db.clusters.length; i++) {
            if (db.clusters[i]._id === clusterId) {
                db.clusters.splice(i, 1);
            }
        }
        this.saveJSON(db);
        return "Cluster deleted!";
    }

    /**
     * Function used for updating a cluster by its id.
     * @param {string} clusterId - The id of the cluster that you want to update.
     * @param {Cluster} newCluster - The new cluster object that you want to replace the old one with.
     * @returns {string} - Returns a string that says if the cluster was updated or not.
     */
    updateClusterById(clusterId, newCluster) {
        const db = this.loadJSON();
        for (let i = 0; i < db.clusters.length; i++) {
            if (db.clusters[i]._id === clusterId) {
                db.clusters[i] = newCluster;
            }
        }
        this.saveJSON(db);
        return "Cluster updated!";
    }

    /**
     * Function used for updating a cluster by its name.
     * @param {string} clusterName - The name of the cluster that you want to update.
     * @param {Cluster} newCluster - The new cluster object that you want to replace the old one with.
     * @returns {string} - Returns a string that says if the cluster was updated or not.
     */
    updateClusterByName(clusterName, newCluster) {
        const db = this.loadJSON();
        for (let i = 0; i < db.clusters.length; i++) {
            if (db.clusters[i].clusterName === clusterName) {
                db.clusters[i] = newCluster;
            }
        }
        this.saveJSON(db);
        return "Cluster updated!";
    }
}

module.exports = new Database();