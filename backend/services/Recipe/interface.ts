export interface RecipeIngredient {
  ingredient: string
  quantity: number
}

export interface Recipe {
  name: string
  url: string | null
  instructions: string[]
  notes: string
  servings: number
  recipeIngredients: RecipeIngredient[]
}

export interface RecipeService {
  getByUserId(userId: string): Promise<Recipe[]>
  add(recipe: Recipe): Promise<Recipe>
  update(recipe: Recipe): Promise<Recipe>
  delete(recipe: Recipe): Promise<Recipe>
}
