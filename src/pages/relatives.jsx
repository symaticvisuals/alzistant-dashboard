import React, { useRef, useState } from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import { useRelatives } from '../hooks/get-relatives';
import { request } from '../helpers/axios-instance';
import emptyRelative from '../assets/empty-relatives.png'
import AdminRenderer from '../components/user-conditional-renderer';

function CameraPage() {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [useVerify, setUseVerify] = useState(false);
    const { data: relatives } = useRelatives();


    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    };

    const handleSelectImage = () => {
        fileInputRef.current.click();
    };

    const handleClicked = () => {
        fileInputRef.current.click();
        setUseVerify(true);
    }

    return (
        <div className="px-6 py-2 pb-14">
            {image ? (
                <AddRelativeForm image={image} showVerify={useVerify} />
            ) : (
                <>
                    <h1 className="text-3xl font-semibold text-black">Relatives</h1>
                    {relatives?.length === 0 && (
                        <div className="h-full mt-[10vh] flex flex-col gap-4">
                            <img src={emptyRelative} alt="" className=' object-contain' srcset="" />
                            <AdminRenderer trueComponent={<h2 className='text-2xl text-center'>You haven't added Relatived Yet🥺</h2>} falseComponent={<h2 className='text-2xl text-center'>Don't worry you are loved by many🥺</h2>} />
                        </div>
                    )}
                    <div className="mt-6 flex flex-col gap-3">
                        {relatives?.map((item, i) => (
                            <RelativeCard key={i} name={item.name} relation={item.relationship} image={item.photoUrl} />
                        ))}
                    </div>
                    <AdminRenderer trueComponent={<button
                        onClick={handleSelectImage}
                        className="bg-gray-800 rounded-xl px-5 py-4 w-full justify-center text-white flex gap-2 mt-3"
                    >
                        Add Relative
                    </button>} falseComponent={<></>} />


                    <button
                        onClick={handleClicked}
                        className="bg-gray-800 rounded-xl px-5 py-4 w-full justify-center text-white flex gap-2 mt-3"
                    >
                        Click Photo
                    </button>

                </>
            )}
            <input
                id="fileInput"
                type="file"
                style={{ display: 'none' }}
                accept=".png,.jpeg,.jpg"
                capture="camera"
                onChange={handleImageChange}
                ref={fileInputRef}
            />
        </div>
    );
}

const AddRelativeForm = ({ image, showVerify }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [relationship, setRelationship] = useState('');

    const [verifiedDetails, setVerifiedDetails] = useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleRelationshipChange = (event) => {
        setRelationship(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('photo', image);
        formData.append('name', name);
        formData.append('relationship', relationship);

        let response = await request({
            method: 'POST',
            url: '/api/relative',
            data: formData,
        })
        if (response.data.success) {
            window.location.reload()
        }
        else {
            alert('Failed to add relative')
        }

    };

    const handleVerify = async (event) => {
        event.preventDefault();

        setLoading(true);

        const formData = new FormData();
        const fileExtension = image.name.split('.').pop(); // Extract the file extension
        formData.append('photo', image, `name.${fileExtension}`); // Set the dynamic name with the extracted extension

        let response = await request({
            method: 'POST',
            url: '/api/upload/verify',
            data: formData,
        });

        if (response.data.success) {
            setVerifiedDetails(response.data.data);
        } else {
            alert('Failed to verify relative');
        }

        setLoading(false);
    };


    return (
        <div className="">
            <form onSubmit={!showVerify ? handleSubmit : handleVerify}>
                <div className="flex justify-center mt-4">
                    {image && (
                        <img src={verifiedDetails?.photoUrl ? verifiedDetails.photoUrl : URL.createObjectURL(image)} alt="" className="rounded-full h-[350px] w-[350px] object-cover" />
                    )}
                </div>
                {!showVerify && (<div className="mt-6">
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1"
                        placeholder="Patient's Name"
                    />
                    <input
                        type="text"
                        value={relationship}
                        onChange={handleRelationshipChange}
                        className="border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-3"
                        placeholder="Patient's Relationship"
                    />
                    <button className="bg-gray-800 rounded-xl px-5 py-4 w-full justify-center text-white mt-4">
                        Add to Patient's List
                    </button>
                </div>)}
                {
                    verifiedDetails && showVerify && (
                        <div className="mt-6">
                            <h2 className='text-center text-2xl font-bold'>{verifiedDetails.name}</h2>
                            <h2 className='text-center text-2xl'>{verifiedDetails.relationship}</h2>
                        </div>
                    )
                }
                {showVerify && (

                    <button disabled={verifiedDetails?.name && true} className={`${verifiedDetails?.name ? 'bg-teal-500' : 'bg-gray-800'} rounded-xl px-5 py-4 w-full justify-center text-white mt-4`}>
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                            </div>

                        ) : verifiedDetails?.name ? "Verified" : "Verify"}
                    </button>
                )}
            </form>
        </div>
    );
};






const RelativeCard = ({ name, relation, image }) => {
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-slate-100 rounded-2xl">
            <div className="flex items-center gap-4">
                <img src={image} alt="" className='w-12 h-12 rounded-full object-cover' />
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
