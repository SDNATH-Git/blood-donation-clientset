import useUserRole from "../hooks/useUserRole";
import DonorDashboard from "../Pages/DonarDashboardPage/DonorDashboard";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import Loading from "../components/Loading";
import VolunteerRequests from "../Pages/VolunteerDashboard/VolunteerRequests";
const DynamicDashboardHome = () => {
    const [role, isLoading, isError, error] = useUserRole();

    if (isLoading) return <Loading></Loading>;
    if (isError) return <p className="text-center text-red-500">Role fetch error: {error.message}</p>;

    if (role === "admin") return <AdminDashboard />;
    if (role === "volunteer") return <VolunteerRequests />;
    return <DonorDashboard />;
};

export default DynamicDashboardHome;

