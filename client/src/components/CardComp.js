import React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'

const CardComp = ({ name, id, pos }) => {
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
                            <Button icon labelPosition='left' floated='right' color='red'>
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