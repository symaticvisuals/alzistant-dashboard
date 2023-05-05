import React from 'react'
import { MdAdd } from 'react-icons/md'

function GalleryPage() {
    const [images, setImages] = React.useState([
        'https://images.unsplash.com/photo-1683219722289-e9312a008157?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://plus.unsplash.com/premium_photo-1672907031630-dae2e4b8d510?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1683009680116-b5c04463551d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://plus.unsplash.com/premium_photo-1676321046449-5fc72b124490?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://plus.unsplash.com/premium_photo-1676321046449-5fc72b124490?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    ]);
    return (
        <div className="max-w-screen">
            <div className="fixed bottom-16 z-10 flex justify-center w-full">
                <button
                    className='bg-gray-900 rounded-full px-4 py-4 text-2xl   justify-center text-white mt-4 '
                ><MdAdd /></button>
            </div>
            <div className='grid grid-flow-row-dense grid-cols-2 auto-rows-max gap-2'>
                {
                    images.map((image, index) => (
                        <img src={image} className='object-cover h-full' alt="" key={index} />
                    ))
                }
            </div>
        </div>
    )
}



export { GalleryPage }
