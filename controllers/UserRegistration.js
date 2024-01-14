import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { genrateJwtToken } from "../Utils/Jwt/genrateJwtToken.js";
import { UserSignUpModel } from "../Schema/SignUp/SignUpSchema.js";

import {rabbitMqChannelToPublishData} from "../app.js";
import {
  amqplib_CreateChannel,
  amqplib_PublishChannel,
  amqplib_SubscribeChannel,
} from "../Utils/RabitMq/RabitMq.js";
const {  BINDING_KEY } = process.env;


export const userRegistration = async (req, res) => {
  const { name, email, password, cofirmationPassword } = req.body;
  console.log(name, email, password, cofirmationPassword, req.body);
  // checking if all fild are present if yes then is email already exist if no then create a newUser
  if (
    name &&
    email &&
    password &&
    cofirmationPassword &&
    password === cofirmationPassword
  ) {
    // isEmailAlredyExist has all model filds retun from db
    const isEmailAlredyExist = await UserSignUpModel.findOne({ Email: email });
    if (isEmailAlredyExist) {
      return res
        .status(409)
        .send({ status: "failed", message: "email already exist 1" });
    }
    try {
      // bycrypting password before saveing to dataBase
      const salt = await bcrypt.genSalt(12);
      console.log(salt);
      const hashedPassword = await bcrypt.hash(password.toString(), salt);
      console.log(hashedPassword);

      // saveing data to DataBase after validation
      const listingInfoToDb = new UserSignUpModel({
        Name: name,
        Email: email,
        Password: password,
      });
      await listingInfoToDb.save();

      // data after saving user to db

      const savedUserAllFieldData = await UserSignUpModel.findOne({
        Email: email,
      });

      // implementing JWT

      const token = await genrateJwtToken(savedUserAllFieldData);

      // SetCoolies will expire in d days time in milisecound
      console.log("cookie tokentokentokentoken", token);
      let tokenExpairedata = new Date(Number(new Date()) + 518400000)
      const cookiesOption = {
        expires: tokenExpairedata,
        httpOnly: true,
      };
      res.cookie("userName", token, cookiesOption);
      //send data to redis by reabit mq
      //Publish data to queue(  channel of connection, queue name, special binding key of exchanage to queue , and messsage we want to share )
      let rabbitMqDataIoSendinStr = JSON.stringify({token : token, expires: tokenExpairedata})
      await amqplib_PublishChannel(
        rabbitMqChannelToPublishData,
        "st1",
        BINDING_KEY,
        rabbitMqDataIoSendinStr
      );
      console.log("coodjcskdhcbsjdvcdscvhdgs", token);

      return res
        .status(200)
        .send({
          status: "success",
          message: " registration successfull",
          token,
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "failed", message: error });
    }
  } else {
    return res
      .status(406)
      .send({ status: "failded", message: "filds are missing 3" });
  }
};

// export const userLogIn = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (email && password) {
//       const isEmailAlredyExist = await UserSignUpModel.findOne({ Email: email });
//       if (isEmailAlredyExist != null) {
//         const isuserPasswordMatche = await bcrypt.compare(password, isEmailAlredyExist.Password);

//         if (isuserPasswordMatche && email === isEmailAlredyExist.Email) {
//           return res.status(200).send({ status: 'success', message: ' user loged in ' });
//         }

//         return res.status(401).send({ status: 'failed', message: ' not a register user 72' });
//       }
//       return res.status(403).send({ status: 'failed', message: ' not a register user 74' });
//     }
//     return res.status(401).send({ status: 'failed', message: ' not a register user 76' });
//   } catch (error) {
//     return res.status(401).send({ status: 'failed', message: ' not a register user 78' });
//   }
// };

// // if user want to change older password to new
// export const resetUserPassword = async (req, res) => {
//   const { email, password, newPassword } = req.body;
//   if (email && password && newPassword) {
//     // bycrypting password before saveing to dataBase
//     const salt = await bcrypt.genSalt(12);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     // listing updated password to db
//     console.log(req.user[0]);
//     await UserSignUpModel.findByIdAndUpdate(req.user[0], { Password: hashedPassword });

//     res.status(222).send({ status: 'successfull', message: 'password reset ' });
//   } else {
//     return res.status(406).send({ status: 'failded', message: 'filds are missing (userRegistration)' });
//   }
// };
