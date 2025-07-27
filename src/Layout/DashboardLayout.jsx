import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-red-700 text-white p-6 hidden md:block">
                <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                <ul className="space-y-3">
                    <li><Link to="/dashboard/profile">Profile</Link></li>
                    {/* Add more links */}
                </ul>
            </aside>

            {/* Content */}
            <main className="flex-1 bg-gray-100 p-4">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
