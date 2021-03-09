import React from 'react'
import './Display.css'

function Display({appointments}) {

    return (
        <div className='display'>
            <h1>Scheduled Appointments</h1>
            <table>
                <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Timings</th>
                    </tr>
                </thead>
                <tbody>
                    
                {appointments.map((appointment, i)=>{
                    return (<tr key={i}>
                            <td className='bookId'>{appointment.id}</td>
                            <td>{appointment.PatientName}</td>
                            <td>{appointment.DoctorName}</td>
                            <td>{appointment.Timings}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Display
