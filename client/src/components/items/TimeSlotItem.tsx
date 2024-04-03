import { TimeSlot } from '@/interfaces/schedule/timeSlot';
import React from 'react'
import Button from 'react-bootstrap/Button';

interface TimeSlotItemProps {
    timeSlot: TimeSlot,
    selectedSlot: TimeSlot,
    setSelectedSlot: (slot: TimeSlot) => void,
}

const TimeSlotItem: React.FC<TimeSlotItemProps> = ({ 
  timeSlot, selectedSlot, setSelectedSlot 
}) => {
  const handleSlotClick = () => {
    setSelectedSlot(timeSlot);
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
        <Button
          onClick={handleSlotClick} 
          variant={timeSlot === selectedSlot ? 'primary' : 'outline-primary'}
        >
          {timeSlot.timeStr}
        </Button>
    </div>
  )
}

export default TimeSlotItem