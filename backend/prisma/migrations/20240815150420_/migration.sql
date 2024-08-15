/*
  Warnings:

  - You are about to drop the column `namne` on the `Ingredient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Meal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recipeId,ingredientId]` on the table `RecipeIngredient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordinal` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CATEGORY" AS ENUM ('PRODUCE', 'MEAT', 'FISH', 'INTERNATIONAL', 'DAIRY', 'BAKING', 'FROZEN', 'BEVERAGES', 'SNACKS', 'CANNED_GOODS', 'CONDIMENTS', 'PASTA_AND_RICE', 'BREAD_AND_BAKERY', 'BREAKFAST_AND_CEREAL', 'SOUPS_AND_BROTHS', 'SPICES_AND_SEASONINGS', 'SAUCES_AND_MARINADES', 'HEALTH_AND_WELLNESS', 'HOUSEHOLD_SUPPLIES', 'PERSONAL_CARE', 'MISC');

-- CreateEnum
CREATE TYPE "UNIT" AS ENUM ('GRAMS', 'KILOGRAMS', 'OUNCES', 'POUNDS', 'TONS', 'CUPS', 'PINTS', 'FLUID_OUNCES', 'FLUID_DRAMS', 'TABLESPOONS', 'TEASPOONS');

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipeId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "namne",
ADD COLUMN     "category" "CATEGORY" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "ordinal" INTEGER NOT NULL,
ADD COLUMN     "unit" "UNIT" NOT NULL;

-- DropEnum
DROP TYPE "FoodCategory";

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Meal_userId_name_key" ON "Meal"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_userId_name_key" ON "Recipe"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipeId_ingredientId_key" ON "RecipeIngredient"("recipeId", "ingredientId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
