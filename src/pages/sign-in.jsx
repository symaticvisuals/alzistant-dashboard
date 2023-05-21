import React, { useContext } from 'react'
import { useGoogleLogin } from "@react-oauth/google";
import { getApiURL } from '../helpers/baseURL';
import axios from 'axios';
import Cookies from 'js-cookie';
import LoginGraphic from '../assets/login-vector.png'
import { BsGoogle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


function SignIn() {
    const navigate = useNavigate()

    const authenticateUser = async (code) => {
        try {
            if (code.access_token) {
                const response = await axios.post(`${getApiURL()}/api/auth`, {
                    idToken: code.access_token,
                });
                if (response.data.data?.exists === false) {
                    console.log("User does not exist");
                    Cookies.set("accessToken", code.access_token);
                    navigate('sign-up', { replace: false })
                    return;
                }

                Cookies.set("token", response.data.data.token);
                Cookies.set("profile", JSON.stringify(response.data.data.profile));

                if (response.data.data.profile.role === 'caretaker') {

                    let checkPatientsCount = await axios.get(
                        `${getApiURL()}/api/user/find-patients-count`,
                        // set the authorization HTTP header
                        {
                            headers: {
                                Authorization: `Bearer ${response.data.data.token}`,
                            },
                        }
                    )


                    if (checkPatientsCount.data.success === false) {
                        navigate("/add-patient", { replace: true });
                        return;
                    }
                }

                navigate("/", { replace: true });

            }
        } catch (err) {
            console.log(err);
        }
    };

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => authenticateUser(codeResponse)
    });
    return (
        <div className='flex h-screen justify-center flex-col gap-4 px-8 items-center '>
            <div className="">
                <h1 className='text-3xl font-semibold font-sans leading-7 text-center'>Connecting You</h1>
                <p className='text-xl tracking-[4px] font-sans text-center'>with your loved ones</p>
            </div>
            <img src={LoginGraphic} alt="" />
            <button className=" flex gap-2 items-center font-sans px-6 py-3 rounded-xl bg-[#FFD953]" onClick={() => login()}>
                <BsGoogle />
                Login to Continue
            </button>
        </div>
    )
}

export { SignIn }
