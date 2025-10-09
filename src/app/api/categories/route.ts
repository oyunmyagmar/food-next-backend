import { NextResponse } from "next/server";

interface FoodCategory {
  categoryId?: {};
  categoryName: string;
  createdAt?: Date;
  updated?: Date;
}

// const categories: FoodCategory[] = [];
const categories = [
  { categoryName: "Appetizers" },
  { categoryName: "Salads" },
  { categoryName: "Pizzas" },
];

export async function GET() {
  const response = NextResponse.json({ data: categories }, { status: 200 });
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

export async function POST(req: Request) {
  const body = await req.json();
  const { categoryName } = body;
  categories.push({ categoryName });
  // console.log(categoryName);

  const response = NextResponse.json({ data: categories }, { status: 200 });
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

// export async function DELETE(req: Request) {
//   const body = await req.json();

//   console.log({ body });

//   const response = NextResponse.json({ data: categories }, { status: 200 });
//   response.headers.set(
//     "Access-Control-Allow-Origin",
//     "*" // Replace with your client's domain
//   );
//   response.headers.set(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   response.headers.set(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );
//   return response;
// }
