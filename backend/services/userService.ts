import prisma from '../client'
import { User, UserService } from './interface'

const queries = {
  getAll: async () => {
    const users = await prisma.user.findMany()
    return users
  },
  getById: async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (user === null) {
      throw new Error('User not found')
    }
    return user
  },
  getByClerkId: async (clerkId: string) => {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId,
      },
    })
    if (user === null) {
      throw new Error('User not found')
    }
    return user
  },
}

const mutations = {
  add: async (user: User) => {
    const newUser = await prisma.user.create({
      data: user,
    })
    return newUser
  },
  update: async (user: User) => {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    })
    return updatedUser
  },
  delete: async (userId: string) => {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    })
    return deletedUser
  },
}

export const userService: UserService = {
  getAll: async () => queries.getAll(),
  getById: async (userId: string) => queries.getById(userId),
  getByClerkId: async (clerkId: string) => queries.getByClerkId(clerkId),
  add: async (user: User) => mutations.add(user),
  update: async (user: User) => mutations.update(user),
  delete: async (userId: string) => mutations.delete(userId),
}
