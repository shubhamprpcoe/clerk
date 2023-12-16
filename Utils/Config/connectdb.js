import mongoose from 'mongoose';

const connectToDataBase = async (DATABASE_URL) => {
  try {
    const DB_OPTION = {
      dbName: 'stockAppUsers'
    };
    await mongoose.connect(DATABASE_URL, DB_OPTION);
  } catch (error) {
    console.log(`error while connecting DataBase (connectdb.js) ,${error}`);
  }
};

module.exports = connectToDataBase;
