import mongoose from "mongoose";
//  const URL = `mongodb://user:prerit@ac-fbxjxnm-shard-00-00.pkhc2e2.mongodb.net:27017,ac-fbxjxnm-shard-00-01.pkhc2e2.mongodb.net:27017,ac-fbxjxnm-shard-00-02.pkhc2e2.mongodb.net:27017/?ssl=true&replicaSet=atlas-9szjby-shard-0&authSource=admin&retryWrites=true&w=majority`;


const connection = async (username,password) => {
  const URL = `mongodb://${username}:${password}@ac-fbxjxnm-shard-00-00.pkhc2e2.mongodb.net:27017,ac-fbxjxnm-shard-00-01.pkhc2e2.mongodb.net:27017,ac-fbxjxnm-shard-00-02.pkhc2e2.mongodb.net:27017/?ssl=true&replicaSet=atlas-9szjby-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Database connect Successfully');
  } catch (error) {
    console.log("Error while connecting with the database ", error);
  }
};
export default connection;
