import React from 'react'
import './Slot.css'

function Slot({id, time, booked, handleSlotSelect}) {
    // console.log(booked);
    return (
        <button disbaled={booked} onClick={handleSlotSelect} className='slot'>
            {time}
        </button>
    )
}

export default Slot