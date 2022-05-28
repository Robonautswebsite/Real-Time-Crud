import React, { useEffect, useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import '../App.css';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")

const FormComp = () => {

    const [empId, setEmpId] = useState("");
    const [empName, setEmpName] = useState("");
    const [empPos, setEmpPos] = useState("");

    const saveNote = () => {
        socket.emit('newRecord', {
            empId,
            empName,
            empPos
        })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        console.log(empId)
        console.log(empName)
        console.log(empPos)

        saveNote()

        setEmpId("")
        setEmpName("")
        setEmpPos("")
    }

    return (
        <div className='form-container'>
            <p className='form-head'>Enter Record</p>
            <Form onSubmit={formSubmit}>
                <Form.Group>
                    <Form.Input value={empId} onChange={(e) => { setEmpId(e.target.value) }} label='Employee ID' placeholder='Employee ID' width={6} />
                </Form.Group>
                <Form.Group>
                    <Form.Input value={empName} onChange={(e) => { setEmpName(e.target.value) }} label='Name' placeholder='Employee Name' width={16} />
                </Form.Group>
                <Form.Group>
                    <Form.Input value={empPos} onChange={(e) => { setEmpPos(e.target.value) }} label='Position' placeholder='Position' width={6} />
                </Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>
            </Form>
        </div>
    )
}

export default FormComp