import express from 'express';

// const { userRegistration, userLogIn } = require("../controllers/signup/userRegistration");
// const isUserAuthenticate = require("../middleWare/authentication/authenticationMiddleware");
// const { resetUserPassword } = require("../controllers/signup/userRegistration");
import { userRegistration } from '../controllers/UserRegistration.js';
export const router = express.Router();

// Home page route.
router.all('/', userRegistration);
// router.all('/logIn', userLogIn);
// router.all('/resetpass', isUserAuthenticate, resetUserPassword);
