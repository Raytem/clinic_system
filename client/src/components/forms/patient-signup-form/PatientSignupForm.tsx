'use client'

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import shared from '@/app/shared.module.css'
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from 'react-bootstrap/Spinner';
import { authService } from '@/services/auth.service';
import { useStore } from '@/stores/contexts/root-store-context';
import { useRouter } from 'next/navigation'
import { LocalStorageItem } from '@/enums/LocalStorageItem';
import { accessTokenUtil } from '@/utils/access-token.util';
import { SignupAsPatientDto } from '@/interfaces/auth/dto/signup-as-patient.dto';
import { signupAsPatientSchema } from 'validation-schemas/auth/signup-as-patient.schema';
import { Sex } from '@/enums/Sex'


const PatientSignupForm = observer(() => {
  const { 
      register, 
      handleSubmit,
      setError, 
      formState: { errors, isSubmitting } 
  } = useForm<SignupAsPatientDto>({
      resolver: zodResolver(signupAsPatientSchema),
  });

  const { userStore } = useStore();
  const router = useRouter()

  const onSubmit: SubmitHandler<SignupAsPatientDto> = async (signupAsPatientDto) => {
    signupAsPatientDto.sex = parseInt(signupAsPatientDto.sex);

      try {
          const userWithToken = await authService.signupAsPatient(signupAsPatientDto);
          const user = userWithToken.user;
          accessTokenUtil.set(userWithToken.accessToken);

          userStore.setUser(user);
          router.push('/appointments')
      } catch (e) {
          setError('root', {
              message: e?.response?.data.message,
          })   
      }
  }

  return (
      <Form className={shared.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4">Signup as Patient</h2>
  
        <Form.Group className="mb-3">
            <FloatingLabel label="First Name">
                <Form.Control {...register('firstName')} 
                    placeholder="First Name"
                    isInvalid={ !!errors.firstName }
                />
                <Form.Control.Feedback type="invalid">{ errors.firstName?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
  
        <Form.Group className="mb-3">
            <FloatingLabel label="Last Name">
                <Form.Control {...register('lastName')} 
                    placeholder="Last Name"
                    isInvalid={ !!errors.lastName }
                />
                <Form.Control.Feedback type="invalid">{ errors.lastName?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
            <FloatingLabel label="Patronymic">
                <Form.Control {...register('patronymic')} 
                    placeholder="Patronymic"
                    isInvalid={ !!errors.patronymic }
                />
                <Form.Control.Feedback type="invalid">{ errors.patronymic?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
            <FloatingLabel label="Birth Date">
                <Form.Control {...register('birthDate')} 
                    placeholder="Birth Date"
                    type='date'
                    isInvalid={ !!errors.birthDate }
                />
                <Form.Control.Feedback type="invalid">{ errors.birthDate?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
            <FloatingLabel label="Sex" className="mb-3">
              <Form.Select {...register('sex')} 
                isInvalid={ !!errors.sex }
              >
                <option value="" disabled selected hidden>Choose</option>
                <option value={Sex.MALE}>Male</option>
                <option value={Sex.FEMALE}>Female</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{ errors.sex?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-5">
            <FloatingLabel label="Address">
                <Form.Control {...register('address')} 
                    placeholder="Address"
                    isInvalid={ !!errors.address }
                />
                <Form.Control.Feedback type="invalid">{ errors.address?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>





        <Form.Group className="mb-3">
            <FloatingLabel label="Phone number">
                <Form.Control {...register('phoneNumber')} 
                    placeholder="Phone number"
                    isInvalid={ !!errors.phoneNumber }
                />
                <Form.Control.Feedback type="invalid">{ errors.phoneNumber?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
  
        <Form.Group className="mb-3">
            <FloatingLabel label="Email address">
                <Form.Control {...register('email')} 
                    placeholder="Email"
                    isInvalid={ !!errors.email }
                />
                <Form.Control.Feedback type="invalid">{ errors.email?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-4">
            <FloatingLabel label="Password">
                <Form.Control {...register('password')} 
                    type="password" 
                    placeholder="Password" 
                    isInvalid={ !!errors.password }
                />
                <Form.Control.Feedback type="invalid">{ errors.password?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>
  
        <div className="d-grid gap-2 mb-5">
          <Button variant="primary" type="submit" className='mb-2' disabled={isSubmitting}>
              Signup {isSubmitting && (<Spinner size='sm'/>)}
          </Button>
          {errors.root && (<p className='text-danger  text-center'>{ errors.root.message }</p>)}
        </div>
      </Form>
    );
})

export default PatientSignupForm