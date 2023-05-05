import React from 'react'
import { MdOutlineDone } from 'react-icons/md'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { IoMdAdd } from 'react-icons/io'

function ReminderPage() {
    const [currentPill, setCurrentPill] = React.useState(null)
    const [selectedTab, setSelectedTab] = React.useState(0)
    return (
        <div className='px-6 py-2 bg-[#FAFAFA] mb-14'>
            <div className="py-2"></div>
            <h1 className='text-3xl font-semibold text-black'>
                Pill Reminder
            </h1>
            <div className="p-6 py-10 bg-[#EEC269] flex flex-col  mt-3 rounded-2xl">
                <div className="flex justify-between">
                    <div className="">
                        <h2 className="text-black font-semibold text-xl">Now</h2>
                        <p className="text-black">11:00 AM, Today</p>
                    </div>
                    <button className=' text-white mt-2 px-8 py-2 rounded-xl  bg-black'>
                        <MdOutlineDone className='' />
                    </button>

                </div>
                <div className="flex justify-start items-center gap-4 mt-4 text-black">
                    <h2 className="text-black font-semibold text-lg">Paracetamol 650</h2>
                    <div className="flex items-center justify-center px-4 py-1 bg-[#65C9E3] rounded-full">
                        <p className='text-xs'>1/2 Pill</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <h2 className='mt-4 mb-2 text-2xl font-semibold text-black'>Upcoming</h2>
                <Link to="add-reminder">
                    <button className='bg-gray-800 rounded-xl px-5 py-1 text-white flex justify-between items-center gap-2 t'>Add Reminder <IoMdAdd className='text-white text-xl' /></button>
                </Link>
            </div>
            <div className=" flex gap-2">
                <NavLink to="/" className={({ isActive }) => isActive ? 'text-white p-1 rounded-full bg-black px-2 cursor-pointer' : 'text-black p-1 rounded-full px-2 cursor-pointer'} >
                    <h3 className='' >Today</h3>
                </NavLink>
                <NavLink to="/tomorrow" className={({ isActive }) => isActive ? 'text-white p-1 rounded-full bg-black px-2 cursor-pointer' : 'text-black p-1 rounded-full px-2 cursor-pointer'} >
                    <h3 className='' >Tomorrow</h3>
                </NavLink>
            </div>
            <Outlet />

        </div>
    )
}

const UpcomingReminder = ({ time, name }) => {
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-slate-100">
            <div className="">
                <h2 className="text-black font-semibold text-xl">{time}</h2>
                <p className="text-black">{name}</p>
            </div>
            <IoCloseCircleSharp className='text-3xl cursor-pointer  ' />

        </div>
    )
}


const Tomorrow = () => {
    return (
        <div className="mt-4 flex flex-col gap-3 mb-8">
            {
                Array(10).fill().map((_, index) => (
                    <UpcomingReminder key={index} time={"6:00 PM"} name={"Dolo 650"} />
                ))}
        </div>
    )
}

const Today = () => {
    return (
        <div className="mt-4 flex flex-col gap-3 mb-8">
            {
                Array(10).fill().map((_, index) => (
                    <UpcomingReminder key={index} time={"4:00 PM"} name={"Glycogen A-B Plus"} />
                ))}
        </div>
    )
}



export { ReminderPage, Tomorrow, Today }
