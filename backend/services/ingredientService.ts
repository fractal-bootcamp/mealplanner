import { Prisma } from '@prisma/client'
import prisma from '../client'
import { CATEGORY } from '@prisma/client'
import {
  CATEGORIES,
  Category,
  Ingredient,
  IngredientService,
} from './interface.ts'

const mutations = {
  addMany: async (ingredients: Ingredient[]) => {
    const dbIngredients = await prisma.ingredient.createManyAndReturn({
      data: ingredients.map((ingredient) => ({
        name: ingredient.name,
        category: ingredient.category,
      })),
      skipDuplicates: true,
    })
    return dbIngredients
  },
  add: async (ingredient: Ingredient) => {
    const dbIngredient = await prisma.ingredient.create({
      data: {
        name: ingredient.name,
        category: ingredient.category,
      },
    })
    return dbIngredient
  },
  delete: async (ingredientName: string) => {
    const dbIngredient = await prisma.ingredient.delete({
      where: {
        name: ingredientName,
      },
    })
    return dbIngredient
  },
  update: async (oldName: string, newDetails: Ingredient) => {
    const dbIngredient = await prisma.ingredient.update({
      where: {
        name: oldName,
      },
      data: {
        name: newDetails.name,
        category: newDetails.category,
      },
    })
    return dbIngredient
  },
  upsert: async (ingredient: Ingredient) => {
    const dbIngredient = await prisma.ingredient.upsert({
      where: {
        name: ingredient.name,
      },
      update: {
        category: ingredient.category,
      },
      create: {
        name: ingredient.name,
        category: ingredient.category,
      },
    })
    return dbIngredient
  },
}
const queries = {
  getByName: async (ingredientName: string) => {
    const dbIngredient = await prisma.ingredient.findUnique({
      where: {
        name: ingredientName,
      },
    })
    return dbIngredient
  },
  getAll: async () => {
    const dbIngredients = await prisma.ingredient.findMany()
    return dbIngredients
  },
  getCategoryFromName: async (ingredientName: string) => {
    const dbIngredient = await prisma.ingredient.findUnique({
      where: {
        name: ingredientName,
      },
    })
    return dbIngredient ? (dbIngredient.category as Category) : null
  },
}

export const ingredientService: IngredientService = {
  getAll: async () => queries.getAll(),
  delete: async (ingredientName: string) => mutations.delete(ingredientName),
  add: async (ingredient: Ingredient) => mutations.add(ingredient),
  addMany: async (ingredients: Ingredient[]) => mutations.addMany(ingredients),
  update: async (oldName: string, newDetails: Ingredient) =>
    mutations.update(oldName, newDetails),
  upsert: async (ingredient: Ingredient) => mutations.upsert(ingredient),
}
