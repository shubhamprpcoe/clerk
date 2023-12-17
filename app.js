import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {} from "dotenv/config";
import { connectToDataBase } from "./Utils/Config/connectdb.js";
import { router } from "./Router/SignUpRoute.js";
import {
  amqplib_CreateChannel,
  amqplib_PublishChannel,
  amqplib_SubscribeChannel,
} from "./Utils/RabitMq/RabitMq.js";

const app = express();

// CORS policy
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// cookieParser
app.use(cookieParser());

const { DATABASE_URL, PORT, BINDING_KEY } = process.env;
const port = PORT || 5000;

// Connect to Database
connectToDataBase(DATABASE_URL);

app.use(express.json());


// // connect to rabirmq channel (queue name, special binding key of exchanage to queue)
// export let channel = await amqplib_CreateChannel("st1", "newQuw");

// //Publish data to queue(  channel of connection, queue name, special binding key of exchanage to queue , and messsage we want to share )
// await amqplib_PublishChannel(
//   channel,
//   "st1",
//   BINDING_KEY,
//   "nwhhvvvvvvvvvvvvvvvvvhsss"
// );

// //revive data from queue (channel of connection, queue name, special binding key of exchanage to queue)
// await amqplib_SubscribeChannel(channel, "st1", BINDING_KEY);


// Define a route

app.use("/SignUpRoute", router);

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
