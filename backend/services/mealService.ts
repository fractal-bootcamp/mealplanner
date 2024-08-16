import prisma from '../client'
import { Meal, MealService } from './interface'

const queries = {
  getAllByUserId: async (userId: string) => {
    const meals = await prisma.meal.findMany({
      where: {
        userId: userId,
      },
      include: {
        recipes: true,
      },
    })
    return meals
  },
  getById: async (userId: string, mealId: string) => {
    const meal = await prisma.meal.findUnique({
      where: {
        id: mealId,
        userId: userId,
      },
      include: {
        recipes: true,
      },
    })
    if (meal === null) {
      throw new Error('Meal not found')
    }
    return meal
  },
  getByName: async (userId: string, mealName: string) => {
    const meal = await prisma.meal.findUnique({
      where: {
        mealId: {
          userId,
          name: mealName,
        },
      },
      include: {
        recipes: true,
      },
    })
    if (meal === null) {
      throw new Error('Meal not found')
    }
    return meal
  },
}

const mutations = {
  add: async (userId: string, meal: Meal) => {
    const newMeal = await prisma.meal.create({
      data: {
        name: meal.name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        recipes: true,
      },
    })
    return newMeal
  },
  //TODO: figure out handling id here
  //   update: async (userId: string, meal: Meal) => {
  //     const updatedMeal = await prisma.meal.update({
  //       where: {
  //         id: meal.id,
  //         userId: userId,
  //       },
  //       data: meal,
  //       include: {
  //         recipes: true,
  //       },
  //     })
  //     return updatedMeal
  //   },
  delete: async (userId: string, mealName: string) => {
    const deletedMeal = await prisma.meal.delete({
      where: {
        mealId: {
          userId,
          name: mealName,
        },
      },
      include: {
        recipes: true,
      },
    })
    return deletedMeal
  },
}

export const mealService: MealService = {
  getAllByUserId: async (userId: string) => queries.getAllByUserId(userId),
  add: async (userId: string, meal: Meal) => mutations.add(userId, meal),
  update: async (userId: string, meal: Meal) => mutations.update(userId, meal),
  delete: async (userId: string, mealName: string) =>
    mutations.delete(userId, mealName),
}
