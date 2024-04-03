import { Schedule } from '@/interfaces/schedule/schedule'
import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import CreateScheduleItem from '../items/create-schedule-item/CreateScheduleItem';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { SignupAsDoctorDto } from '@/interfaces/auth/dto/signup-as-doctor.dto';
import { weekDayMap } from '@/constants/weekDayMap';
import { WeekDay } from '@/enums/WeekDay';

interface CreateScheduleListProps {
  schedule: Schedule[],
  handleRemoveSchedule: (selectedSchedule: Schedule) => void,
  register: UseFormRegister<SignupAsDoctorDto>,
  errors: FieldErrors<SignupAsDoctorDto>,
}

const CreateScheduleList: React.FC<CreateScheduleListProps> = ({
   schedule, handleRemoveSchedule , register, errors,
}) => {

  if (!schedule.length) {
    return (
      <Alert variant='danger'>
        The days have not been added to the schedule yet
      </Alert>
    )
  }

  return (
    <div className='d-flex flex-column gap-3'>
      {schedule.map((sch, idx) => (
        <CreateScheduleItem
          key={idx} 
          index={idx}
          schedule={sch}
          register={register}
          errors={errors}
          handleRemoveSchedule={handleRemoveSchedule}
        />
      ))}
    </div>
  )
}

export default CreateScheduleList