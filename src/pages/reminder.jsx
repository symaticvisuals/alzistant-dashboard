import React, { useEffect } from 'react'
import { MdOutlineDone } from 'react-icons/md'
import { Link, NavLink, Outlet, useOutletContext } from 'react-router-dom'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { IoMdAdd } from 'react-icons/io'
import { useReminders } from '../hooks/get-reminders'
import moment from 'moment'

function ReminderPage() {

    const { data } = useReminders();
    const [now, setNow] = React.useState(null)

    useEffect(() => {
        if (data) {
            const convertData = data?.nowReminders?.map((item) => {

                return {
                    ...item,
                    time: moment(item?.time.time, "HH:mm").format('hh:mm A')
                }
            })
            setNow(convertData)
        }
    }, [data])




    return (
        <div className='px-6 py-2 bg-[#FAFAFA] mb-14'>
            <div className="py-2"></div>
            <h1 className='text-3xl font-semibold text-black'>
                Pill Reminder
            </h1>
            {now && now.length === 0 && "No Medicines for now"}
            {now &&
                now.length > 0 && now.map((item, index) => (
                    <div className="p-6 py-10 bg-[#EEC269] flex flex-col  mt-3 rounded-2xl">
                        <div className="flex justify-between">
                            <div className="">
                                <h2 className="text-black font-semibold text-2xl">Now</h2>
                                <p className="text-black">{item.time
                                }, Today</p>
                            </div>
                            <button className=' text-white mt-2 px-8 py-2 rounded-xl  bg-black'>
                                <MdOutlineDone className='' />
                            </button>

                        </div>
                        <div className="flex justify-start items-center gap-4 mt-4 text-black">
                            <h2 className="text-black font-semibold text-xl">{item?.medicineName}</h2>
                            <div className="flex items-center justify-center px-4 py-1 bg-[#65C9E3] rounded-full">
                                <p className='text-md'>{item?.quantity} Pill</p>
                            </div>
                        </div>
                    </div>))

            }

            <div className="flex justify-between items-center mt-3">
                <h2 className='mt-4 mb-2 text-2xl font-semibold text-black'>Upcoming</h2>
                <Link to="add-reminder" className='bg-gray-800 rounded-xl px-5 py-2 text-white flex justify-between items-center gap-2'>
                    <button className='flex items-center'>Add Reminder <IoMdAdd className='text-white text-xl' /></button>
                </Link>
            </div>
            <div className=" flex gap-2 mt-3">
                <NavLink to="/" className={({ isActive }) => isActive ? 'text-white p-1 rounded-full bg-black px-2 cursor-pointer' : 'text-black p-1 rounded-full px-2 cursor-pointer'} >
                    <h3 className='' >Today</h3>
                </NavLink>
                <NavLink to="/tomorrow" className={({ isActive }) => isActive ? 'text-white p-1 rounded-full bg-black px-2 cursor-pointer' : 'text-black p-1 rounded-full px-2 cursor-pointer'} >
                    <h3 className='' >Tomorrow</h3>
                </NavLink>
                <NavLink to="/late-reminder" className={({ isActive }) => isActive ? 'text-white p-1 rounded-full bg-black px-2 cursor-pointer' : 'text-black p-1 rounded-full px-2 cursor-pointer'} >
                    <h3 className='' >Late Reminder</h3>
                </NavLink>

            </div>
            <Outlet context={[data]} />

        </div>
    )
}

const UpcomingReminder = ({ time, name }) => {
    return (
        <div className="flex justify-between items-center px-4 py-4 bg-slate-100">
            <div className="">
                <div className="flex gap-3">
                    {time.map((item, index) => (
                        <h2 className="text-white font-semibold text-md bg-black px-2 py-1 rounded-lg">{moment(item, "HH:mm").format('hh:mm A')}</h2>)
                    )}

                </div>
                <h1 className="text-black text-xl mt-2">{name}</h1>
            </div>
            <IoCloseCircleSharp className='text-3xl cursor-pointer  ' />

        </div>
    )
}


const Tomorrow = () => {
    const [data] = useOutletContext()
    const [reminders, setReminders] = React.useState([])

    React.useEffect(() => {
        if (data) {
            setReminders(data?.tomorrowReminders)
        }
    }, [data])

    return (
        <div className="mt-4 flex flex-col gap-3 mb-8">
            {
                data && reminders?.map((item, index) => (
                    <UpcomingReminder key={index} time={item?.timings} name={item?.medicineName} />
                ))}
        </div>
    )
}

const Today = () => {
    const [data] = useOutletContext()
    const [reminders, setReminders] = React.useState([])


    React.useEffect(() => {
        if (data) {

            setReminders(data?.todayReminders)
        }
    }, [data])

    return (
        <div className="mt-4 flex flex-col gap-3 mb-8">
            {
                data && reminders?.map((item, index) => (
                    <UpcomingReminder key={index} time={item?.timings} name={item?.medicineName} />
                ))}
        </div>
    )
}


const LateReminder = () => {
    const [data] = useOutletContext()
    const [reminders, setReminders] = React.useState([])


    React.useEffect(() => {
        if (data) {

            setReminders(data?.lateReminders)
        }
    }, [data])

    return (
        <div className="mt-4 flex flex-col gap-3 mb-8">
            {
                data && reminders?.map((item, index) => (
                    <UpcomingReminder key={index} time={item?.lateTime} name={item?.medicineName} />
                ))}
        </div>
    )
}


export { ReminderPage, Tomorrow, Today, LateReminder }
