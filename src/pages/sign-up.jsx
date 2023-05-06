import React, { useContext, useState } from 'react'
import { AccessTokenContext } from '../layout'
import ContactGraphic from '../assets/contact-vector.png'
import { BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import { getApiURL } from '../helpers/baseURL';

function SignUp() {
  const { accessToken } = useContext(AccessTokenContext);
  const [mobile, setMobile] = useState();
  const sendOtp = async () => {
    const response = await axios.post(`${getApiURL()}/api/auth/sendOtp`, {
      phoneNumber: mobile,
    });
    console.log(response);
  }
  return (
    <div className='flex h-screen justify-center flex-col gap-4 px-8 items-center '>
      <div className="">
        <h1 className='text-3xl font-semibold font-sans leading-7 text-center'>Contact Details</h1>
        <p className='text-xl tracking-[2px] font-sans text-center'>We promise to not disturb you</p>
      </div>
      <img src={ContactGraphic} alt="" />
      <input type="number" placeholder='Mobile Number' className='px-4 py-3 rounded-xl border shadow-md w-full focus:outline-none  max-w-[350px] ' onChange={(e) => {
        setMobile(e.target.value)
      }} />
      <button className="  font-sans px-9 max-w-[350px] w-full text-center py-3 rounded-xl hover:shadow-md bg-[#FFD953]" onClick={sendOtp}>
        Send OTP
      </button>
    </div>
  )
}

export { SignUp }
