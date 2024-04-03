'use client'
import { Doctor } from '@/interfaces/doctor/doctor';
import { getAge } from '@/utils/getAge';
import { getSex } from '@/utils/getSex';
import { getWorkExperience } from '@/utils/getWorkExperience';
import React from 'react'
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/navigation'

interface DoctorItemProps {
    doctor: Doctor,
}

const DoctorItem: React.FC<DoctorItemProps> = ({ doctor }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`doctors/${doctor.id}`);
    }

  return (
    <Card className='cursor-pointer' onClick={handleClick}>
        <Card.Body>
            <Card.Title>
                {`${doctor.user.lastName} ${doctor.user.firstName} ${doctor.user.patronymic}`}
            </Card.Title>
            <hr />
            <Card.Text>{`Specialty: ${doctor.specialty}`}</Card.Text>
            <Card.Text>{`Sex: ${getSex(doctor.user.sex)}`}</Card.Text>
            <Card.Text>{`Age: ${getAge(doctor.user.birthDate)}`}</Card.Text>
            <Card.Text>{`Work Experience: ${getWorkExperience(doctor.careerStartDate)}`}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default DoctorItem