import Cookies from 'js-cookie';
import React from 'react'

import { useNavigate } from 'react-router-dom';
import { useCareTaker } from '../hooks/find-caretaker';

function ProfilePage() {
    const navigate = useNavigate()
    const profile = JSON.parse(Cookies.get('profile'));
    const performLogout = () => {
        Cookies.remove('profile');
        Cookies.remove('token');
        navigate('/login', { replace: true })
    }

    const { data } = useCareTaker();
    return (
        <div className='px-6 py-4 flex justify-center h-[55vh]'>
            <div className="">

                <Card profile={profile} role={profile.role} />
                <div className="mt-4"></div>
                {profile.role === "user" && <Card profile={data} role={"Your Caretaker"} />}
                <div className="flex flex-col gap-2 mt-4 justify-between h-full">

                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl" onClick={performLogout}>Logout
                    </button>
                    {profile.role === "user" && <CallButton phoneNumber={data?.mobile} />}
                </div>
            </div>
        </div >
    )
}


const Card = ({ profile, role }) => {
    return (
        <>
            <div className="flex gap-4 items-center p-3 bg-slate-200 rounded-lg px-5">
                <div className="w-16 h-16 ">
                    <img src={profile?.picture} alt="" className='rounded-full' />
                </div>
                <div className="">
                    <h1 className='text-2xl font-semibold'>{profile?.name}</h1>
                    <h2>{profile?.email}</h2>
                </div>
            </div>
            <div className={`text-center ${profile?.role === "caretaker" ? "bg-black" : "bg-blue-600"} py-1 rounded-b-lg text-white`}>{role}</div>
        </>)
}

const CallButton = ({ phoneNumber }) => {
    const handleCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <button
            onClick={handleCall}
            className="bg-teal-600 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
        >
            Call Now
        </button>
    );
};




export { ProfilePage }
