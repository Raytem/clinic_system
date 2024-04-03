import DoctorList from "@/components/lists/DoctorList";
import { doctorService } from "@/services/doctor.service";

export default async function DoctorsPagePage() {
  const doctors = await doctorService.getAll();

  return (
    <>
      <h2 className='mb-3'>Doctors</h2>
      <DoctorList doctors={doctors}/>
    </>
  );
}