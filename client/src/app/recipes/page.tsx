'use client'
import React from 'react'
import Button from 'react-bootstrap/Button';
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import RecipeList from '@/components/lists/RecipeList';
import { Recipe } from '@/interfaces/recipe/recipe';
import { observer } from 'mobx-react-lite'
import { recipeService } from '@/services/recipe.service'

const RecipesPage = observer(() => {

    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [getRecipes, isRecipesLoading] = useFetch(async () => {
        const resData = await recipeService.getAllAsPatient()
        setRecipes(resData);
    })

    useEffect(() => {
        getRecipes()
    }, [])

    const handleDeleteRecipe= (id: number) => {
        const filteredRecipes = recipes.filter(rec => rec.id !== id);
        setRecipes(filteredRecipes);
    }

    return (
        <>
            <h2 className='mb-3'>Recipes</h2>
            <RecipeList
                recipes={recipes}
                isLoading={isRecipesLoading}
                handleDeleteRecipe={handleDeleteRecipe}
            />
        </>
    )
})

export default RecipesPage