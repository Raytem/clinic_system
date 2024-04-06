import { CreateRecipeDto } from "@/interfaces/recipe/createRecipeDto";
import { Recipe } from "@/interfaces/recipe/recipe";
import { accessTokenUtil } from "@/utils/access-token.util";
import axios from "axios";

class RecipeService {

    async create(crateRecipeDto: CreateRecipeDto): Promise<Recipe> {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipe`, 
        crateRecipeDto,
        {
           headers: {
               Authorization: accessTokenUtil.getBearerString(),
           }
        });
        return res.data;
    }

    async getAllAsDoctor(): Promise<Recipe[]> {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/doctor`,
        {
           headers: {
               Authorization: accessTokenUtil.getBearerString(),
           }
        });
        return res.data;
    }

    async getAllAsPatient(): Promise<Recipe[]> {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/patient`,
        {
           headers: {
               Authorization: accessTokenUtil.getBearerString(),
           }
        });
        return res.data;
    }

    async delete(id: number): Promise<Recipe> {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/recipe/${id}`,
        {
           headers: {
               Authorization: accessTokenUtil.getBearerString(),
           }
        });
        return res.data;
    }
}

export const recipeService = new RecipeService();