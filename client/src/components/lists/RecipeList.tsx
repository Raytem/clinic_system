import { Recipe } from '@/interfaces/recipe/recipe'
import React from 'react'
import { Alert } from 'react-bootstrap'
import RecipeItem from '../items/RecipeItem'
import CenteredSpinner from '../CenteredSpinner'

interface RecipeListProps {
    recipes: Recipe[],
    isLoading: boolean,
    handleDeleteRecipe: (id: number) => void,
}

const RecipeList: React.FC<RecipeListProps> = ({
    recipes, isLoading, handleDeleteRecipe
}) => {
    if (isLoading) {
        return (<CenteredSpinner/>)
    }

    if (!recipes.length && !isLoading) {
        return (
          <Alert variant='light'>
            No recipes found
          </Alert>
        )
    }


    return (
        <div className='d-flex flex-column gap-3 mb-4'>
            {
                recipes.map(recipe => (
                    <RecipeItem 
                        key={recipe.id} 
                        recipe={recipe}
                        handleDeleteRecipe={handleDeleteRecipe}
                    />
                ))
            }
        </div>
    )
}

export default RecipeList