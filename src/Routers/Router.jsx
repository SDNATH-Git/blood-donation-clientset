import {
    createBrowserRouter,
} from "react-router";
import Homelayout from "../Layout/Homelayout";
import Home from "../Home/Home";
import Error from "../components/Error";
import Login from "../Pages/AuthPage/Login";
import Register from "../Pages/AuthPage/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Homelayout></Homelayout>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/register",
                Component: Register,
            },
            {

            }
        ]
    },
]);

export default router;

