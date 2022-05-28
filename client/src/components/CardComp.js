import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")

const CardComp = ({ recordId, name, id, pos }) => {

    const deleteRecord = () => {
        socket.emit('deleteRecord', {
            recordId
        })
        console.log("delete", recordId)
    }
    return (
        <div>
            <Card.Group>
                <Card fluid color='red'>
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{id}</Card.Meta>
                        <Card.Description>
                            <strong>{pos}</strong>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div>
                            <Button icon labelPosition='left' floated='left' color='orange'>
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
        </div>
    )
}

export default CardComp