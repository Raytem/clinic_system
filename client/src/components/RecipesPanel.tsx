import React from 'react'
import Button from 'react-bootstrap/Button';
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import RecipeList from './lists/RecipeList';
import { Recipe } from '@/interfaces/recipe/recipe';
import { observer } from 'mobx-react-lite'
import { useStore } from '@/stores/contexts/root-store-context'
import { Role } from '@/enums/Role'
import { recipeService } from '@/services/recipe.service'
import CreateRecipeModal from '@/components/modals/CreateRecipeModal'
import { Patient } from "@/interfaces/patient/patient";

interface RecipesPanelPrps {
    patient: Patient,
}

const RecipesPanel: React.FC<RecipesPanelPrps> = observer(({ patient }) => {
    const {userStore} = useStore();

    const [showCrateRecipeModal, setShowCrateRecipeModal] = useState<boolean>(false)

    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [getRecipes, isRecipesLoading] = useFetch(async () => {
        const resData = await recipeService.getAllAsDoctor();
        setRecipes(resData);
      })

    useEffect(() => {
        getRecipes()
    }, [])

    const handleCreateRecipe = (recipe: Recipe) => {
        setRecipes([recipe, ...recipes]);
    }

    const handleDeleteRecipe = (id: number) => {
        const filteredRecipes = recipes.filter(rec => rec.id !== id);
        setRecipes(filteredRecipes);
    }

    const handleOpenRecipeModal = () => {
        setShowCrateRecipeModal(true);
    }

    const handleCloseRecipeModal = () => {
        setShowCrateRecipeModal(false);
    }

    return (
        <>
            <div className='d-flex flex-column gap w-100 mt-5'>
            <div className='d-flex justify-content-between gap-3'>
                <h3>Your recipes for this patient:</h3>
                <Button 
                    onClick={handleOpenRecipeModal}
                    variant="primary"
                >
                    New recipe
                </Button>
            </div>
            </div>
            <hr />
            <RecipeList
                recipes={recipes}
                isLoading={isRecipesLoading}
                handleDeleteRecipe={handleDeleteRecipe}
            />
            <CreateRecipeModal
                patient={patient}
                show={showCrateRecipeModal}
                onHide={handleCloseRecipeModal}
                handleCreateRecipe={handleCreateRecipe}
            />
        </>
    )
})

export default RecipesPanel