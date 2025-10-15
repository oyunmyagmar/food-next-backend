import { Category } from "../models/Category";
import { NewFood } from "../models/NewFood";
import connectDB from "../mongodb";
import { newFoodType } from "../utils/types";

export const createNewFood = async (newFoodData: newFoodType) => {
  await connectDB();
  const newNewFood = new NewFood({ ...newFoodData });
  await newNewFood.save();
  return newNewFood;
};

export const getNewAllFoods = async () => {
  await connectDB();
  Category;
  const newAllFoods: newFoodType[] = await NewFood.find().populate(
    "categoryId"
  );
  return newAllFoods;
};
