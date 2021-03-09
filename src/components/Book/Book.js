import React from 'react'
import {useState, useEffect} from 'react'
import {InputLabel, Select, MenuItem} from '@material-ui/core'

import Slot from '../Slot/Slot'
import './Book.css'

function Book({doctorsList, appointmentsList, setDocSelected, createAppointment}) {

    const [doc, setDoc] = useState('Select Doctor...');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [patientName, setPatientName]=useState('');
    var slots = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00']
    var docAppointments=[];

    function handlePatient(e){
        setPatientName(e.target.value);
    }
    
    function handleDocSelect(e){
        setDoc(e.target.value);
        setDocSelected(e.target.value);
        docAppointments=appointmentsList.filter((appointment)=>{return appointment.DoctorId === doc.id})
        // console.log(doc);
        // console.log(docAppointments);
    }

    function handleSlotSelect(e){
        setSelectedSlot(e.target.innerHTML);
        // console.log(selectedSlot);
    }

    async function handleCreate(){
        var record = await createAppointment(patientName, doc.id, selectedSlot);
        // console.log(record);
    }

    return (
        <div className='book'>
            <h1>Book Appointment</h1>
            <div className='inputs'>
                
                <div className='patient'>
                    {/* <InputLabel>Patient Name:</InputLabel> */}
                    <input className='patientName' placeholder='Enter Patient Name...'  value={patientName} onChange={handlePatient} />
                </div>

                <div className='doctor'>
                    
                    <select className='doctorSelect' value={doc} onChange={handleDocSelect}>
                        <option disbaled >Select Doctor</option>
                        {doctorsList.map((doctor, i)=>{
                            return (<option key={i} value={doctor}>{doctor.DoctorName}</option>)
                        })}
                    </select>
                </div>
                </div>
                <div className='slots'>
                    {slots.map((slot, i)=>{
                        if(slot in docAppointments.filter((x)=> {return x.Timings}))
                            return (<Slot key={i} id={'slot'+i} time={slot} booked={true} handleSlotSelect={handleSlotSelect} />)
                        else
                            return (<Slot key={i} id={'slot'+i} time={slot} booked={false} handleSlotSelect={handleSlotSelect} />)
                        })
                    }
                </div>
        
                <button className='bookSubmit' onClick={handleCreate}>Book</button> 
        </div>
    )
}

export default Book
