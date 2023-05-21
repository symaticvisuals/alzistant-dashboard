import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProtectedRoutes from "./private";
import { AuthLayout, MainLayout } from "../layout";
import { AddPatient, AddReminderPage, CameraPage, ChatBotPage, ProfilePage, ReminderPage, SignIn, SignUp } from "../pages";
import { Tomorrow, Today, LateReminder, AllReminders } from "../pages/reminder";
import { GalleryPage } from "../pages/gallery";
import AdminRenderer from "../components/user-conditional-renderer";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<ProtectedRoutes />}>
                <Route path="/" element={<MainLayout />} >
                    <Route path="/" element={<ReminderPage />} >
                        <Route path="/" element={<AdminRenderer trueComponent={<AllReminders />} falseComponent={<Today />} />}></Route>
                        <Route path="/tomorrow" element={<Tomorrow />}></Route>
                        <Route path="/late-reminder" element={<LateReminder />} />
                    </Route>

                    <Route path="/add-reminder" element={<AddReminderPage />} />
                    <Route path="/edit-reminder" element={<AddReminderPage />} />
                    <Route path="gallery" element={<GalleryPage />} />
                    <Route path="camera" element={<CameraPage />} />
                    <Route path="chat" element={<ChatBotPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="*" element={<div>404</div>} />
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