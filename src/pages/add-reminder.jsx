import moment from 'moment'
import React from 'react'
import { CgRemoveR } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { request } from '../helpers/axios-instance'


function AddReminderPage() {
    const [timings, setTimings] = React.useState([''])
    const [reminder, setReminder] = React.useState({})
    const [payload, setPayload] = React.useState({})
    const history = useNavigate()
    const onChangeTiming = (e, index) => {
        const updatedTimings = [...timings];
        updatedTimings[index] = { time: e.target.value };
        setTimings(updatedTimings);
    };

    const onAddTiming = () => {
        setTimings([...timings, { time: '' }]);
    };

    const onAddReminder = async () => {
        setPayload({ ...reminder, timings })
        let response = await request({
            method: 'POST',
            url: '/api/reminder',
            data: { ...reminder, timings }
        })

        if (response.data.success) {
            history('/')
        }
    }




    const handleChange = (e) => {
        setReminder({ ...reminder, [e.target.name]: e.target.value })
    }

    return (
        <div className='px-6 py-2 bg-[#FAFAFA] mb-32'>
            <div className="py-2"></div>
            <h1 className='text-3xl font-semibold text-black'>
                Add Reminder
            </h1>
            <div className="mt-5 flex flex-col gap-4">
                <div className="">
                    <h2 className='text-md font-normal text-black'>Medicine Name</h2>
                    <input type="text" name="medicineName" className='border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1'
                        placeholder='Paracetamol 121' onChange={handleChange} />
                </div>
                <div className="">
                    <h2 className='text-md font-normal text-black'>Dose</h2>
                    <select name="quantity" id="" className='
                    border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1' onChange={
                            (e) => {
                                setReminder({ ...reminder, quantity: e.target.value })
                            }
                        }>
                        <option value="" disabled selected>Select Quantity</option>
                        <option value="0.5">1/2 Pill</option>
                        <option value="1">1 Pill</option>
                        <option value="0.33">1/3 Pill</option>
                        <option value="2">2 Pill</option>
                    </select>
                </div>
                <div className="">
                    <h2 className='text-md font-normal text-black'>Frequency</h2>
                    <select name="frequency" id="" className='
                    border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1' onChange={handleChange}>
                        <option value="" disabled selected>Select Frequency</option>
                        <option value="daily">Daily</option>
                        <option value="alternate">Alternative</option>
                        <option value="one-day">One-Day</option>
                    </select>
                </div>
                <div className="">
                    <h2 className='text-md font-normal text-black'>Start Date</h2>
                    <input type="date"
                        name="startDate"
                        onChange={(e) => {
                            setReminder({ ...reminder, startDate: moment(e.target.value).format('YYYY-MM-DD') })
                        }}
                        className='border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1'
                    />
                </div>
                <div className="">
                    <h2 className='text-md font-normal text-black'>End Date</h2>
                    <input type="date"
                        name="endDate"
                        onChange={(e) => {
                            setReminder({ ...reminder, endDate: moment(e.target.value).format('YYYY-MM-DD') })
                        }}
                        className='border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1'
                    />
                </div>

                <div className="">
                    <h2 className='text-md font-normal text-black'>Timings</h2>
                    <div className="flex flex-col gap-2 mt-1">
                        {
                            timings.map((timing, index) => (
                                <div className='flex gap-2 items-center' key={index}>
                                    <input type="time"
                                        onChange={
                                            (e) => {
                                                onChangeTiming(e, index)
                                            }
                                        }
                                        className='border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1'
                                        placeholder='Paracetamol 121' />
                                    <button
                                        onClick={() => {
                                            timings.splice(index, 1)
                                            setTimings([...timings])
                                        }}
                                        className=' rounded-xl px-2 py-1 text-red-500 flex justify-between items-center gap-2 text-xl'><CgRemoveR /></button>

                                </div>
                            ))
                        }
                    </div>

                </div>

            </div>
            <button
                onClick={onAddTiming}
                className='bg-white rounded-full px-5 py-2 text-slate-900 border-black border-2 flex  gap-2 mt-3'> + Add New Time</button>
            <button
                onClick={onAddReminder}
                className='bg-gray-800 rounded-xl px-5 py-4 w-full  justify-center text-white flex  gap-2 mt-3'> + Add Reminder</button>
        </div>
    )
}

export { AddReminderPage }
