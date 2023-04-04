import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_URL;

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(mongoUrl, {
    useNewURLParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
}

export default dbConnect;
//
