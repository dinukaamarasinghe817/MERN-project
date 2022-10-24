import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom/client";
import { Views } from "./Views";

export function Dashboard(){

    async function DisplayRecord(){
        await fetch('http://localhost:5000/viewpatients').then((Response) => {
            return Response.json()
        }).then((data)=>{
            const view = ReactDOM.createRoot(document.getElementById("views"));
            view.render(<Views data = {data}/>)
        })
    }

    function DisplayProfile(){

    }

    function Logout(){

    }

    return (
        <div>
            <div className="container">
                <div className="navbar">
                    <ul>
                        <li><a>Home</a></li>
                    </ul>
                </div>

                <div className="main">

                    <div className="sidemenu">
                        <ul>
                            <li><a onClick={DisplayProfile}>My Profile</a></li>
                            <li><a onClick={DisplayRecord}>Patients</a></li>
                            <li><a onClick={Logout}>Logout</a></li>
                        </ul>
                    </div>

                    <div className="views" id="views">

                        
                    </div>

                </div>

            </div>

        </div>
    );
}