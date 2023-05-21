import React, { useEffect } from 'react'
import { MdOutlineDone } from 'react-icons/md'
import { Link, NavLink, Outlet, useOutletContext } from 'react-router-dom'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { IoMdAdd } from 'react-icons/io'
import { useReminders } from '../hooks/get-reminders'
import moment from 'moment'
import { request } from '../helpers/axios-instance'
import addNotification from 'react-push-notification';
import Cookies from 'js-cookie'
import AdminRenderer from '../components/user-conditional-renderer'

function ReminderPage() {

    const { data } = useReminders();
    const [now, setNow] = React.useState(null)

    useEffect(() => {
        if (data) {
            const convertData = data?.nowReminders?.map((item) => {
                return {
                    ...item,
                    time: moment(item?.time.time, "HH:mm").format('hh:mm A'),
                    timings_id: item?.time._id,
                    reminder_id: item?._id
                }
            })
            setNow(convertData)
        }
    }, [data])

    useEffect(() => {
        if (data) {
            if (!Cookies.get('nowRemindersLength')) {
                Cookies.set('nowRemindersLength', data?.nowReminders?.length)
            }
            const prevLength = Cookies.get('nowRemindersLength')
            if (prevLength === null) {
                Cookies.set('nowRemindersLength', currentLength.toString());
            }
            const currentLength = data?.nowReminders?.length;

            if (currentLength > prevLength) {
                addNotification({
                    title: `${data?.nowReminders[0]?.medicineName}`,
                    subtitle: `${data?.nowReminders[0].time}`,
                    message: 'Time to take your medicine.',
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                });
                Cookies.set('nowRemindersLength', currentLength.toString());
            }
            if (currentLength < prevLength) {
                Cookies.set('nowRemindersLength', data?.nowReminders?.length)
            }
        }

        // If nowRemindersLength is not present in localStorage, set it to the current length.

    }, [data, data?.nowReminders]);




    const markReminderAsDone = async (item) => {
        let response = await request({
            method: 'POST',
            url: '/api/reminder/done',
            data: { reminderId: item._id, timingId: item.timings_id }
        })
        if (response.data.success) {
            setNow(now.filter((i) => i._id !== item._id))
        }

    }



    return (
        <div className='px-6 py-2 bg-[#FAFAFA] mb-14'>
            <div className="py-2"></div>
            <h1 className='text-3xl font-semibold text-black'>
                Pill Reminder
            </h1>
            {now && now.length === 0 && "No Medicines for now"}
            {now &&
                now.length > 0 && now.map((item, index) => (
                    < div className="p-6 py-10 bg-[#EEC269] flex flex-col  mt-3 rounded-2xl" >

                        <div className="flex justify-between">
                            <div className="">
                                <h2 className="text-black font-semibold text-2xl">Now</h2>
                                <p className="text-black">{item.time
                                }, Today</p>
                            </div>
                            <button className=' text-white mt-2 px-8 py-2 rounded-xl  bg-black' onClick={
                                async () => {
                                    await markReminderAsDone(item)
                                }
                            }>
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
                <AdminRenderer trueComponent={<Link to="add-reminder" className='bg-gray-800 rounded-xl px-5 py-2 text-white flex justify-between items-center gap-2'>
                    <button className='flex items-center'>Add Reminder <IoMdAdd className='text-white text-xl' /></button>
                </Link>} falseComponent={null} />

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

        </div >
    )
}

const UpcomingReminder = ({ time, name, type = "" }) => {
    return (
        <div className="flex justify-between items-center px-4 py-4 bg-slate-100">
            <div className="">
                <p>Medicine Name</p>
                <h1 className="text-black text-xl mb-2 font-bold">{name}</h1>
                <div className="flex gap-3">

                    {time.map((item, index) => (
                        <div key={index} className='flex  gap-4 items-center'>
                            <h2 className="text-white font-semibold text-md bg-black px-2 py-1 rounded-lg">{moment(item.time, "HH:mm").format('hh:mm A')}</h2>

                        </div>
                    )
                    )}

                </div>
            </div>

            <AdminRenderer trueComponent={<IoCloseCircleSharp className='text-3xl cursor-pointer  ' />} falseComponent={null} />


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
                data && reminders.length === 0 && "No Medicines for tomorrow"
            }
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
                data && reminders.length === 0 && "No Medicines for today"
            }
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
                data && reminders.length === 0 && "No Late Medicines"
            }
            {

                data && reminders?.map((item, index) => (
                    <UpcomingReminder key={index} time={item?.lateTime} name={item?.medicineName} type={"late"} />
                ))}
        </div>
    )
}


export { ReminderPage, Tomorrow, Today, LateReminder }
