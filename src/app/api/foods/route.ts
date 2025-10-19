import { createFood, getAllFoods } from "@/lib/services/food-service";
import { FoodType } from "@/lib/utils/types";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  let foods = await getAllFoods();
  const response = NextResponse.json({ data: foods }, { status: 200 });
  console.log("AllFoods =====", foods, "===== AllFoods");

  return response;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const foodName = formData.get("foodName") as string;
    const price = formData.get("price") as string;
    const ingredients = formData.get("ingredients") as string;
    const image = formData.get("image") as File;

    console.log("==== Received Food Data ====");
    console.log("foodName:", foodName);
    console.log("price:", price);
    console.log("ingredients:", ingredients);
    console.log(
      "image:",
      image ? `${image.name} (${image.size} bytes)` : "No image"
    );
    console.log("==== Received Food Data ====");

    if (!foodName || !price || !ingredients) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    const foodData: FoodType = {
      foodName,
      price: parseFloat(price),
      ingredients,
      image: imageUrl,
    };

    await createFood(foodData);
    console.log("Final Food Data:", foodData);

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
