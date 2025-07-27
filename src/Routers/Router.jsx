import { createBrowserRouter } from "react-router-dom";
import Homelayout from "../Layout/Homelayout";
import Home from "../Home/Home";
import Error from "../components/Error";
import Login from "../Pages/AuthPage/Login";
import Register from "../Pages/AuthPage/Register";
import Search from "../Pages/NavbarPage/Search";
import DonationRequests from "../Pages/NavbarPage/DonationRequests";
import DonationRequestDetails from "../Pages/NavbarPage/DonationRequestDetails";
import PrivateRoute from "../Provider/PrivateRoute";
import Blog from "../Pages/NavbarPage/Blog";
import Funding from "../Pages/NavbarPage/Funding";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../Pages/DashboardPage/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homelayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/donationRequest",
                element: <DonationRequests />,
            },
            {
                path: "/blog",
                element: <Blog></Blog>,
            },
            {
                path: "/requestDetails",
                element: (
                    <PrivateRoute>
                        <DonationRequestDetails />
                    </PrivateRoute>
                ),
            },
            {
                path: "/funding",
                element: (
                    <PrivateRoute>
                        <Funding></Funding>
                    </PrivateRoute>
                ),
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },

    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            { path: "profile", element: <Profile /> },
            // ... other routes
        ],
    }

]);

export default router;
