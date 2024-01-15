import mongoose, { Connection } from 'mongoose';

let db: Connection;

export const connectToDatabase = async () => {
  try {
    // Replace 'your_mongodb_connection_string' with your actual MongoDB connection string
    await mongoose.connect('mongodb+srv://MouadBounfil:MouadBounfil@nextjs1.cuwi0pa.mongodb.net/?retryWrites=true&w=majority');

    db = mongoose.connection;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};
