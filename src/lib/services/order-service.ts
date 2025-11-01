import { Order, OrderSchemaType } from "../models/Order";
import { User } from "../models/User";
import connectDB from "../mongodb";
import { OrderItemType } from "../utils/types";

export const createOrder = async ({
  userId,
  cartItemsTotalPrice,
  cartFoods,
}: {
  userId: string;
  cartItemsTotalPrice: number;
  cartFoods: OrderItemType[];
}) => {
  console.log(userId);
  await connectDB();
  const newOrder = new Order({
    userId: userId,
    totalPrice: cartItemsTotalPrice,
    foodOrderItems: cartFoods,
    status: "PENDING",
  });
  await newOrder.save();
  return newOrder;
};

export const getAllOrders = async () => {
  await connectDB();
  User;
  const orders: OrderSchemaType[] = await Order.find().populate("userId");
  return orders;
};

export const updateOrder = async (orderId: string, newStatus: string) => {
  await connectDB();
  const updateOrder = await Order.findByIdAndUpdate(orderId, {
    status: newStatus,
  });
  return updateOrder;
};
