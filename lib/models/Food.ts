import mongoose, { Schema } from "mongoose";
import { Category } from "./Category";

type FoodSchemaType = {
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
};

const FoodSchema = new Schema({
  foodName: String,
  price: Number,
  ingredients: String,
  image: String,
});

export const Food =
  mongoose.models.Food || mongoose.model<FoodSchemaType>("Food", FoodSchema);
