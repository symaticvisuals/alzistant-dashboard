import React, { useContext, useEffect, useState } from 'react'
import { AccessTokenContext } from '../layout'
import ContactGraphic from '../assets/contact-vector.png'
import axios from 'axios';
import { getApiURL } from '../helpers/baseURL';
import verifyGraphic from '../assets/verify-otp-vector.png'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { request } from '../helpers/axios-instance';
function SignUp() {
  const { accessToken } = useContext(AccessTokenContext);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [showOtpPage, setShowOtpPage] = useState(false);
  const sendOtp = async () => {
    console.log(getApiURL());
    console.log("mobile", mobile);

    const response = await axios.post(`${getApiURL()}/api/auth/sendOtp`, {
      phoneNumber: mobile,
    });

    if (response.data.success) {

      setShowOtpPage(true);
    } else {
      alert('Error Sending OTP');
    }

  }

  useEffect(() => {
    if (!accessToken) {
      navigate('/login', { replace: true });
    }
  }, accessToken)

  const verifyOtp = async () => {

    const response = await
      axios.post(`${getApiURL()}/api/auth/verifyOtp`, {
        phoneNumber: mobile,
        otp: otp,
        accessToken: accessToken
      })

    if (response.data.success) {
      Cookies.set('token', response.data.data.token, { expires: 7 })
      Cookies.set('profile', JSON.stringify(response.data.data.profile), { expires: 7 })
      navigate('/add-patient', { replace: true });
    } else {
      alert('Error Verifying OTP');
    }
  }

  const showContent = () => {
    if (showOtpPage)
      return {
        heading: 'Verify Details',
        subHeading: 'We ensure your safety',
        image: verifyGraphic
      }
    return {
      heading: 'Contact Details',
      subHeading: 'We promise to not disturb you',
      image: ContactGraphic
    }
  }
  return (
    <div className='flex h-screen justify-center flex-col gap-4 px-8 items-center '>

      <div className="">
        <h1 className='text-3xl font-semibold font-sans leading-7 text-center'>{showContent().heading}</h1>
        <p className='text-xl tracking-[2px] font-sans text-center'>{showContent().subHeading}</p>
      </div>
      <img src={showContent().image} alt="" />
      {showOtpPage && <input type="number" placeholder='Enter OTP' className='px-4 py-3 rounded-xl border shadow-md w-full focus:outline-none  max-w-[350px] ' onChange={(e) => {
        setOtp(e.target.value)
      }} />}
      {!showOtpPage && <input type="text" placeholder='Mobile Number' className='px-4 py-3 rounded-xl border shadow-md w-full focus:outline-none  max-w-[350px] ' onChange={(e) => {
        setMobile(e.target.value)
      }} />}

      <button className="  font-sans px-9 max-w-[350px] w-full text-center py-3 rounded-xl hover:shadow-md bg-[#FFD953]" onClick={
        showOtpPage ? verifyOtp : sendOtp
      }>
        {showOtpPage ? 'Verify OTP' : 'Send OTP'}
      </button>
    </div>
  )
}

export { SignUp }


