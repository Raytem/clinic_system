'use client'
import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import MakeAppointmentModal from '@/components/modals/MakeAppointmentModal'
import { Doctor } from '@/interfaces/doctor/doctor';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/contexts/root-store-context';
import { Role } from '@/enums/Role'

interface AppointmentProps {
  doctor: Doctor
}

const Appointment: React.FC<AppointmentProps> = observer(({ doctor }) => {
  const {userStore} = useStore();
  const [show, setShow] = useState<boolean>(false);

  const onHide = () => {
    setShow(false);
  }

  return (
    <>
        {
          (userStore.user && userStore.user.roles[0] === Role.PATIENT)
          &&
          (
            <>
              <Button 
                variant='primary'
                onClick={() => setShow(true)}
              >
                  Make an appointment
              </Button>
              <MakeAppointmentModal 
                doctor={doctor}
                show={show}
                onHide={onHide}
              />
            </>
          )
        }
    </>
  )
})

export default Appointment