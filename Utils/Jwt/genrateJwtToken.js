import jwt from 'jsonwebtoken';
// const { JWT_SECRET_KEY } = process.env;

// Genrating JWT by user ID

export async function genrateJwtToken (userDbField) {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const token = await jwt.sign({ userID: userDbField._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
    console.log(token);
    return token;
  } catch (error) {
    console.log('problem genrating jwt');
  }
  return null;
}

// verifing user by providing enccrypted token from user header
// and getting user id in database
// @para enccrypted token from user
// @return userID
export function verifyJwtToken (headerBearerToken) {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const { userID } = jwt.verify(headerBearerToken, process.env.JWT_SECRET_KEY);
    console.log(userID, 'userID');
    return userID;
  } catch (error) {
    console.log('problem verifying jwt');
  }
  return null;
}
