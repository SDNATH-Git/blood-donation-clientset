import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth"; // example hook

const Profile = () => {
    const { user } = useAuth(); // name, email, avatar, etc.
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        district: "",
        upazila: "",
        bloodGroup: "",
        avatar: "",
        email: ""
    });

    useEffect(() => {
        // Load user info (possibly from DB or Auth context)
        setFormData({ ...user });
    }, [user]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        // API call to update user data here
        alert("Profile updated successfully!");
        setIsEditable(false);
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold text-red-700">Your Profile</h2>
                {isEditable ? (
                    <button onClick={handleSave} className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
                ) : (
                    <button onClick={() => setIsEditable(true)} className="bg-red-600 text-white px-4 py-1 rounded">Edit</button>
                )}
            </div>

            <form className="space-y-4">
                <input name="name" value={formData.name} onChange={handleChange} disabled={!isEditable} className="w-full border p-2 rounded" />
                <input name="email" value={formData.email} disabled className="w-full border p-2 rounded bg-gray-100 text-gray-500" />
                <input name="district" value={formData.district} onChange={handleChange} disabled={!isEditable} className="w-full border p-2 rounded" />
                <input name="upazila" value={formData.upazila} onChange={handleChange} disabled={!isEditable} className="w-full border p-2 rounded" />
                <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} disabled={!isEditable} className="w-full border p-2 rounded" />
                <input name="avatar" value={formData.avatar} onChange={handleChange} disabled={!isEditable} className="w-full border p-2 rounded" />
            </form>
        </div>
    );
};

export default Profile;
