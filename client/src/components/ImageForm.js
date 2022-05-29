import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import '../App.css';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:5000")

const ImageForm = () => {

    const [imgTitle, setImgTitle] = useState("");

    const formSubmit = (e) => {
        e.preventDefault()

        setImgTitle("")
    }

    return (
        <div className='form-container'>
            <p className='form-head'>Upload Image</p>
            <Form onSubmit={formSubmit}>
                <Form.Group>
                    <Form.Input value={imgTitle} onChange={(e) => { setImgTitle(e.target.value) }} label='Title' placeholder='Image Title' width={16} />
                </Form.Group>
                <Form.Group>
                    <Form.Field>
                        <Button as="label" htmlFor="file" type="button">
                            Select Images to Upload
                        </Button>
                        <input type="file" id="file" multiple hidden />
                    </Form.Field>
                </Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>
            </Form>
        </div>
    )
}

export default ImageForm