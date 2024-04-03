import ScheduleList from "@/components/lists/ScheduleList";
import { doctorService } from "@/services/doctor.service";
import { getAge } from '@/utils/getAge';
import { getSex } from '@/utils/getSex';
import { getWorkExperience } from '@/utils/getWorkExperience';
import Appointment from '@/components/Appointment'


export default async function DoctorPagePage({ params }) {
  const doctor = await doctorService.getOne(params.doctorId);

  return (
    <div>

      <div className='d-flex gap-5 justify-content-between'>
        <div className='d-flex flex-column gap-4 w-100 justify-content-between'>
          <div className='d-flex flex-column gap-2 w-100'>
            <h2>
              {`Doctor  ${doctor.user.lastName} ${doctor.user.firstName} ${doctor.user.patronymic}`}
            </h2>
            <hr />
            <h5>{`Specialty: ${doctor.specialty}`}</h5>
            <h5> {`Sex: ${getSex(doctor.user.sex)}`}</h5>
            <h5>{`Age: ${getAge(doctor.user.birthDate)}`}</h5>
            <h5>{`Work Experience: ${getWorkExperience(doctor.careerStartDate)}`}</h5>
          </div>
          <Appointment doctor={doctor} />
        </div>
        <div>
          <h4 className='text-center mb-3'>Schedule</h4>
          <ScheduleList schedules={doctor.schedule} />
        </div>

      </div>
      
    </div>
  )
}