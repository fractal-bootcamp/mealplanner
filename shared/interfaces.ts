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

export type Category = 'Fruit' | 'Vegetable' | 'Meat' | 'Fish' | 'Dairy' | 'Grain' | 'Spice' | 'Herb' | 'Fats and Oils' | 'Eggs' | 'Flour' | 'Sugar' | 'Liquid' | 'Other';

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