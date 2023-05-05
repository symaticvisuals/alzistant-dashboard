import React from 'react'
import { CgRemoveR } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'


function AddReminderPage() {
    const [timings, setTimings] = React.useState([''])
    const history = useNavigate()
    const onChangeTiming = (e) => {
        timings[index] = e.target.value
        setTimings([...timings])
    }
    const onAddTiming = () => {
        setTimings([...timings, ''])
    }
    const onAddReminder = () => {
        history('/')
    }

    return (
        <div className='px-6 py-2 bg-[#FAFAFA] mb-14'>
            <div className="py-2"></div>
            <h1 className='text-3xl font-semibold text-black'>
                Add Reminder
            </h1>
            <div className="mt-5 flex flex-col gap-4">
                <div className="">
                    <h2 className='text-md font-normal text-black'>Medicine Name</h2>
                    <input type="text" className='border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1'
                        placeholder='Paracetamol 121' />
                </div>
                <div className="">
                    <h2 className='text-md font-normal text-black'>Dose</h2>
                    <select name="" id="" className='
                    border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1'>
                        <option value="0.5">1/2 Pill</option>
                        <option value="1">1 Pill</option>
                        <option value="0.33">1/3 Pill</option>
                        <option value="2">2 Pill</option>
                    </select>
                </div>
                <div className="">
                    <h2 className='text-md font-normal text-black'>Duration</h2>
                    <select name="" id="" className='
                    border-2 border-gray-800 rounded-2xl px-4 py-3 w-full focus:outline-none mt-1'>
                        <option value="Daily">Daily</option>
                        <option value="Alternative">Alternative</option>
                        <option value="One-Day">One-Day</option>
                    </select>
                </div>

                <div className="">
                    <h2 className='text-md font-normal text-black'>Timings</h2>
                    <div className="flex flex-col gap-2 mt-2">
                        {
                            timings.map((timing, index) => (
                                <div className='flex gap-2 items-center' key={index}>
                                    <input type="time"
                                        onChange={onChangeTiming}
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
