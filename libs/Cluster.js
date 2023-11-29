class Cluster {
    /**
     * Creates new Cluster.
     * @param {string} clusterName - Name of the cluster
     * @param {string} clusterDescription - Description of the cluster
     * @param {string} clusterId - ID of the cluster
     */
    constructor(clusterName, clusterDescription, clusterId) {
        this._id = clusterId;
        this.clusterName = clusterName;
        this.clusterDescription = clusterDescription;
        this.data = [];
    }

    generateId() {
        return (
            Date.now().toString(36) +
            Math.floor(
                Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
            ).toString(36)
        );
    }

    /**
     * Creates new cluster.
     * @returns {Cluster} - New Empty Cluster
     * @param name
     * @param description
     */
    createCluster(name = "Cluster1", description =  "ClusterDescription") {
        return new Cluster(name, description, this.generateId());
    }

    /**
     * Sorts the data inside cluster by the sorter. The data must be objects.
     * @param {string} sorter
     * @returns {array} sorted data
     */
    sortDataByObjects(sorter) {
        this.data.sort((a, b) => {
            if (a[sorter] < b[sorter]) {
                return -1;
            }
            if (a[sorter] > b[sorter]) {
                return 1;
            }
            return 0;
        });
        return this.data;
    }

    /**
     * Sorts the data inside cluster by the sorter. The data can't be objects.
     * @returns {array} sorted data
     */
    sortDataNoneObjects() {
        this.data.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });
        return this.data;
    }
}

module.exports = Cluster;