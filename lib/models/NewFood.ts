import mongoose, { Schema } from "mongoose";

type NewFoodSchemaType = {
  name: string;
  price: number;
  ingredients: string;
  categoryId: string;
  image: string;
};

const NewFoodSchema = new Schema(
  {
    name: String,
    price: Number,
    ingredients: String,
    categoryId: {
      type: Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    image: String,
  },
  { timestamps: true }
);

export const NewFood =
  mongoose.models.NewFood ||
  mongoose.model<NewFoodSchemaType>("NewFood", NewFoodSchema);
