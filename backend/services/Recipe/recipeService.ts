import prisma from '../../client'
import { RecipeService } from './interface'

export const recipeService: RecipeService = {
  getByUserId: async (userId: string) => {
    const recipes = await prisma.recipe.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        name: true,
        url: true,
        instructions: true,
        notes: true,
        servings: true,
        ingredients: true,
      },
    })
    return recipes
  },
}
