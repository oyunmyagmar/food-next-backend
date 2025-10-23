import { Order } from "../models/Order";
import connectDB from "../mongodb";
import { OrderItemType } from "../utils/types";

export const createOrder = async ({
  cartFoods,
  cartItemsTotalPrice,
}: {
  cartFoods: OrderItemType[];
  cartItemsTotalPrice: number;
}) => {
  await connectDB();
  const newOrder = new Order({
    foodOrderItems: cartFoods,
    totalPrice: cartItemsTotalPrice,
    status: "PENDING",
  });
  await newOrder.save();
  return newOrder;
};
