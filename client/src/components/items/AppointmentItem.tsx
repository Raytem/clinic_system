import { AppointmentRecord } from '@/interfaces/appointment-record/appointment-record';
import { useStore } from '@/stores/contexts/root-store-context';
import { dateFormatterUtil } from '@/utils/date-formatter.util';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import React from 'react'
import Card from 'react-bootstrap/Card';
import Link from 'next/link'
import { Role } from '@/enums/Role';
import { useFetch } from '@/hooks/useFetch';
import { appointmentService } from '@/services/appointment.service';

interface AppointmentItemProps {
    appointment: AppointmentRecord,
    handleCancelAppointment: (id: number) => void
}

const AppointmentItem: React.FC<AppointmentItemProps> = observer(({appointment, handleCancelAppointment}) => {
    const appointmentTime = new Date(appointment.dateTime)

    const {userStore} = useStore();
    const [cancelAppointment, isCanceling] = useFetch(async () => {
        await appointmentService.delete(appointment.id);
        handleCancelAppointment(appointment.id);
    })

    const handleCancelClick = () => {
        cancelAppointment()
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {
                        `${dateFormatterUtil.getEngDate(appointmentTime)}, ${dateFormatterUtil.getEngTime(appointmentTime)}`
                    }
                </Card.Title>
                <Card.Text>
                    {
                        userStore.user?.roles[0] === Role.DOCTOR &&
                        (
                            <div className='d-flex gap-2 align-items-center justify-content-between'>
                                <div className='d-flex gap-2'>
                                    <p>Patient:</p>
                                    <Link className='link' href={`patients/${appointment.patient.id}`}>
                                        {`${appointment.patient.user.lastName} ${appointment.patient.user.firstName} ${appointment.patient.user.patronymic}`}
                                    </Link>
                                </div>
                                { 
                                    new Date() < appointmentTime &&
                                    (
                                        <Button variant="success" disabled={true}>Actual</Button>
                                    )
                                }
                            </div>
                        )
                    }

                    {
                        userStore.user?.roles[0] === Role.PATIENT &&
                        (
                            <div className='d-flex gap-2 align-items-center justify-content-between'>
                                <div className='d-flex gap-2'>
                                    <p>Doctor: </p>
                                    <Link className='link' href={`doctors/${appointment.doctor.id}`}>
                                        {`${appointment.doctor.user.lastName} ${appointment.doctor.user.firstName} ${appointment.doctor.user.patronymic}`}
                                    </Link>
                                </div>
                               { 
                                    new Date() < appointmentTime &&
                                    (
                                        <Button 
                                            onClick={handleCancelClick}
                                            variant="danger" 
                                            type="submit" 
                                            className='mb-2' 
                                            disabled={isCanceling}
                                        >
                                            Cancel {isCanceling && (<Spinner size='sm'/>)}
                                        </Button>
                                    )
                                }
                            </div>
                        )
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    )
})

export default AppointmentItem