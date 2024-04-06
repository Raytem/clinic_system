import { AppointmentRecord } from '@/interfaces/appointment-record/appointment-record'
import React from 'react'
import AppointmentItem from '../items/AppointmentItem'
import Alert from 'react-bootstrap/Alert';

interface AppointmentListProps {
    appointments: AppointmentRecord[],
    handleCancelAppointment: (id: number) => void
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, handleCancelAppointment }) => {

    if (!appointments.length) {
        return (
          <Alert variant='light'>
            You have no appointments
          </Alert>
        )
      }

  return (
    <div className='d-flex flex-column gap-3 mb-4'>
        {
            appointments.map(appointment => (
                <AppointmentItem 
                    key={appointment.id} 
                    appointment={appointment}
                    handleCancelAppointment={handleCancelAppointment}
                />
            ))
        }
    </div>
    )
}

export default AppointmentList