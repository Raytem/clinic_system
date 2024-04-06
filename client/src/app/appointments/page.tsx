'use client'
import AppointmentList from "@/components/lists/AppointmentList";
import { useFetch } from "@/hooks/useFetch";
import { AppointmentRecord } from "@/interfaces/appointment-record/appointment-record";
import { appointmentService } from "@/services/appointment.service";
import { useEffect, useState } from "react";
import CenteredSpinner from '../../components/CenteredSpinner';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([])

  const [getAppointments, isLoading] = useFetch(async () => {
    const respData = await appointmentService.getAll();

    const sortedApps = respData.sort((a1, a2) => {
      return new Date(a2.dateTime) - new Date(a1.dateTime)
    })
    
    setAppointments(sortedApps)
  })

  const handleCancelAppointment = (id: number): void => {
    const filteredAppointments = appointments.filter(app => app.id !== id);
    setAppointments(filteredAppointments)
  }

  useEffect(() => {
    getAppointments();
  }, [])

  return (
    <>
      <h2 className='mb-3'>Appointments</h2>
      {
        isLoading 
        ?
          <CenteredSpinner/>
        :
        (
          <AppointmentList 
            appointments={appointments} 
            handleCancelAppointment={handleCancelAppointment}
          />
        )
      }
    </>
  );
}