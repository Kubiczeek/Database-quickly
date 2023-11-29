# NoSQLDatabaseJS
Welcome to my little **side** project! It's simple "json" database.
To use it:
1. Download this repo 🚀
2. Put the `NoSQLDatabaseJS` folder into your project 📁
3. Import it using `const Database = require("./NoSQLDatabaseJS/libs/Database.js");` 🔃
4. Have fun! ❤️

There are plenty of functions to use, make sure to check them out!

```js
const Database = require("./NoSQLDatabaseJS/libs/Database.js");
  
console.log(Database.initializeDatabase("Test1", "Test2", true));  
  
let cluster1 = Database.createCluster();  
  
let cluster2 = Database.createCluster("Cluster2");  
  
Database.addCluster(cluster1);  
Database.addCluster(cluster2);  
  
console.log(Database.getAllClusters());  
  
cluster1.clusterName = "UpdatedClusterName";  
cluster2.clusterName = "UpdatedClusterNameNumber2";  
  
Database.updateClusterByName("Cluster1", cluster1);  
Database.updateClusterById(cluster2._id, cluster2);  
  
console.log(Database.getAllClusters());  
  
Database.deleteClusterByName("UpdatedClusterName");  
Database.deleteClusterById(cluster2._id);  
  
console.log(Database.getAllClusters());
```

If you have any questions, make sure to contact me on **Discord** `kubiczeek`