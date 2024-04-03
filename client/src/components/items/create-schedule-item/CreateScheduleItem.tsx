'use client'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import shared from '@/app/shared.module.css'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { WeekDay } from '@/enums/WeekDay';
import { Schedule } from '@/interfaces/schedule/schedule';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { scheduleItemSchema } from '@/validation-schemas/auth/schedule-item.schema';
import { UseFormRegister } from 'react-hook-form';
import { SignupAsDoctorDto } from '@/interfaces/auth/dto/signup-as-doctor.dto';
import { weekDayMap } from '@/constants/weekDayMap'
import WeekDaySelectOptions from "@/components/lists/WeekDaySelectOptions";

interface CreateScheduleItemProps { 
  schedule: Schedule,
  index: number,
  handleRemoveSchedule: (selectedSchedule: Schedule) => void,
  register: UseFormRegister<SignupAsDoctorDto>,
  errors: FieldErrors<SignupAsDoctorDto>,
}

const CreateScheduleItem: React.FC<CreateScheduleItemProps> = ({ 
  schedule, index, handleRemoveSchedule, register, errors, 
}) => {

  return (
    <Card>
      <Card.Header className='d-flex justify-content-between'>
        <div/>
        <Button 
          className='px-3' 
          variant="outline-danger"
          size='sm' 
          onClick={() => {
            handleRemoveSchedule(schedule);
          }}
        >
          X
        </Button>
      </Card.Header>
      <Card.Body> 
        <Row>
          <Col>
            <Form.Group>
              <FloatingLabel label="Week Day">
                <Form.Select 
                  {...register(`schedule.${index}.weekDay`)} 
                  isInvalid={ !!errors.schedule?.[index]?.weekDay }
                  defaultValue=''
                >
                  <option value="" disabled hidden>Choose</option>
                  <WeekDaySelectOptions 
                    weekDayMap={weekDayMap}
                  />
                </Form.Select>
                <Form.Control.Feedback type="invalid">{ errors.schedule?.[index]?.weekDay?.message }</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <FloatingLabel label="Start Time">
              <Form.Control
                    {...register(`schedule.${index}.startTime`)} 
                    placeholder="Start Time"
                    type='time'
                    isInvalid={ !!errors.schedule?.[index]?.startTime }
                />
                <Form.Control.Feedback type="invalid">{ errors.schedule?.[index]?.startTime?.message }</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <FloatingLabel label="End Time">
              <Form.Control 
                    {...register(`schedule.${index}.endTime`)} 
                    placeholder="End Time"
                    type='time'
                    isInvalid={ !!errors.schedule?.[index]?.endTime }
                />
                <Form.Control.Feedback type="invalid">{ errors.schedule?.[index]?.endTime?.message }</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mt-3">
          <FloatingLabel label="Average appointment time (hh:mm)">
              <Form.Control 
                  {...register(`schedule.${index}.avgAppointmentTime`)} 
                  placeholder="Average appointment time" 
                  type='time'
                  isInvalid={ !!errors.schedule?.[index]?.avgAppointmentTime }
              />
              <Form.Control.Feedback type="invalid">
                { errors.schedule?.[index]?.avgAppointmentTime?.message }
              </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        {errors.schedule?.root && (<p className='text-danger  text-center mt-2 mb-0'>{ errors.schedule?.root.message }</p>)}
      </Card.Body>
    </Card>
  );
}

export default CreateScheduleItem