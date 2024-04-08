import { Doctor } from '@/interfaces/doctor/doctor'
import React from 'react'
import { Alert } from 'react-bootstrap'
import DoctorItem from '../items/doctor-item/DoctorItem';

interface DoctorListProps {
    doctors: Doctor[],
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
    if (!doctors.length) {
        return (
            <Alert variant='light'>
                No doctors found
            </Alert>
        )
    }

  return (
    <div className='d-flex flex-column gap-4'>
         {
            doctors.map(doctor => (
                <DoctorItem 
                    key={doctor.id} 
                    doctor={doctor} 
                />
            ))
        }
    </div>
  )
}

export default DoctorList