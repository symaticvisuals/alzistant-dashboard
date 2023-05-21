import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { MdOutlineAccessAlarms } from 'react-icons/md'
import { RiGalleryLine } from 'react-icons/ri'
import { FiCamera } from 'react-icons/fi'
import { BsChatRightDots } from 'react-icons/bs'
import { IoMdLogOut } from "react-icons/io";
import Cookies from 'js-cookie'
import { CgProfile } from 'react-icons/cg'

function BottomNavigation() {

    const checkIsActive = ({ isActive }) => isActive ? ' ' : 'text-gray-500'

    const tabs = [
        {
            name: 'Pills',
            icon: <MdOutlineAccessAlarms className='text-2xl' />,
            route: '/'
        },
        {
            name: 'Camera', icon: <FiCamera className='text-2xl' />,
            route: '/camera'

        }, {
            name: 'Chat',
            icon: <BsChatRightDots className='text-2xl' />,
            route: '/chat'
        }, {
            name: 'Profile',
            icon: <CgProfile className='text-2xl' />,
            route: '/profile'

        }
    ]

    const navigate = useNavigate()
    return (
        <div className=' bottom-0 fixed py-3 px-2 w-screen bg-white'>
            <hr className='mb-2' />
            <div className="flex justify-around w-full items-center">
                {
                    tabs.map((tab, index) => (
                        <NavLink to={tab.route} key={index} className={checkIsActive} >
                            {(
                                { isActive }
                            ) => (<Icon icon={tab.icon} isActive={isActive} name={tab.name} />)}
                        </NavLink>
                    ))

                }

            </div>
        </div>
    )
}

export { BottomNavigation }


const Icon = ({ icon, isActive, name }) => {
    return (
        <>
            <div className={isActive ? "flex justify-center items-center p-4 rounded-full bg-black text-white" : "flex justify-center items-center p-4"}>

                <div className=''>
                    {icon}
                </div>
            </div>
            <p className='text-sm text-center'>{name}</p>
        </>
    )
}