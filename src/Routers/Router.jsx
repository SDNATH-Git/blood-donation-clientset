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
import Profile from "../Pages/DonarDashboardPage/Profile";
import DonorDashboard from "../Pages/DonarDashboardPage/DonorDashboard";
import MyDonationRequests from "../Pages/DonarDashboardPage/MyDonationRequests";
import CreateDonationRequest from "../Pages/DonarDashboardPage/CreateDonationRequest";
import EditRequest from "../Pages/DonarDashboardPage/EditRequest";
import ViewRequest from "../Pages/DonarDashboardPage/ViewRequest";
import DynamicDashboardHome from "../Layout/DynamicDashboardHome";
import AllUsers from "../Pages/AdminDashboard/AllUsers";
import AllBloodDonationRequests from "../Pages/AdminDashboard/AllBloodDonationRequests";
import ContentManagement from "../Pages/AdminDashboard/ContentManagement.JSX";
import AddBlog from "../Pages/AdminDashboard/AddBlog";
import VolunteerRequests from "../Pages/VolunteerDashboard/VolunteerRequests";
import BlogDetails from "../Pages/NavbarPage/BlogDetails";


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
                path: "/blogs/:id",
                element: <BlogDetails />,
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
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <DynamicDashboardHome />,
            },
            { path: "profile", element: <Profile /> },
            { path: "my-donation-requests", element: <MyDonationRequests /> },
            { path: "create-donation-request", element: <CreateDonationRequest /> },
            { path: "requests/edit/:id", element: <EditRequest /> },
            { path: "requests/:id", element: <ViewRequest /> },

            // Admin Routes
            { path: "all-users", element: <AllUsers /> },
            { path: "all-blood-donation-request", element: <AllBloodDonationRequests /> },
            { path: "content-management", element: <ContentManagement /> },
            { path: "content-management/add-blog", element: <AddBlog /> },

            { path: "volunteer-requests", element: <VolunteerRequests /> },
        ],
    }




]);

export default router;
