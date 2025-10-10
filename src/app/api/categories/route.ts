import { NextRequest, NextResponse } from "next/server";
import {
  createCategory,
  getAllCategories,
} from "../../../../lib/services/category-service";

// interface FoodCategory {
//   categoryName: string;
//   createdAt?: Date;
//   updated?: Date;
// }

// const categories: FoodCategory[] = [];

export async function GET() {
  const categories = await getAllCategories();
  return new NextResponse(JSON.stringify({ data: categories }), {
    status: 200,
  });

  // const response = NextResponse.json({ data: categories }, { status: 200 });
  // response.headers.set(
  //   "Access-Control-Allow-Origin",
  //   "*" // Replace with your client's domain
  // );
  // response.headers.set(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PUT, DELETE, OPTIONS"
  // );
  // response.headers.set(
  //   "Access-Control-Allow-Headers",
  //   "Content-Type, Authorization"
  // );
  // return response;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  await createCategory(body.name);
  console.log(body.name, "namename");

  return new NextResponse(JSON.stringify({ message: "Category created" }), {
    status: 200,
  });
}

//////// heregtei unes doosh
// export async function POST(req: Request) {
//   const body = await req.json();
//   const { categoryName } = body;
//   categories.push({ categoryName });
//   // console.log(categoryName);

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
//// heregtei unes desh

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
