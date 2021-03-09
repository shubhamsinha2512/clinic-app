import './App.css';
import Airtable from 'airtable'
import {useState, useEffect} from 'react'
import {IconButton, Button, Card} from '@material-ui/core'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import Book from './components/Book/Book'
import Display from './components/Display/Display'

function App() {

  var base = new Airtable({apiKey:'key0YplhcbHXuA1Ce'}).base('appN7BezT9bQrwYSh');

  const [Doctors, setDoctors] = useState([]);
  const [Appointments, setAppointments]=useState([]);
  const [DocSelected, setDocSelected]=useState();
  const [count, setCount] = useState(0);

  useEffect(()=>{
    getDoctors().then((result)=>{
      // console.log(result);
      setDoctors(()=>minifyDoctors(result));
    })

    getAppointments().then((result)=>{
      setAppointments(()=>minifyAppointments(result));
      // console.log(Appointments);
    })
    // console.log(result);
  }, [])

  async function getDoctors(){
    var doctors = await base('Doctors').select().firstPage();
    // console.log(doctors);
    return doctors;
  }

  async function getAppointments(){
    var appointments = await base('Appointments').select().firstPage();
    // console.log(appointments);
    return appointments;
  }

  function minifyAppointments(appointments){
    var appMin=[];
    appointments.forEach(appointment => {
      appMin.push({
        'id':appointment.id,
        'PatientName':appointment.fields.PatientName,
        'DoctorName':appointment.fields.DoctorName[0],
        'DoctorId':appointment.fields.DoctorId[0],
        'Timings':appointment.fields.Timings
      })
    })
    setCount((count)=>count+1);
    // console.log(appMin);
    return appMin;
  }

  function minifyDoctors(doctors){
    var docMin=[];
    doctors.forEach(doctor => {
      docMin.push({
        'id':doctor.id,
        'DoctorName':doctor.fields.DoctorName,
        'Speciality':doctor.fields.Speciality,
      })
    });
    // console.log(docMin);
    return docMin;
  }

  function handleClick(e){
    alert(e.target.id);
  }


  function createAppointment(PatientName, DoctorId, Timings){
    return base('Appointments').create([
      {
      "fields":{
        "PatientName":PatientName,
        "DoctorId":[DoctorId],
        "Timings":Timings
        }
      }
    ])
  }

  return (
    <div className="App">

      <div className='appHeader'>
        <h1>Clinic Application</h1>
      </div>

      <Router>
        <Link to='/book' ><div class='bookBtn' >Book Appointment</div></Link>
        <Link to='/details' ><div class='detBtn' >Check Appointment Details</div></Link>
        <hr/>
        <Switch>
        <Route path='/book'>
          <Book 
            doctorsList={Doctors} 
            appointmentsList={Appointments} 
            setDocSelected={setDocSelected} 
            createAppointment = {createAppointment}
          />
        </Route>

        <Route path='/details'>
          <Display appointments={Appointments} />
        </Route>
      </Switch>

      </Router>
    </div>
  );
}

export default App;
