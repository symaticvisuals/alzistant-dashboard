import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProtectedRoutes from "./private";
import { AuthLayout, MainLayout } from "../layout";
import { ReminderPage } from "../pages";
import { Tomorrow, Today } from "../pages/reminder";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/" element={<MainLayout />} >
                    <Route path="/" element={<ReminderPage />} >
                        <Route path="/" element={<Today />}></Route>
                        <Route path="/tomorrow" element={<Tomorrow />}></Route>
                    </Route>
                    <Route path="gallery" element={<div>gallery</div>} />
                    <Route path="camera" element={<div>camera</div>} />
                    <Route path="chat" element={<div>chat</div>} />
                </Route>
            </Route>
            <Route path="/login" element={<AuthLayout />}>
                <Route path="" element={<div>Login</div>} />
            </Route>
            <Route path="*" element={<div>404</div>} />
        </>)
)