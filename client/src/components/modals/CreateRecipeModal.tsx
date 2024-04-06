import React, { useEffect } from 'react'
import { Patient } from '@/interfaces/patient/patient'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from 'react-bootstrap/Spinner';
import { CreateRecipeDto } from '@/interfaces/recipe/createRecipeDto';
import { createRecipeSchema } from '@/validation-schemas/recipe/create-recipe.schema';
import { FloatingLabel, Modal } from 'react-bootstrap';
import { recipeService } from '@/services/recipe.service';
import { Recipe } from '@/interfaces/recipe/recipe';

interface CreateRecipeModalProps {
    patient: Patient,
    show: boolean,
    onHide: () => void,
    handleCreateRecipe: (recipe: Recipe) => void,
}

const CreateRecipeModal: React.FC<CreateRecipeModalProps> = ({
    patient, show, onHide, handleCreateRecipe,
}) => {
    const { 
        register, 
        handleSubmit,
        setError, 
        reset,
        formState: { errors, isSubmitting } 
    } = useForm<CreateRecipeDto>({
        resolver: zodResolver(createRecipeSchema),
    });

    const onSubmit: SubmitHandler<CreateRecipeDto> = async (createRecipeDto) => {
        const newRecipe = await recipeService.create({
            ...createRecipeDto,
            patientId: patient.id,
        })

        handleCreateRecipe(newRecipe);
        onHide();
    }

    useEffect(() => {
        reset()
    }, [show])

    return (
        <Modal
            show={show}
            dialogClassName="modal-90w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        New Recipe
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Drug name">
                            <Form.Control {...register('drugName')} 
                                isInvalid={ !!errors.drugName }
                            />
                            <Form.Control.Feedback type="invalid">{ errors.drugName?.message }</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group>
                        <FloatingLabel label="Instructions for usage">
                            <Form.Control {...register('instructionForUsage')} 
                                as="textarea"
                                isInvalid={ !!errors.instructionForUsage }
                                style={{ height: '200px' }}
                            />
                            <Form.Control.Feedback type="invalid">{ errors.instructionForUsage?.message }</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        className='w-100' 
                        disabled={isSubmitting}
                    >
                        Create {isSubmitting && (<Spinner size='sm'/>)}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CreateRecipeModal