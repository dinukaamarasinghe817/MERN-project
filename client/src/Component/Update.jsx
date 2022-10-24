import {Views} from './Views'
import {useState, useEffect} from 'react'
import ReactDOM from 'react-dom/client';

export function Update({data}){

    const [recordid, setrecordid] = useState(data.recordid)
    const array = ["Corona","Dengue","Ebola","Pneumonia"]
    const [disease, setdisease] = useState(array[0])
    const request = ({recordid, disease})
    const patients = data.patients;

    async function Updatereport(e){
        e.preventDefault()
        await fetch("http://localhost:5000/updatereport",{
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
        <div className="left" id='left'>
            <form method="POST" onSubmit={Updatereport}>
                <div className="title">
                    <h2>Update Patient Record</h2>
                </div>
                <div className="info">
                    <label htmlFor="id">Record Id</label>
                    <input type="text" name="id" placeholder={data.recordid} value={data.recordid}/>
                    <label htmlFor="disease">Disease Type</label>
                    <select name='disease'onChange={(e)=>{setdisease(e.target.value)}}>
                        <option value={array[0]}>Corona</option>
                        <option value={array[1]}>Dengue</option>
                        <option value={array[2]}>Ebola</option>
                        <option value={array[3]}>Pneumonia</option>
                    </select>
                </div>
                <button type="submit" >Update</button>
            </form>
        </div>
    )
}