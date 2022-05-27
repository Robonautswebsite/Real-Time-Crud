import React from 'react'
import { Form, Select, Button } from 'semantic-ui-react'
import '../App.css';

const FormComp = () => {
    const options = [
        { key: 'm', text: 'Male', value: 'male' },
        { key: 'f', text: 'Female', value: 'female' },
        { key: 'o', text: 'Other', value: 'other' },
    ]

    return (
        <div className='form-container'>
            <p className='form-head'>Enter Record</p>
            <Form>
                <Form.Group>
                    <Form.Input label='Employee ID' placeholder='Employee ID' width={6} />
                </Form.Group>
                <Form.Group>
                    <Form.Input label='First name' placeholder='First Name' width={8} />
                    <Form.Input label='Last Name' placeholder='Last Name' width={8} />
                </Form.Group>
                <Form.Group>
                    <Form.Field
                        control={Select}
                        label='Gender'
                        options={options}
                        placeholder='Gender'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Input label='Position' placeholder='Position' width={6} />
                </Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>
            </Form>
        </div>
    )
}

export default FormComp