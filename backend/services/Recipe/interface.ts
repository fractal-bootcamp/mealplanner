export interface RecipeIngredient {
  name: string
  quantity: number
}

export interface Recipe {
  name: string
  url?: string
  instructions: string[]
  notes: string
  servings: number
  ingredients: RecipeIngredient[]
}

export interface RecipeService {
  getByUserId(userId: string): Promise<Recipe[]>
  add(recipe: Recipe): Promise<Recipe>
  update(recipe: Recipe): Promise<Recipe>
  delete(recipe: Recipe): Promise<Recipe>
}
