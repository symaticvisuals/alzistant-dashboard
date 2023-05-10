import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProtectedRoutes from "./private";
import { AuthLayout, MainLayout } from "../layout";
import { AddPatient, AddReminderPage, CameraPage, ChatBotPage, ReminderPage, SignIn, SignUp } from "../pages";
import { Tomorrow, Today, LateReminder } from "../pages/reminder";
import { GalleryPage } from "../pages/gallery";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/" element={<MainLayout />} >
                    <Route path="/" element={<ReminderPage />} >
                        <Route path="/" element={<Today />}></Route>
                        <Route path="/tomorrow" element={<Tomorrow />}></Route>
                        <Route path="/late-reminder" element={<LateReminder />} />
                    </Route>

                    <Route path="/add-reminder" element={<AddReminderPage />} />
                    <Route path="gallery" element={<GalleryPage />} />
                    <Route path="camera" element={<CameraPage />} />
                    <Route path="chat" element={<ChatBotPage />} />
                </Route>
                <Route path="/add-patient" element={<AddPatient />} />
                <Route path="*" element={<div>404</div>} />
            </Route>
            <Route path="/login" element={<AuthLayout />}>
                <Route path="" element={<SignIn />} />
                <Route path="sign-up" element={<SignUp />} />
            </Route>
            <Route path="*" element={<div>404</div>} />
        </>)
)