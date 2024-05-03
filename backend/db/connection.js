import mongoose from 'mongoose';

const connectDb = async () => {
  mongoose.set('strictQuery', true);

  try {
    // Connect to the MongoDB database
    await mongoose.connect("mongodb://localhost:27017/users");
 
    // Query the database using the model
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDb;


