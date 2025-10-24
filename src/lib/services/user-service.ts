import { User, UserSchemaType } from "../models/User";
import connectDB from "../mongodb";

export const createUser = async (email: string, password: string) => {
  await connectDB();
  const newUser = new User({ email, password });
  await newUser.save();
  return newUser;
};

export const updateUser = async (id: string, address: string) => {
  await connectDB();
  const updateUser = await User.findByIdAndUpdate(id, { address });
  return updateUser;
};

export const getAllUsers = async () => {
  await connectDB();
  const allUsers: UserSchemaType[] = await User.find();
  return allUsers;
};
