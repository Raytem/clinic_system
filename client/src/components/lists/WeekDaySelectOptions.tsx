import React from 'react'
import { WeekDay } from '@/enums/WeekDay'

interface WeekDaySelectOptionsProps {
    weekDayMap: Map<WeekDay, string>,
}

const WeekDaySelectOptions: React.FC<WeekDaySelectOptionsProps> = ({ weekDayMap }) => {
  return (
    <>
        {
            Array.from(weekDayMap.entries()).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
            ))
        }
    </>
  )
}

export default WeekDaySelectOptions