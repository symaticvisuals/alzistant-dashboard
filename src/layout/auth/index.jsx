import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

const AccessTokenContext = createContext();

function AuthLayout() {
    const [accessToken, setAccessToken] = useState(null);
    return (
        <div>
            <AccessTokenContext.Provider value={{
                accessToken, setAccessToken
            }}>
                <Outlet />
            </AccessTokenContext.Provider>
        </div>
    )
}

export { AuthLayout, AccessTokenContext }
