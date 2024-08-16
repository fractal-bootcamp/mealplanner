interface Ingredient {
    name: string;
    category: string;
}

interface RecipeIngredient {
    ingredient: Ingredient;
    notes?: string;
    amount: number;
    unit: string;
}

interface ShoppingList {
    ingredients: RecipeIngredient[];
}

interface Recipe {
    name: string;
    URL: string;
    instructions: string[];
    notes: string;
    RecipeIngredients: RecipeIngredient[];
}

function generateShoppingList(recipes: Recipe[]): ShoppingList[] {
    const ingredientMap: { [category: string]: RecipeIngredient[] } = {};

    // Extract ingredients from recipes and filter out notes
    recipes.forEach(recipe => {
        recipe.RecipeIngredients.forEach(ri => {
            // Create a new ingredient without notes
            const ingredientWithoutNotes: RecipeIngredient = {
                ingredient: ri.ingredient,
                amount: ri.amount,
                unit: ri.unit
            };

            // Group ingredients by category
            if (!ingredientMap[ri.ingredient.category]) {
                ingredientMap[ri.ingredient.category] = [];
            }
            ingredientMap[ri.ingredient.category].push(ingredientWithoutNotes);
        });
    });

    // Create shopping lists from grouped ingredients
    const shoppingLists: ShoppingList[] = Object.keys(ingredientMap).map(category => ({
        ingredients: ingredientMap[category]
    }));

    return shoppingLists;
}

// Example usage
const shoppingLists = generateShoppingList(recipes);
console.log(shoppingLists);
