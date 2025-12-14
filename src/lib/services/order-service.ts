import { NextResponse } from "next/server";
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

export const getUserOrders = async (email: string) => {
  await connectDB();

  const user = await User.findOne({ email }, "_id");

  if (!user) {
    return NextResponse.json({ message: "User not found!" });
  }

  const getUserOrders = await Order.find({ userId: user._id }).populate(
    "userId"
  );

  return getUserOrders;
};

export const updateBulkOrder = async (
  ordersId: string[],
  newStatus: string
) => {
  await connectDB();

  const updatedBulkOrder = await Order.updateMany(
    { _id: { $in: ordersId } },
    { $set: { status: newStatus } }
  );

  return updatedBulkOrder;
};
