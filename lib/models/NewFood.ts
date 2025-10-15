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
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: { type: String, required: true },
    categoryId: {
      type: Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const NewFood =
  mongoose.models.NewFood ||
  mongoose.model<NewFoodSchemaType>("NewFood", NewFoodSchema);
