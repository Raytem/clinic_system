'use client'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import shared from '@/app/shared.module.css'
import { observer } from 'mobx-react-lite';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginDto } from '@/interfaces/auth/dto/login.dto';
import { loginSchema } from 'validation-schemas/auth/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Spinner from 'react-bootstrap/Spinner';
import { authService } from '@/services/auth.service';
import { useStore } from '@/stores/contexts/root-store-context';
import { useRouter } from 'next/navigation'
import { LocalStorageItem } from '@/enums/LocalStorageItem';
import { accessTokenUtil } from '@/utils/access-token.util';
import { Role } from '@/enums/Role';


const LoginForm = observer(() => {
    const { 
        register, 
        handleSubmit,
        setError, 
        formState: { errors, isSubmitting } 
    } = useForm<LoginDto>({
        resolver: zodResolver(loginSchema),
    });

    const { userStore } = useStore();
    const router = useRouter()

    const onSubmit: SubmitHandler<LoginDto> = async (loginDto) => {
        try {
            const userWithToken = await authService.login(loginDto);
            const user = userWithToken.user;
            accessTokenUtil.set(userWithToken.accessToken);

            userStore.setUser(user);

            if (user.roles[0] === Role.DOCTOR) {
                router.push('/doctor/appointments')
            } else if (user.roles[0] === Role.PATIENT) {
                router.push('/doctors')
            }
        } catch (e) {
            setError('root', {
                message: e?.response?.data.message,
            })   
        }
    }

    return (
        <Form noValidate className={shared.formContainer} onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-4">Login</h2>

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
                    Login {isSubmitting && (<Spinner size='sm'/>)}
                </Button>
                {errors.root && (<p className='text-danger text-center'>{ errors.root.message }</p>)}
            </div>
        </Form>
    )
})

export default LoginForm;