import { Schedule } from '@/interfaces/schedule/schedule'
import React from 'react'
import ScheduleItem from '../items/schedule-item/ScheduleItem'
import ListGroup from 'react-bootstrap/ListGroup';

interface ScheduleListProps {
    schedules: Schedule[],
}

const ScheduleList: React.FC<ScheduleListProps> = ({ schedules }) => {
  return (
    <ListGroup style={{minWidth: '400px'}}>
        {
            schedules.map(schedule => (
                <ScheduleItem
                    key={schedule.id}
                    schedule={schedule}
                />
            ))
        }
    </ListGroup>
  )
}

export default ScheduleList