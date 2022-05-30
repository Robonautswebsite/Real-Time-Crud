import React, { useRef, useEffect } from 'react'
import { Form, Button } from 'semantic-ui-react'
import '../App.css';
import io from 'socket.io-client'
import SocketIOFileClient from 'socket.io-file-client';
const socket = io.connect("http://localhost:5000")


const ImageForm = () => {

    const inputImg = useRef()

    var uploader = new SocketIOFileClient(socket);


    useEffect(() => {
        socket.on('showAlert', (data) => {
            alert(data)
        })
        // eslint-disable-next-line
    }, [socket])

    uploader.on('complete', function (fileInfo) {
        console.log('Upload Complete', fileInfo);
    })

    const formSubmit = (e) => {
        e.preventDefault()
        var uploadIds = uploader.upload(inputImg.current);
        console.log(uploadIds)
    }

    return (
        <div className='form-container'>
            <p className='form-head'>Upload Image</p>
            <Form onSubmit={formSubmit}>
                <Form.Group>
                    <Form.Field>
                        <Button as="label" htmlFor="file" type="button">
                            Select Images to Upload
                        </Button>
                        <input ref={inputImg} type="file" id="file" multiple hidden />
                    </Form.Field>
                </Form.Group>
                <Form.Field control={Button}>Submit</Form.Field>
            </Form>
        </div>
    )
}

export default ImageForm