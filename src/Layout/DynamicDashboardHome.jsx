import useUserRole from "../hooks/useUserRole";
import DonorDashboard from "../Pages/DashboardPage/DonorDashboard";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import VolunteerDashboard from "../Pages/VolunteerDashboard/VolunteerDashboard";
import Loading from "../components/Loading";
const DynamicDashboardHome = () => {
    const [role, isLoading, isError, error] = useUserRole();

    if (isLoading) return <Loading></Loading>;
    if (isError) return <p className="text-center text-red-500">Role fetch error: {error.message}</p>;

    if (role === "admin") return <AdminDashboard />;
    if (role === "volunteer") return <VolunteerDashboard />;
    return <DonorDashboard />;
};

export default DynamicDashboardHome;

