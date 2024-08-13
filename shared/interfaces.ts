import { object } from "prop-types";

export interface Recipe {
    name: string;
    URL?: string;
    instructions: Step[];
    notes: string;
    RecipeIngredients: object[];
}

export interface Step {
    content: string;
    ingredients: Ingredient[];
}

export interface Ingredient {
    name: string;
    category: Category;
    amount: number;
    notes: string;

}

export interface Category {
    name: 'Fruit' | 'Vegetable' | 'Meat' | 'Dairy' | 'Grain' | 'Spice' | 'Herb' | 'Fats and Oils';
    description: string;
}

export interface RecipeIngredient {

    ingredient: Ingredient;
    amount: number;
    preparation: string;
}

export interface Recipes {
    recipes: Recipe[];
}