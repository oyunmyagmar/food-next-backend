import mongoose, { Schema } from "mongoose";
import { NewFoodSchema, NewFoodSchemaType } from "./NewFood";

export type OrderSchemaType = {
  userId: string;
  totalPrice: number;
  foodOrderItems: {
    food: NewFoodSchemaType;
    quantity: number;
  }[];
  status: string;
};

const FoodOrderItem = new Schema({
  food: NewFoodSchema,
  quantity: Number,
});

export const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    totalPrice: { type: Number, required: true },
    foodOrderItems: { type: [FoodOrderItem], required: true },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "CANCELED", "DELIVERED"],
    },
  },
  { timestamps: true }
);
export const Order =
  mongoose.models.Order ||
  mongoose.model<OrderSchemaType>("Order", OrderSchema);
