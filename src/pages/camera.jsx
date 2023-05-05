import React, { useRef } from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';

function CameraPage() {

    const [imageData, setImageData] = React.useState(null);

    const handleImageSelect = (imageFile) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageData(reader.result);
        };
        reader.readAsDataURL(imageFile);
    };

    const onAddRelative = () => {
        setImageData(null);
    };

    return (
        <div className='px-6 py-2  pb-14'>
            {
                imageData ? (<AddRelativeForm image={imageData} onAddRelative={onAddRelative} />) : (<> <h1 className='text-3xl font-semibold text-black'>
                    Relatives
                </h1>
                    <div className="mt-6 flex flex-col gap-3">
                        {
                            Array(5).fill().map((_, i) => (
                                <RelativeCard name='Selena' relation='Mother' />
                            ))
                        }
                    </div>
                    <ImageInputButton onClick={handleImageSelect} /></>)
            }
        </div>
    )
}



const AddRelativeForm = ({ image, onAddRelative }) => {

    return (
        <div className="">
            <div className="flex justify-center mt-4">
                <img src={image} alt="" className='rounded-full h-[350px] w-[350px] object-cover' />
            </div>

            <div className="mt-6">
                <input type="text" className='border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1'
                    placeholder="Patient's Name" />
                <input type="text" className='border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-3' placeholder="Patient's Relationship" />
                <button
                    className='bg-gray-800 rounded-xl px-5 py-4 w-full  justify-center text-white mt-4'
                    onClick={onAddRelative}
                >Add to Patient's List</button>

            </div>
        </div>
    )
}


const ImageInputButton = ({ onClick }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file && isFileValid(file)) {
            onClick(file);
        }
    };

    const isFileValid = (file) => {
        // Check that the file is a PNG or JPEG image
        const fileType = file.type;
        if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
            alert('Please select a PNG or JPEG image file.');
            return false;
        }

        // Check that the file was selected from the camera
        const source = event.target.getAttribute('capture');
        if (source !== 'camera') {
            alert('Please select an image captured from the camera.');
            return false;
        }

        return true;
    };

    return (
        <>
            <button onClick={handleClick} className='bg-gray-800 rounded-xl px-5 py-4 w-full  justify-center text-white flex  gap-2 mt-3'>Select Image</button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".png,.jpeg,.jpg"
                capture="camera"
                onChange={handleFileInputChange}
            />
        </>
    );
};


const RelativeCard = ({ name, relation, image }) => {
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-slate-100 rounded-2xl">
            <div className="flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" className='w-12 h-12 rounded-full object-cover' />
                <div className="">
                    <h2 className="text-black font-semibold text-xl">{name}</h2>
                    <p className="text-black">{relation}</p>
                </div>
            </div>
            <IoCloseCircleSharp className='text-3xl cursor-pointer  ' />

        </div>
    )
}

export { CameraPage }
