//prettier-ignore
export const typeDetailsArray = <T extends string, S >(detailsObj: Record<T, S>) => {
  return Object.keys(detailsObj).map(key => ({ type: key as T, ...detailsObj[key as T] }))
}

/**Matches prisma enum */
export const CATEGORIES = [
  'PRODUCE',
  'MEAT',
  'FISH',
  'INTERNATIONAL',
  'DAIRY',
  'BAKING',
  'FROZEN',
  'BEVERAGES',
  'SNACKS',
  'CANNED_GOODS',
  'CONDIMENTS',
  'PASTA_AND_RICE',
  'BREAD_AND_BAKERY',
  'BREAKFAST_AND_CEREAL',
  'SOUPS_AND_BROTHS',
  'SPICES_AND_SEASONINGS',
  'SAUCES_AND_MARINADES',
  'HEALTH_AND_WELLNESS',
  'HOUSEHOLD_SUPPLIES',
  'PERSONAL_CARE',
  'MISC',
] as const

export type Category = (typeof CATEGORIES)[number]

export const CATEGORY_DETAILS: Record<Category, string> = {
  PRODUCE: 'Produce',
  MEAT: 'Meat',
  FISH: 'Fish',
  INTERNATIONAL: 'International',
  DAIRY: 'Dairy',
  BAKING: 'Baking',
  FROZEN: 'Frozen',
  BEVERAGES: 'Beverages',
  SNACKS: 'Snacks',
  CANNED_GOODS: 'Canned Goods',
  CONDIMENTS: 'Condiments',
  PASTA_AND_RICE: 'Pasta and Rice',
  BREAD_AND_BAKERY: 'Bread and Bakery',
  BREAKFAST_AND_CEREAL: 'Breakfast and Cereal',
  SOUPS_AND_BROTHS: 'Soups and Broths',
  SPICES_AND_SEASONINGS: 'Spices and Seasonings',
  SAUCES_AND_MARINADES: 'Sauces and Marinades',
  HEALTH_AND_WELLNESS: 'Health and Wellness',
  HOUSEHOLD_SUPPLIES: 'Household Supplies',
  PERSONAL_CARE: 'Personal Care',
  MISC: 'Misc',
}

const UNITS = [
  'GRAMS',
  'KILOGRAMS',
  'OUNCES',
  'POUNDS',
  'TONS',
  'CUPS',
  'PINTS',
  'FLUID_OUNCES',
  'FLUID_DRAMS',
  'TABLESPOONS',
  'TEASPOONS',
] as const

export type Unit = (typeof UNITS)[number]
export const UNIT_DETAILS: Record<Unit, string> = {
  GRAMS: 'grams',
  KILOGRAMS: 'kilograms',
  OUNCES: 'ounces',
  POUNDS: 'pounds',
  TONS: 'tons',
  CUPS: 'cups',
  PINTS: 'pints',
  FLUID_OUNCES: 'fluid ounces',
  FLUID_DRAMS: 'fluid drams',
  TABLESPOONS: 'tablespoons',
  TEASPOONS: 'teaspoons',
}
export type RecipeIngredient = {
  ingredient: Ingredient // name of ingredient
  quantity: number
  unit: Unit
  ordinal: number // used to sort ingredients in the recipe
}
export type Ingredient = {
  name: string
  category: Category
}
export type Recipe = {
  name: string
  url: string | null
  instructions: string[]
  notes: string
  servings: number
  recipeIngredients: RecipeIngredient[]
}

export type updateRecipePayload = {
  oldRecipeName: string
  newRecipe: Recipe
}
export type RecipeService = {
  getAllByUserId(userId: string): Promise<Recipe[]>
  add(userId: string, recipe: Recipe): Promise<Recipe>
  update(
    userId: string,
    updateRecipePayload: updateRecipePayload
  ): Promise<Recipe>
  delete(userId: string, recipeName: string): Promise<Recipe>
}

export type IngredientService = {
  getAll(): Promise<Ingredient[]>
  delete(ingredientName: string): Promise<Ingredient>
  add(ingredient: Ingredient): Promise<Ingredient>
  addMany(ingredients: Ingredient[]): Promise<Ingredient[]>
  update(oldName: string, newDetails: Ingredient): Promise<Ingredient>
  upsert(ingredient: Ingredient): Promise<Ingredient>
}
