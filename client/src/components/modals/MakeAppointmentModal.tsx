'use client'
import { Doctor } from '@/interfaces/doctor/doctor';
import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import TimeSlotCarousel from '@/components/lists/TimeSlotCarousel'
import { TimeSlot } from '@/interfaces/schedule/timeSlot';
import { doctorService } from '@/services/doctor.service'
import { appointmentService } from '@/services/appointment.service'
import CenteredSpinner from '@/components/CenteredSpinner'
import { useFetch } from '@/hooks/useFetch'
import { CreateAppointmentDto } from '../../interfaces/appointment-record/create-appointment.dto';
import { TimeSlot } from '@/interfaces/schedule/timeSlot'
import Spinner from 'react-bootstrap/Spinner';

interface MakeAppointmentModal {
    doctor: Doctor,
    show: boolean,
    onHide: () => void
}

const MakeAppointmentModal: React.FC<MakeAppointmentModal> = ({ doctor, show, onHide }) => {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [desiredDate, setDesiredDate] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    useEffect(() => {
        if (desiredDate) {
            getSlots();
        }
    }, [desiredDate])

    useEffect(() => {
        if (!show) {
            setDesiredDate('');
        } else {
            setDesiredDate(new Date().toISOString().split('T')[0]);
        }
        // setSelectedSlot(slots[0]);
    }, [show])

    const [getSlots, isLoading] = useFetch(async () => {
        try {
            const slots = await doctorService.getTimeSlots(doctor.id, new Date(desiredDate));
            setSlots(slots);
            setSelectedSlot(slots[0]);
        } catch (e) {
            if (e.response.status === 404) {
                setSlots([]);
            }
        }
    })

    //@ts-ignore
    const [createAppointment, isSubmitting] = useFetch(async (createAppointmentDto: CreateAppointmentDto) => {
        await appointmentService.create(createAppointmentDto);
        onHide();
    })


    const handleDateChange = (e) => {
        //@ts-ignore
        const date = e.target.value;
        setDesiredDate(date);
    }

    const onSubmit = () => {
        if (selectedSlot) {
            const createAppointmentDto: CreateAppointmentDto = {
                dateTime: selectedSlot.dateTime,
                doctorId: doctor.id,
            }
            createAppointment(createAppointmentDto);
        }
    }

  return (
    <Modal
        show={show}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Appointment
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <h4 className='mb-4'>
                {`Doctor ${doctor.user.lastName} ${doctor.user.firstName} ${doctor.user.patronymic}`}
            </h4>
            <p className='mb-3'>
                To make an appointment just select desired date and than choose a free slot if it exists
            </p>
            <Form.Group>
                <FloatingLabel label="Desired date">
                    <Form.Control 
                        type="date"
                        onChange={handleDateChange}
                        defaultValue={desiredDate}
                    />
                </FloatingLabel>
            </Form.Group>

            <h5 className='mb-3 mt-4'>Choose time slot:</h5>
            {
                isLoading 
                ?
                <CenteredSpinner />
                :
                <TimeSlotCarousel 
                    timeSlots={slots}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                />
            }

        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-center'>
            <Button 
                variant="primary" 
                type="submit" 
                className='w-100' 
                disabled={isSubmitting}
                onClick={onSubmit}
            >
                Apply {isSubmitting && (<Spinner size='sm'/>)}
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default MakeAppointmentModal