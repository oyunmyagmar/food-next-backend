import mongoose, { Schema } from "mongoose";
import { NewFoodSchema, NewFoodSchemaType } from "./NewFood";

type OrderSchemaType = {
  totalPrice: number;
  foodOrderItems: {
    quantity: number;
    food: NewFoodSchemaType;
  }[];
  status: string;
};

const FoodOrderItem = new Schema({
  quantity: Number,
  food: NewFoodSchema,
});

const OrderSchema = new Schema(
  {
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
