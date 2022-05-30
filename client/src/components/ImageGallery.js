import React from 'react'
import { Header } from 'semantic-ui-react'
import ImageForm from './ImageForm'

const ImageGallery = () => {

    return (
        <div className='gallery'>
            <Header as='h2' textAlign='center' block>
                Image Gallery
            </Header>
            <div className='gallery-container'>
                <ImageForm />
            </div>
        </div>
    )
}

export default ImageGallery