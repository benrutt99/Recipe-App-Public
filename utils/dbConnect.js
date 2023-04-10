import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log(`Connected to database: ${mongoUrl}`);
  } catch (error) {
    console.error(`Error connecting to database: ${mongoUrl}`, error);
  }
}

export default dbConnect;
