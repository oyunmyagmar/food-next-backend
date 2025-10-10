import { NextRequest, NextResponse } from "next/server";
import {
  createCategory,
  getAllCategories,
} from "../../../../lib/services/category-service";

export async function GET() {
  const categories = await getAllCategories();
  const response = NextResponse.json({ data: categories }, { status: 200 });
  console.log(categories, "=============categories");
  return response;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  await createCategory(body.name);
  console.log(body.name, "name");

  return new NextResponse(
    JSON.stringify({ message: "Category created==========browser msg" }),
    {
      status: 200,
    }
  );
}

// export async function DELETE(req: Request) {
//   const body = await req.json();

//   console.log({ body });

// return response;
