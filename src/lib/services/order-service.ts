import { Order, OrderSchemaType } from "../models/Order";
import { User } from "../models/User";
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
    totalPrice: cartItemsTotalPrice,
    foodOrderItems: cartFoods,
    status: "PENDING",
  });
  await newOrder.save();
  return newOrder;
};

export const getAllOrders = async () => {
  await connectDB();
  // User;
  const orders: OrderSchemaType[] = await Order.find();
  return orders;
};
// .populate("user")
