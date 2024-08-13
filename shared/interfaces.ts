import { object } from "prop-types";

export interface Recipe {
    name: string;
    URL?: string;
    instructions: string[];
    notes: string;
    RecipeIngredients: Ingredient[];
}


export interface Ingredient {
    name: string;
    category: Category;
    // notes: string;
}

export interface Category {
    name: 'Fruit' | 'Vegetable' | 'Meat' | 'Dairy' | 'Grain' | 'Spice' | 'Herb' | 'Fats and Oils';
}

export interface RecipeIngredient {
    ingredient: Ingredient;
    notes: string;
    amount: number;
}

export interface Recipes {
    recipes: Recipe[];
}

export interface ShoppingList {
    ingredients: Ingredient[];
}