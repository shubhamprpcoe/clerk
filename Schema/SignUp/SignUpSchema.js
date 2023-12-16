import Mongoose from 'mongoose';
const UserSchema = new Mongoose.Schema({
  Name: { type: String, require: true, trim: true },
  Email: { type: String, require: true, trim: true },
  Password: { type: String, require: true, trim: true }
});

export const UserSignUpModel = Mongoose.model('user', UserSchema);
