import prisma from '../client'
import {
  Ingredient,
  Recipe,
  RecipeIngredient,
  RecipeService,
  updateRecipePayload,
} from './interface'
import { ingredientService } from './ingredientService'
const recipeDetailsSelectObject = {
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
          category: true,
        },
      },
      quantity: true,
      unit: true,
      ordinal: true,
    },
  },
}
const queries = {
  getAllByUserId: async (userId: string) => {
    const recipes = await prisma.recipe.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      select: recipeDetailsSelectObject,
    })
    return recipes
  },
  getIdFromName: async (userId: string, recipeName: string) => {
    const recipe = await prisma.recipe.findUnique({
      where: {
        recipeId: {
          userId,
          name: recipeName,
        },
      },
      select: {
        id: true,
      },
    })
    if (recipe === null) {
      throw new Error('Recipe not found')
    }
    return recipe.id
  },
  getById: async (userId: string, recipeId: string) => {
    const recipe = await prisma.recipe.findUnique({
      where: {
        recipeId: {
          userId,
          name: recipeId,
        },
      },
      select: recipeDetailsSelectObject,
    })
    if (recipe === null) {
      throw new Error('Recipe not found')
    }
    return recipe
  },
  getByName: async (userId: string, recipeName: string) => {
    const recipe = await prisma.recipe.findUnique({
      where: {
        recipeId: {
          userId,
          name: recipeName,
        },
      },
      select: recipeDetailsSelectObject,
    })
    return recipe
  },
}
const mutations = {
  add: async (userId: string, recipe: Recipe) => {
    //create the new recipe without the recipeIngredients (which we need to loop over because of createMany nested write limitations)
    const newRecipe = await prisma.recipe.create({
      data: {
        ...recipe,
        user: {
          connect: {
            id: userId,
          },
        },
        recipeIngredients: {},
      },
    })

    // create the new recipeIngredient table entry linking each ingredient & details to the recipe
    const newRecipeIngredientsEntries = mutations.addIngredientsToRecipe(
      userId,
      newRecipe.id,
      recipe.recipeIngredients
    )
    // the new recipe with its attached recipeIngredients
    const fullRecipe = await queries.getById(userId, newRecipe.id)
    return fullRecipe
  },
  /**Adds a list of recipeIngredients to a provided recipe by Id */
  addIngredientsToRecipe: async (
    userId: string,
    recipeName: string,
    recipeIngredients: RecipeIngredient[]
  ) => {
    const recipeId = await queries.getIdFromName(userId, recipeName)
    recipeIngredients.forEach((recipeIngredient) => {
      prisma.recipeIngredient.create({
        data: {
          recipe: {
            connect: {
              id: recipeId,
            },
          },
          ingredient: {
            connect: {
              name: recipeIngredient.ingredient.name,
            },
          },
          quantity: recipeIngredient.quantity,
          unit: recipeIngredient.unit,
          ordinal: recipeIngredient.ordinal,
        },
      })
    })
  },
  clearRecipeIngredients: async (userId: string, recipeName: string) => {
    const recipeId = await queries.getIdFromName(userId, recipeName)
    await prisma.recipeIngredient.deleteMany({
      where: {
        recipeId: recipeId,
      },
    })
  },
  update: async (userId: string, updateRecipePayload: updateRecipePayload) => {
    //delete existing recipeIngredients for that recipe
    mutations.clearRecipeIngredients(userId, updateRecipePayload.oldRecipeName)
    //add the new recipeIngredients
    const newRecipeIngredientsEntries = mutations.addIngredientsToRecipe(
      userId,
      updateRecipePayload.oldRecipeName,
      updateRecipePayload.newRecipe.recipeIngredients
    )
    //update the recipe details
    const updatedRecipe = await prisma.recipe.update({
      where: {
        recipeId: {
          userId,
          name: updateRecipePayload.oldRecipeName,
        },
      },
      data: {
        name: updateRecipePayload.newRecipe.name,
        url: updateRecipePayload.newRecipe.url,
        instructions: updateRecipePayload.newRecipe.instructions,
        notes: updateRecipePayload.newRecipe.notes,
        servings: updateRecipePayload.newRecipe.servings,
      },
    })
    const fullRecipe = await queries.getById(userId, updatedRecipe.id)
    return fullRecipe
  },
  delete: async (userId: string, recipeName: string) => {
    const recipe = await prisma.recipe.delete({
      where: {
        recipeId: {
          userId,
          name: recipeName,
        },
      },
      select: recipeDetailsSelectObject,
    })
    return recipe
  },
}

export const recipeService: RecipeService = {
  getAllByUserId: async (userId: string) => queries.getAllByUserId(userId),
  add: async (userId: string, recipe: Recipe) => {
    //first make sure all the recipe's ingredients exist in the database
    const dbIngredients = await ingredientService.addMany(
      recipe.recipeIngredients.map(
        (recipeIngredient) => recipeIngredient.ingredient
      )
    )
    return mutations.add(userId, recipe)
  },
  update: async (userId: string, updateRecipePayload: updateRecipePayload) => {
    return mutations.update(userId, updateRecipePayload)
  },
  delete: async (userId: string, recipeName: string) =>
    mutations.delete(userId, recipeName),
}
