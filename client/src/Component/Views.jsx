import {Record} from './Record'
import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client';
import Comp from './Comp'
export function Views({data}){

    const [patientid, setpatientid] = useState("")
    const array = ["Corona","Dengue","Ebola","Pneumonia"]
    const [disease, setdisease] = useState(array[0])
    const request = ({patientid, disease})
    const patients = data.patients;
    async function AddReport(e){
        e.preventDefault()
        await fetch("http://localhost:5000/addreport",{
        method: "POST",
        headers:{
            "Accept":"application/json",
            "Content-Type": "application/json"
    
        },
        body:JSON.stringify(request)
        }).then((Response) => {
        return Response.json()
        }).then((data)=>{
        const left = ReactDOM.createRoot(document.getElementById("views"));
        left.render(<Views data = {data}/>)
        })
    }

    return (
        <>
        <div className="left" id='left'>
            <form method="POST" onSubmit={AddReport}>
                <div className="title">
                    <h2>Add Patient Record</h2>
                </div>
                <div className="info">
                    <label htmlFor="id">Patient Id</label>
                    <input type="text" name="id" placeholder="Patient Id" value={patientid} onChange={(e)=>{setpatientid(e.target.value)}}/>
                    <label htmlFor="disease">Disease Type</label>
                    <select name='disease'onChange={(e)=>{setdisease(e.target.value)}}>
                        <option value={array[0]}>Corona</option>
                        <option value={array[1]}>Dengue</option>
                        <option value={array[2]}>Ebola</option>
                        <option value={array[3]}>Pneumonia</option>
                    </select>
                </div>
                <button type="submit" >Submit</button>
            </form>
        </div>

        <div className="right">
            <h2>Patient Records</h2>
            <div className="details">
                <table className="patients">
                    <thead>
                        <tr>
                            <th>Record Id</th>
                            <th>Patient Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Disease</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        { patients && patients.length > 0 ? (
                            
                            patients.map((patient) => {return <Record user = {patient}/>} )
                            
                        ):(
                            <p>No patients found</p>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        </>
    )
}