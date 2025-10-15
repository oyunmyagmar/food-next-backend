import mongoose, { Schema } from "mongoose";

type CategorySchemaType = {
  categoryName: string;
};

const CategorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category ||
  mongoose.model<CategorySchemaType>("Category", CategorySchema);
