import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import ImageForm from './ImageForm'

const ImageGallery = () => {

    const src = 'https://react.semantic-ui.com/images/wireframe/image.png'

    return (
        <div className='gallery'>
            <Header as='h2' textAlign='center' block>
                Image Gallery
            </Header>
            <div className='gallery-container'>
                <ImageForm />
                <div className='image-group'>
                    <div className='image-container'>
                        <Image src={src} size='small' />
                        <p className='image-title'>Title</p>
                    </div>
                    <div className='image-container'>
                        <Image src={src} size='small' />
                        <p className='image-title'>Title</p>
                    </div>
                    <div className='image-container'>
                        <Image src={src} size='small' />
                        <p className='image-title'>Title</p>
                    </div>
                    <div className='image-container'>
                        <Image src={src} size='small' />
                        <p className='image-title'>Title</p>
                    </div>
                    <div className='image-container'>
                        <Image src={src} size='small' />
                        <p className='image-title'>Title</p>
                    </div>
                    <div className='image-container'>
                        <Image src={src} size='small' />
                        <p className='image-title'>Title</p>
                    </div>
                    <div className='image-container'>
                        <Image src={src} size='small' />
                        <p className='image-title'>Title</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ImageGallery