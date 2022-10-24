const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { request } = require('express');
const mongoose = require("mongoose")
const Record = require("./Models/Record")
const Patient = require("./Models/Patient")

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.text({type: 'text/plain'}))
app.use(cors())

const url = "mongodb://localhost:27017/mern"
mongoose.connect(url)

app.get("/viewpatients", (req, res)=>{
    const arr = Record.find({},(err,data)=>{
        const result = data
        res.json({"patients" : result})
    })
})

app.post("/addreport", (req, res) => {
    const record = req.body;
    // console.log(record)
    Patient.findOne({patientid: record.patientid },(err,dataparent)=>{
        
        var id
        Record.find({}).sort({_id:-1}).limit(1).exec((err, data)=>{
            console.log(data[0])
            if(data[0] !== undefined){
                id = data[0]._id+1;
            }else{
                id = 1;
            }
            Record.create({_id: id, patientid: dataparent.patientid, name: dataparent.name, age: dataparent.age, disease: record.disease},(err,data)=>{
                if(err) throw err
                res.redirect('/viewpatients')
            })
        })
        
    })

})

app.post("/deleterecord", async(req,res) =>{
    const id = req.body.id
    console.log(id)
    Record.deleteOne({_id: id},(err, data)=>{
        if(err) throw err
        res.redirect('/viewpatients')
    }).catch((err)=>{console.log(err)})

})

app.post('/updatereport',(req,res)=>{
    Record.updateOne({_id: req.body.recordid},{ disease: req.body.disease },(err, data)=>{
        if(err) throw err
        res.redirect('/viewpatients')
    }).catch((err)=>{console.log(err)})
})

app.listen(5000)