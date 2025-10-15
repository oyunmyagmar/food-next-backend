import { NextRequest, NextResponse } from "next/server";
import {
  createNewFood,
  getNewAllFoods,
} from "../../../../lib/services/newfood-service";
import { uploadImageToCloudinary } from "../../../../lib/utils/uploadImage";
import { newFoodType } from "../../../../lib/utils/types";

export async function GET() {
  let newFoods = await getNewAllFoods();
  const response = NextResponse.json({ data: newFoods }, { status: 200 });
  console.log("NEWFOODS=====", newFoods, "=====NEWFOODS");

  return response;
}

export async function POST(request: NextRequest) {
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
}
