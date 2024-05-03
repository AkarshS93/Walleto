import mongoose from 'mongoose';

const connectDb = async () => {
  mongoose.set('strictQuery', true);

  try {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb+srv://akarshshrivastava:XOsmL888rId7tklu@cluster0.paay6cm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
 
    // Query the database using the model
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDb;


