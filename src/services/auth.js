import User from '../db/models/User.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) throw createHttpError(409, 'Email already in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};
