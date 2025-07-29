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
import DonorDashboard from "../Pages/DashboardPage/DonorDashboard";
import MyDonationRequests from "../Pages/DashboardPage/MyDonationRequests";
import CreateDonationRequest from "../Pages/DashboardPage/CreateDonationRequest";
import EditRequest from "../Pages/DashboardPage/EditRequest";
import ViewRequest from "../Pages/DashboardPage/ViewRequest";
import DynamicDashboardHome from "../Layout/DynamicDashboardHome";
import AllUsers from "../Pages/AdminDashboard/AllUsers";

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

    // {
    //     path: "/dashboard",
    //     element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    //     children: [
    //         { index: true, element: <DonorDashboard /> }, // Default dashboard
    //         { path: "profile", element: <Profile /> },
    //         { path: "my-donation-requests", element: <MyDonationRequests /> },
    //         { path: "create-donation-request", element: <CreateDonationRequest /> },
    //         { path: "requests/edit/:id", element: <EditRequest /> },
    //         { path: "requests/:id", element: <ViewRequest /> },
    //     ],
    // }
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <DynamicDashboardHome />, // এখানে role অনুযায়ী ঠিক component render হবে
            },
            { path: "profile", element: <Profile /> },
            { path: "my-donation-requests", element: <MyDonationRequests /> },
            { path: "create-donation-request", element: <CreateDonationRequest /> },
            { path: "requests/edit/:id", element: <EditRequest /> },
            { path: "requests/:id", element: <ViewRequest /> },

            // Admin Routes
            { path: "all-users", element: <AllUsers /> },
            // { path: "all-blood-donation-request", element: <AllDonationRequests /> },
            // { path: "content-management", element: <BlogList /> },
            // { path: "content-management/add-blog", element: <AddBlog /> },
        ],
    }




]);

export default router;
