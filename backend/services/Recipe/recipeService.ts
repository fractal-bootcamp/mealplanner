import * as DBTypes from '@prisma/client'

import prisma from '../../client'
import { Recipe, RecipeService } from './interface'

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
        recipeIngredients: {
          select: {
            ingredient: {
              select: {
                name: true,
              },
            },
            quantity: true,
          },
        },
      },
    })
    const formattedRecipes: Recipe[] = recipes.map((recipe) => ({
      ...recipe,
      recipeIngredients: recipe.recipeIngredients.map((recipeIngredient) => ({
        ...recipeIngredient,
        ingredient: recipeIngredient.ingredient.name,
      })),
    }))
    return recipes
  },
}
