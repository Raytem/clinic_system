'use client'
import { Role } from '@/enums/Role'
import { useFetch } from '@/hooks/useFetch'
import { Recipe } from '@/interfaces/recipe/recipe'
import { recipeService } from '@/services/recipe.service'
import { useStore } from '@/stores/contexts/root-store-context'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Spinner, Card } from 'react-bootstrap'
import Link from 'next/link'

interface RecipeItemProps {
    recipe: Recipe,
    handleDeleteRecipe: (id: number) => void,
}

const RecipeItem: React.FC<RecipeItemProps> = observer(({
    recipe, handleDeleteRecipe
}) => {
    const {userStore} = useStore();

    const [deleteRecipe, isDeleting] = useFetch(async () => {
        await recipeService.delete(recipe.id);
        handleDeleteRecipe(recipe.id);
    })

    const onDeleteRecipe = () => {
        deleteRecipe();
    }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{`Drug: ${recipe.drugName}`}</Card.Title>
        <Card.Text>
          {`Instructions: ${recipe.instructionForUsage}`}
        </Card.Text>

        {
            userStore.user?.roles[0] === Role.PATIENT &&
            (
                <div className='d-flex gap-2'>
                <p>Prescribed by doctor:</p>
                <Link
                    className='link' 
                    href={`/doctors/${recipe.doctor.id}`}
                >
                    {`${recipe.patient.user.lastName} ${recipe.patient.user.firstName} ${recipe.patient.user.patronymic}`}
                </Link>
            </div>
            )
        }
       
        {
            userStore.user?.roles[0] === Role.DOCTOR &&
            (
            <Button 
                onClick={onDeleteRecipe}
                variant="danger" 
                type="submit" 
                className='mb-2' 
                disabled={isDeleting}
            >
                Delete {isDeleting && (<Spinner size='sm'/>)}
            </Button>
            )
        }
      </Card.Body>
    </Card>
  )
})

export default RecipeItem