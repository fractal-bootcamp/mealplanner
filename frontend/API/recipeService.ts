// recipe Service

import axios from "axios";
import { Recipe } from "../../shared/interfaces";

const recipeService = {
    // async getRecipes(): Promise<Recipe[]> {
    //     const response = await axios.get<Recipe[]>('/api/recipes');
    //     return response.data;
    // },

    // async getRecipe(id: number): Promise<Recipe> {
    //     const response = await axios.get<Recipe>(`/api/recipes/${id}`);
    //     return response.data;
    // },

    async addRecipe(recipe: Recipe): Promise<void> {
        await axios.post('/api/recipes', recipe);
    },

    // async updateRecipe(recipe: Recipe): Promise<void> {
    //     await axios.put(`/api/recipes/${recipe.id}`, recipe);
    // },

    async deleteRecipe(id: number): Promise<void> {
        await axios.delete(`/api/recipes/${id}`);
    }
};

export default recipeService;