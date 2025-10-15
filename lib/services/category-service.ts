import connectDB from "../mongodb";
import { Category } from "../models/Category";
import { CategoryType } from "../utils/types";
import { NewFood } from "../models/NewFood";

export const createCategory = async (categoryName: string) => {
  await connectDB();
  const newCategory = new Category({ categoryName });
  await newCategory.save();
  return newCategory;
};

export const getAllCategories = async () => {
  await connectDB();
  const allCategories: CategoryType[] = await Category.find();
  return allCategories;
};

export const deleteCategoryById = async (id: string) => {
  await connectDB();
  await Category.findByIdAndDelete(id);
  return await Category.find();
};
