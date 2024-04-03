import { TimeSlot } from '@/interfaces/schedule/timeSlot'
import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-bootstrap/Carousel';
import TimeSlotItem from '../items/TimeSlotItem';
import Slider from "react-slick";
import { TimeSlot } from '@/interfaces/schedule/timeSlot';

interface TimeSlotCarouselProps {
    timeSlots: TimeSlot[],
    selectedSlot: TimeSlot,
    setSelectedSlot: (slot: TimeSlot) => void,
}

const TimeSlotCarousel: React.FC<TimeSlotCarouselProps> = ({ 
  timeSlots, selectedSlot, setSelectedSlot 
}) => {

    let settings = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 740,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              infinite: false,
              dots: false
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              dots: false
            }
          },
        ]
      };


    if (!timeSlots.length) {
        return (
            <Alert variant='light'>
                No time slots found for specified date
            </Alert>
        )
    }

  return (
    <div className='d-flex justify-content-center'>
        <div className="slider-container" style={{maxWidth: 500, minWidth: 0, margin: '0 20px'}}>
            <Slider {...settings}>
                {
                  timeSlots.map(slot => (
                    <TimeSlotItem 
                      key={slot.timeStr} 
                      timeSlot={slot}
                      selectedSlot={selectedSlot}
                      setSelectedSlot={setSelectedSlot}
                    />
                  ))
                }
            </Slider>
        </div>
    </div>
  )
}

export default TimeSlotCarousel