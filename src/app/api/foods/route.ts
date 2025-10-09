import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "../../../../lib/utils/uploadImage";
import { FoodType } from "../../../../lib/utils/types";

// interface Food {
//   foodId?: {};
//   foodName: string; // foodName bolgoj solih
//   price: number;
//   image?: string;
//   ingredients: string;
//   category?: string;
//   createdAt?: Date;
//   updated?: Date;
// }

// const foods: Food[] = [];
// const foods = [
//   {
//     foodName: "Grilled Chicken cobb salad",
//     price: 10,
//     ingredients:
//       "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.",
//   },
// ];

export async function GET() {
  return Response.json({ data: "Hello from Food" });
}
// export async function GET() {
//   const response = NextResponse.json({ data: foods }, { status: 200 });
//   response.headers.set("Access-Control-Allow-Origin", "*");
//   response.headers.set(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   response.headers.set(
//     "Access-Control-ALlow-Headers",
//     "Content-Type, Authorization"
//   );
//   return response;
// }

export async function POST(req: NextRequest) {
  try {
    // Parse the formData from the request
    const formData = await req.formData();

    // Extract food fields from formData
    const foodName = formData.get("foodName") as string;
    const price = formData.get("price") as string;
    const ingredients = formData.get("ingredients") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;

    // Console log the received data
    console.log("========== Received Food Data ==========");
    console.log("FoodName:", foodName);
    console.log("Price:", price);
    console.log("Ingredients:", ingredients);
    console.log("Category:", category);
    console.log(
      "Image:",
      image ? `${image.name} (${image.size} bytes)` : "No image"
    );
    console.log("=======================================");

    // Validate required fields
    if (!foodName || !price || !ingredients || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Handle image upload if image exists
    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    // Prepare the food data object
    const foodData: FoodType = {
      foodName,
      price: parseFloat(price),
      ingredients,
      category,
      image: imageUrl,
    };

    console.log("Final Food Data:", foodData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Food item received and image uploaded successfully",
        data: foodData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing food data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process food data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
// const body = await req.json();
// const { foodName, price, ingredients } = body;
// foods.push({ foodName, price, ingredients });
// // console.log({ foodName, price, ingredients });

// const response = NextResponse.json({ data: foods });
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
