import { Order, OrderSchemaType } from "../models/Order";
import { User } from "../models/User";
import connectDB from "../mongodb";
import { OrderItemType } from "../utils/types";

export const createOrder = async ({
  user,
  cartItemsTotalPrice,
  cartFoods,
}: {
  user: string;
  cartItemsTotalPrice: number;
  cartFoods: OrderItemType[];
}) => {
  await connectDB();
  const newOrder = new Order({
    user,
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
  const orders: OrderSchemaType[] = await Order.find().populate("id");
  return orders;
};
