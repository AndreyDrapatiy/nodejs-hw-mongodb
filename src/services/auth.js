import User from '../db/models/User.js';

export const registerUser = async (payload) => await User.create(payload);
