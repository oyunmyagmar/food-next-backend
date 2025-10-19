import {
  createNewFood,
  editNewFood,
  getAllNewFoods,
} from "@/lib/services/newfood-service";
import { NewFoodType } from "@/lib/utils/types";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  let newFoods = await getAllNewFoods();
  const response = NextResponse.json({ data: newFoods }, { status: 200 });
  console.log("ALLNEWFOODS =====", newFoods, "===== ALLNEWFOODS");

  return response;
}

export async function POST(request: NextRequest) {
  try {
    const formNewData = await request.formData();

    const foodName = formNewData.get("foodName") as string;
    const price = formNewData.get("price") as string;
    const ingredients = formNewData.get("ingredients") as string;
    const categoryId = formNewData.get("categoryId") as string;
    const image = formNewData.get("image") as File;

    console.log("===== Received NEW Food Data Start =====");
    console.log("foodName:", foodName);
    console.log("price:", price);
    console.log("ingredients:", ingredients);
    console.log("categoryId", categoryId);
    console.log(
      "image:",
      image ? `${image.name} (${image.size} bytes)` : "No image"
    );
    console.log("===== Received NEW Food Data End =====");

    if (!foodName || !price || !ingredients || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    const newFoodData: NewFoodType = {
      foodName,
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

export async function PUT(request: NextRequest) {
  try {
    const formEditedData = await request.formData();

    const foodName = formEditedData.get("editedFoodName") as string;
    const categoryId = formEditedData.get("editedCategorySelected") as string;
    const ingredients = formEditedData.get("editedIngredients") as string;
    const price = formEditedData.get("editedPrice") as string;
    const image = formEditedData.get("editedImage") as File | string;
    const foodId = formEditedData.get("selectedFoodId") as string;

    console.log("===== Received edited NEW Food Data Start =====");
    console.log("foodName:", foodName);
    console.log("categoryId", categoryId);
    console.log("ingredients:", ingredients);
    console.log("price:", price);
    console.log("foodId", foodId);
    if (!image) {
      console.log("no image provided");
    } else if (typeof image === "string") {
      console.log("image:", `${image}`);
    } else if (image instanceof File) {
      console.log("image:", `${image.name} (${image.size} bytes)`);
    } else {
      console.log("unknown image type");
    }
    console.log("===== Received edited NEW Food Data End =====");

    if (!foodName || !categoryId || !ingredients || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    } else if (!foodId) {
      return NextResponse.json({ error: "FoodId is missing" });
    }

    let imageUrl = "";
    if (image instanceof File) {
      imageUrl = await uploadImageToCloudinary(image);
    } else if (typeof image === "string") {
      imageUrl = image;
    }

    const newFoodData: NewFoodType = {
      foodName,
      categoryId,
      ingredients,
      price: parseFloat(price),
      image: imageUrl,
    };

    await editNewFood(newFoodData, foodId);
    console.log("Final Edited New Food Data:", newFoodData);

    return NextResponse.json(
      {
        succes: true,
        message: "New Food item received and image uploaded successfully",
        data: newFoodData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing edited new food data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process edited new food data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
