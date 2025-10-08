import { NextResponse } from "next/server";

interface Food {
  foodId?: {};
  foodName: string; // foodName bolgoj solih
  price: number;
  image?: string;
  ingredients: string;
  category?: {};
  createdAt?: Date;
  updated?: Date;
}

// const foods: Food[] = [];
const foods = [
  {
    foodName: "Grilled Chicken cobb salad",
    price: 10,
    ingredients:
      "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
  },
];

export async function GET() {
  const response = NextResponse.json({ data: foods }, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-ALlow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { foodName, price, ingredients } = body;
  foods.push({ foodName, price, ingredients });
  // console.log({ foodName, price, ingredients });

  const response = NextResponse.json({ data: foods });
  response.headers.set(
    "Access-Control-Allow-Origin",
    "*" // Replace with your client's domain
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}
