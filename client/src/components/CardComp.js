import React, { useState } from 'react'
import { Form, Card, Button, Icon } from 'semantic-ui-react'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")

const CardComp = ({ recordId, name, id, pos }) => {

    const [isEditable, setIsEditable] = useState(false);

    const [empId, setEmpId] = useState("");
    const [empName, setEmpName] = useState("");
    const [empPos, setEmpPos] = useState("");

    const toggleEditForm = () => {
        isEditable === false ?
            setIsEditable(true) :
            setIsEditable(false)
    }

    const deleteRecord = () => {
        socket.emit('deleteRecord', {
            recordId
        })
        console.log("delete", recordId)
    }

    const updateRecord = () => {

        socket.emit('updateRecord', {
            recordId,
            empId,
            empName,
            empPos
        })
        console.log("update", recordId)
    }

    const formSubmit = (e) => {
        e.preventDefault()
        updateRecord()

        setEmpId("")
        setEmpName("")
        setEmpPos("")
    }


    return (
        <div>
            <Card.Group>
                <Card fluid color='brown'>
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{id}</Card.Meta>
                        <Card.Description>
                            <strong>{pos}</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div>
                            <Button onClick={toggleEditForm} icon labelPosition='left' floated='left' color='blue'>
                                <Icon name='edit' />
                                Edit
                            </Button>
                            <Button onClick={deleteRecord} icon labelPosition='left' floated='right' color='red'>
                                <Icon name='delete' />
                                Delete
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Card.Group>
            {isEditable === true ?
                <div className='edit-form-container'>
                    <p className='edit-form-head'>Edit Record<Icon onClick={toggleEditForm} name='close' /></p>
                    <Form onSubmit={formSubmit} size='tiny'>
                        <Form.Group>
                            <Form.Input value={empName} onChange={(e) => { setEmpName(e.target.value) }} label='Name' placeholder='Employee Name' width={16} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input value={empId} onChange={(e) => { setEmpId(e.target.value) }} label='Employee ID' placeholder='Employee ID' width={6} />
                            <Form.Input value={empPos} onChange={(e) => { setEmpPos(e.target.value) }} label='Position' placeholder='Position' width={6} />
                        </Form.Group>
                        <Form.Field control={Button}>Submit</Form.Field>
                    </Form>
                </div>
                :
                <div></div>
            }
        </div>
    )
}

export default CardComp