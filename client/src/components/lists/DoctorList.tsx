import { Doctor } from '@/interfaces/doctor/doctor'
import React from 'react'
import Card from 'react-bootstrap/Card';
import DoctorItem from '../items/doctor-item/DoctorItem';

interface DoctorListProps {
    doctors: Doctor[],
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
    if (!doctors.length) {
        return (
            <Card>
                <Card.Body>
                    No doctors found
                </Card.Body>
            </Card>
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