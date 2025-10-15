export type FoodType = {
  foodId?: number;
  foodName: string;
  price: number;
  ingredients: string;
  category?: string;
  image?: string;
  createdAt?: Date;
  updated?: Date;
};

export type newFoodType = {
  _id?: string;
  name: string;
  price: number;
  ingredients: string;
  categoryId: string;
  image?: string;
};
