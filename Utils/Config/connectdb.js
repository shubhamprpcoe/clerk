import mongoose from 'mongoose';

export const connectToDataBase = async (DATABASE_URL) => {
  try {
    const DB_OPTION = {
      dbName: 'clerk'
    };
    await mongoose.connect(DATABASE_URL, DB_OPTION);
  } catch (error) {
    console.log(`error while connecting DataBase (connectdb.js) ,${error}`);
  }
};
