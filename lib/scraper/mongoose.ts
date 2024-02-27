import mongoose from "mongoose";

let isConnected: boolean = false; //Variable to track the connection status

export const connectToDatabase = async () => {

    mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI)
    return console.log("=> no MongoDB URI is found in .env file");

  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  console.log("=> using new database connection");

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log("=> Database connected successfully!");
  } catch (error) {
    console.log(error);
  }

  // CoGEN  const db = await mongoose.connect(process.env.MONGODB_URI as string, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });

  //   isConnected = db.connections[0].readyState;
};
