export type NewFoodType = {
  _id?: string;
  foodName: string;
  price: number;
  ingredients: string;
  categoryId: string;
  image: string;
};

// export type CategoryType = {
//   _id?: string;
//   categoryName: string;
//   foods: NewFoodType[];
// };

export type CategoryType = {
  _id?: string;
  categoryName: string;
};

export type OrderItemType = {
  _id?: string;
  food: NewFoodType;
  quantity: number;
};
