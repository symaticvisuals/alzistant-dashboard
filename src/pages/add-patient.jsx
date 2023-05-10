import React, { useState } from 'react'
import addPatientGraphic from '../assets/add-patient-vector.png'
import { request } from '../helpers/axios-instance';
import { useNavigate } from 'react-router-dom';
function AddPatient() {
    const [patientDetails, setPatientDetails] = useState({
        email: '',
        phone: '',
    });
    const navigate = useNavigate();

    const handleContent = () => {
        return {
            heading: "Let's Add Your Loved Ones",
            subheading: "We will add them to your account and send them reminders on your behalf",
            image: addPatientGraphic,
        };
    };

    const handleInputChange = (e) => {
        setPatientDetails({
            ...patientDetails,
            [e.target.name]: e.target.value,
        });
    };

    const createPatient = async () => {
        const response = await request({
            method: 'POST',
            url: '/api/user/add-patient',
            data: patientDetails,
        })
        if (response.data.success) {
            navigate('/', { replace: true })
        }
        else {
            alert('Error Adding Patient')
        }
    }



    return (
        <div className='flex flex-col justify-center items-center h-screen px-8 gap-3'>
            <h1 className='text-center text-3xl font-sans font-semibold'>{handleContent().heading}</h1>
            <p className='text-center'>
                {handleContent().subheading}
            </p>
            <img src={addPatientGraphic} alt="" srcset="" />

            <input type="text" className='px-4 py-3 rounded-xl border shadow-md w-full focus:outline-none  max-w-[350px]' placeholder='Enter Patient Email' name="email" onChange={handleInputChange} />

            <input type="text" className='px-4 py-3 rounded-xl border shadow-md w-full focus:outline-none  max-w-[350px]' placeholder='Enter Patient Number' name="phone" onChange={handleInputChange} />

            <button className=' font-sans px-9 max-w-[350px] w-full text-center py-3 rounded-xl hover:shadow-md bg-[#FFD953]' onClick={createPatient}>Proceed </button>
        </div>
    )
}

export { AddPatient }
