import { NextRequest, NextResponse } from "next/server";
import {
  createNewFood,
  getAllNewFoods,
} from "../../../../lib/services/newfood-service";
import { uploadImageToCloudinary } from "../../../../lib/utils/uploadImage";
import { newFoodType } from "../../../../lib/utils/types";

export async function GET() {
  let newFoods = await getAllNewFoods();
  const response = NextResponse.json({ data: newFoods }, { status: 200 });
  console.log("ALLNEWFOODS =====", newFoods, "===== ALLNEWFOODS");

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const formNewData = await request.formData();

    const name = formNewData.get("name") as string;
    const price = formNewData.get("price") as string;
    const ingredients = formNewData.get("ingredients") as string;
    const categoryId = formNewData.get("selectedCategoryId") as string;
    const image = formNewData.get("image") as File;

    console.log("===== Received NEW Food Data Start =====");
    console.log("name:", name);
    console.log("price:", price);
    console.log("ingredients:", ingredients);
    console.log("categoryId", categoryId);
    console.log(
      "image:",
      image ? `${image.name} (${image.size} bytes)` : "No image"
    );
    console.log("===== Received NEW Food Data End =====");

    if (!name || !price || !ingredients || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    const newFoodData: newFoodType = {
      name,
      price: parseFloat(price),
      ingredients,
      categoryId,
      image: imageUrl,
    };

    await createNewFood(newFoodData);
    console.log("Final NEW Food Data:", newFoodData);

    return NextResponse.json(
      {
        success: true,
        message: "New Food item received and image uploaded successfully",
        data: newFoodData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing new food data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process new food data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
