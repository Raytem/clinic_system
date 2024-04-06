'use client'
import { Schedule } from '@/interfaces/schedule/schedule'
import React from 'react'
import { weekDayMap } from '@/constants/weekDayMap';
import ListGroup from 'react-bootstrap/ListGroup';

interface ScheduleItemProps {
    schedule: Schedule,
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule }) => {
  return (
    <ListGroup.Item>
      <div className='d-flex justify-content-between'>
        <div className=''>{weekDayMap.get(schedule.weekDay)}</div>
        <div style={{paddingLeft: '10px'}}>
          {schedule.startTime}
          <span> - </span>
          {schedule.endTime}
        </div>
      </div>
    </ListGroup.Item>
  )
}

export default ScheduleItem