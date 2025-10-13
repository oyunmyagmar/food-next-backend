import mongoose, { Schema } from "mongoose";

type FoodSchemaType = {
  foodName: string;
  price: number;
  ingredients: string;
  category: string;
  image: string;
};

const FoodSchema = new Schema({
  foodName: String,
  price: Number,
  ingredients: String,
  category: String,
  image: String,
});

export const Food =
  mongoose.models.Food || mongoose.model<FoodSchemaType>("Food", FoodSchema);
