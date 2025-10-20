import connectDB from "../mongodb";

export const createUser = async () => {
  await connectDB();
};
