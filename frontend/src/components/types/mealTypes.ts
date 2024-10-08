export type DayOfTheWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Meal {
  mealId: string;
  name?: string;
  mealName: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Special";
  recipes: Recipe[];
}

export interface Recipe {
  name: string;
  URL?: string;
  instructions: string[];
  notes: string;
  RecipeIngredients: RecipeIngredient[];
}

export interface Ingredient {
  name: string;
  category: Category;
  notes: string;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  notes: string;
  amount: number;
  unit: string;
}

export type Category =
  | "Fruit"
  | "Vegetable"
  | "Meat"
  | "Dairy"
  | "Grain"
  | "Spice"
  | "Herb"
  | "Fats and Oils";

export interface Day {
  dayOfTheWeek: DayOfTheWeek;
  Meals: Meal[];
}

export const sampleDay: Day = {
  dayOfTheWeek: "Monday",
  Meals: [
    {
      mealId: "1",
      name: "Norman's Breakfast",
      mealName: "Breakfast",
      recipes: [
        {
          name: "Scrambles",
          RecipeIngredients: [
            {
              ingredient: { name: "Eggs", category: "Dairy", notes: "" },
              amount: 2,
              notes: "",
            },
            {
              ingredient: { name: "Milk", category: "Dairy", notes: "" },
              amount: 1,
              notes: "",
            },
          ],
          instructions: ["Scramble the eggs", "Add milk", "Serve"],
          notes: "This is a scrambles recipe",
          URL: "https://www.google.com",
        },
      ],
    },
    {
      mealId: "2",
      mealName: "Lunch",
      recipes: [
        {
          name: "Pancakes",
          RecipeIngredients: [
            {
              ingredient: { name: "Flour", category: "Grain", notes: "" },
              amount: 2,
              notes: "",
            },
          ],
          instructions: ["Mix the flour", "Add milk", "Serve"],
          notes: "This is a pancakes recipe",
          URL: "https://www.google.com",
        },
      ],
    },
    {
      mealId: "3",
      mealName: "Dinner",
      recipes: [
        {
          name: "Steak",
          RecipeIngredients: [
            {
              ingredient: { name: "Steak", category: "Meat", notes: "" },
              amount: 2,
              notes: "",
            },
          ],
          instructions: ["Cook the steak", "Serve"],
          notes: "This is a steak recipe",
          URL: "https://www.google.com",
        },
      ],
    },
  ],
};
