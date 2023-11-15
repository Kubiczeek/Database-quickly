const calsses = require("./deafult.classes.js");

const ClusterSchema = {
    name: calsses.string,
    description: calsses.string,
    data: calsses.array,
}

module.exports = {
    ClusterSchema,
}