import { User } from "../models/User";
import connectDB from "../mongodb";

export const createUser = async (email: string, password: string) => {
  await connectDB();
  const newUser = new User({ email, password });
  await newUser.save();
  return newUser;
};

export const editUser = async (email: string, address: string) => {
  await connectDB();
  // const updateUser = await User.findOneAndUpdate(email,)
};
