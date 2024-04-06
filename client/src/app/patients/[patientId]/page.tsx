'use client'
import { patientService } from "@/services/patient.service";
import { getAge } from '@/utils/getAge';
import { getSex } from '@/utils/getSex';
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import CenteredSpinner from '@/components/CenteredSpinner';
import { Patient } from "@/interfaces/patient/patient";
import { Role } from '@/enums/Role';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/contexts/root-store-context';
import RecipesPanel from '@/components/RecipesPanel'

 const PatientPage = observer(({ params }) => {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [getPatient, isLoading] = useFetch(async () => {
    const resData = await patientService.getOne(params.patientId);
    setPatient(resData);
  })

  const {userStore} = useStore();

  useEffect(() => {
    getPatient()
  }, [])
  
  return (
    <div>
      {
        isLoading || !patient
        ?
          (<CenteredSpinner />)
        :
          (
            <>
              <div className='d-flex flex-column gap-2 w-100'>
                <h2>
                  {`Patient: ${patient.user.lastName} ${patient.user.firstName} ${patient.user.patronymic}`}
                </h2>
                <hr />
                <h5> {`Sex: ${getSex(patient.user.sex)}`}</h5>
                <h5>{`Age: ${getAge(patient.user.birthDate)}`}</h5>
                <h5> {`Email: ${patient.user.email}`}</h5>
                <h5> {`Address: ${patient.address}`}</h5>
              </div>

              {
                userStore.user?.roles[0] === Role.DOCTOR &&
                (
                  <RecipesPanel
                    patient={patient}
                  />
                )
              }
            </>
          )
      }
    </div>
  )
})

export default PatientPage