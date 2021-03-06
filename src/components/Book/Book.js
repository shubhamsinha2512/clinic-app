import React from 'react'
import {useState, useEffect} from 'react'

import Slot from '../Slot/Slot'
import './Book.css'

function Book({doctorsList, appointmentsList, createAppointment, updateAppointments}) {

    const [doc, setDoc] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [patientName, setPatientName]=useState('');
    const [slots, setSlots] = useState(['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00']);


    function handlePatient(e){
        setPatientName(e.target.value);
    }
    
    function handleDocSelect(e){
        setDoc(e.target.value);
        populateSlots(freeSlots(doc));
    }

    function handleSlotSelect(e){
        setSelectedSlot(e.target.innerHTML);
    }

    async function handleCreate(){
        var record = await createAppointment(patientName, doc, selectedSlot);
        updateAppointments(record);
    }

    function populateSlots(slots){
        return slots.map((slot, i)=>{
            return (
                <Slot 
                    key={i} 
                    id={'slot'+i} 
                    time={slot} 
                    handleSlotSelect={handleSlotSelect} 
                />)
        })
    }

    function freeSlots(DoctorId){
        var allApp = appointmentsList.filter((a)=> {return a.DoctorId === DoctorId});
        var occupiedSlots = allApp.map((a,i)=> a.Timings);
        var freeSlots = slots.filter((slot)=> !occupiedSlots.includes(slot));
        
        return freeSlots;
    }

    return (
        <div className='book'>
            <h1>Book Appointment</h1>
            <div className='inputs'>
                
                <div className='patient'>
                    <input 
                        className='patientName' 
                        placeholder='Enter Patient Name...'  
                        value={patientName} 
                        onChange={handlePatient} />
                </div>

                <div className='doctor'>
                    
                    <select 
                        className='doctorSelect' 
                        value={doc} 
                        onChange={handleDocSelect}
                    >
                        <option disbaled >Select Doctor</option>
                            {doctorsList.map((doctor, i)=>{
                                return (<option key={i} value={doctor.id}>{doctor.DoctorName}</option>)
                            })}

                    </select>
                </div>
            </div>

            <div className='slots'>
                <h2>Available Slots:</h2>
                {populateSlots(freeSlots(doc))}
            </div>
    
            <button className='bookSubmit' onClick={handleCreate}>Book</button> 
        </div>
    )
}

export default Book
