import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

const AccessTokenContext = createContext();

function AuthLayout() {

    return (
        <div>
            <Outlet />

        </div>
    )
}

export { AuthLayout, AccessTokenContext }
