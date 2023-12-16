import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {} from 'dotenv/config';
import { connectToDataBase } from './Utils/Config/connectdb.js';

const app = express();

// CORS policy
app.use(cors(
  { credentials: true, origin: 'http://localhost:3000' }
));

// cookieParser
app.use(cookieParser());

const { DATABASE_URL, PORT } = process.env;
const port = PORT || 5000;

// Connect to Database
connectToDataBase(DATABASE_URL);

app.use(express.json());

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
