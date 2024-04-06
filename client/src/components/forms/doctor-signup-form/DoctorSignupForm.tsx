'use client'

import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import shared from '@/app/shared.module.css'
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from 'react-bootstrap/Spinner';
import { authService } from '@/services/auth.service';
import { useStore } from '@/stores/contexts/root-store-context';
import { useRouter } from 'next/navigation'
import { accessTokenUtil } from '@/utils/access-token.util';
import { SignupAsDoctorDto } from '@/interfaces/auth/dto/signup-as-doctor.dto';
import { signupAsDoctorSchema } from 'validation-schemas/auth/signup-as-doctor.schema';
import { Sex } from '@/enums/Sex'
import { Schedule } from '@/enums/Schedule'
import CreateScheduleList from '@/components/lists/CreateScheduleList';


const DoctorSignupForm = observer(() => {
    const { userStore } = useStore();
    const router = useRouter()

    const { 
        register, 
        handleSubmit,
        setError, 
        control,
        formState: { errors, isSubmitting } 
    } = useForm<SignupAsDoctorDto>({
        resolver: zodResolver(signupAsDoctorSchema),
    });

    const { 
        fields: schedule, 
        append: appendSchedule, 
        remove: removeSchedule, 
    } = useFieldArray({
        control,
        name: 'schedule',
    });


  const onSubmit: SubmitHandler<SignupAsDoctorDto> = async (signupAsDoctorDto) => {
    //@ts-ignore
    signupAsDoctorDto.sex = parseInt(signupAsDoctorDto.sex);
    signupAsDoctorDto.schedule.map(sch => {
        sch.weekDay = +sch.weekDay
        return sch;
    })

    try {
        const userWithToken = await authService.signupAsDoctor(signupAsDoctorDto);
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

  const handleAddSchedule = () => {
    if (schedule.length < 7) {
        appendSchedule({} as Schedule)
    }
  }

  const handleRemoveSchedule = (selectedSchedule: Schedule) => {
    removeSchedule(selectedSchedule);
  }

  return (
      <Form className={shared.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2 className="mb-4">Signup as Doctor</h2>
  
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


        <Form.Group className="mb-5">
            <FloatingLabel label="Sex" className="mb-3">
              <Form.Select {...register('sex')} 
                isInvalid={ !!errors.sex }
                defaultValue=''
              >
                <option value="" disabled hidden>Choose</option>
                <option value={Sex.MALE}>Male</option>
                <option value={Sex.FEMALE}>Female</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{ errors.sex?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>



        <Form.Group className="mb-3">
            <FloatingLabel label="Career Start Date">
                <Form.Control {...register('careerStartDate')} 
                    placeholder="Career Start Date"
                    type='date'
                    isInvalid={ !!errors.careerStartDate }
                />
                <Form.Control.Feedback type="invalid">{ errors.careerStartDate?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-5">
            <FloatingLabel label="Specialty">
                <Form.Control {...register('specialty')} 
                    placeholder="Specialty"
                    isInvalid={ !!errors.specialty }
                />
                <Form.Control.Feedback type="invalid">{ errors.specialty?.message }</Form.Control.Feedback>
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

        <Form.Group className="mb-5">
            <FloatingLabel label="Password">
                <Form.Control {...register('password')} 
                    type="password" 
                    placeholder="Password" 
                    isInvalid={ !!errors.password }
                />
                <Form.Control.Feedback type="invalid">{ errors.password?.message }</Form.Control.Feedback>
            </FloatingLabel>
        </Form.Group>


        <div className='d-flex justify-content-between align-items-center'>
            <h4 className="">Schedule</h4>
            <Button variant='outline-primary' onClick={handleAddSchedule}>Add day</Button>
        </div>

        <hr />

        <CreateScheduleList 
            schedule={schedule} 
            handleRemoveSchedule={handleRemoveSchedule}
            register={register}
            errors={errors}
        />
  
        <div className="d-grid gap-2 mb-5 mt-4">
          <Button variant="primary" type="submit" className='mb-2' disabled={isSubmitting}>
              Signup {isSubmitting && (<Spinner size='sm'/>)}
          </Button>
          {errors.root && (<p className='text-danger  text-center'>{ errors.root.message }</p>)}
        </div>
      </Form>
    );
})

export default DoctorSignupForm;