import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        avatar: "",
        district: "",
        upazila: "",
        blood: "",
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchMongoUser = async () => {
            if (user?.email) {
                try {
                    const res = await axios.get(`https://blood-donation-serverset.vercel.app/users/${user.email}`);
                    const dbUser = res.data;
                    setFormData({
                        name: dbUser.name || "",
                        email: dbUser.email || "",
                        avatar: dbUser.avatar || "",
                        district: dbUser.district || "",
                        upazila: dbUser.upazila || "",
                        blood: dbUser.blood || "",
                    });
                } catch (err) {
                    console.error("Failed to load user from DB", err);
                }
            }
        };

        fetchMongoUser();
    }, [user]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    // const handleSave = async () => {
    //     try {
    //         let avatarUrl = formData.avatar;

    //         // 1. Upload image if changed
    //         if (imageFile) {
    //             const imgBBKey = import.meta.env.VITE_IMGBB_API_KEY;
    //             const imageData = new FormData();
    //             imageData.append("image", imageFile);

    //             const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, imageData);
    //             avatarUrl = imgRes.data.data.url;
    //         }

    //         // 2. Update backend
    //         const updatedUser = { ...formData, avatar: avatarUrl };
    //         await axios.patch(`https://blood-donation-serverset.vercel.app/users/${user._id}`, updatedUser);

    //         alert("Profile updated successfully!");
    //         setIsEditable(false);
    //     } catch (err) {
    //         console.error("Update failed:", err);
    //         alert("Profile update failed!");
    //     }
    // };


    const handleSave = async () => {
        try {
            let avatarUrl = formData.avatar;

            // 1. Upload image if changed
            if (imageFile) {
                const imgBBKey = import.meta.env.VITE_IMGBB_API_KEY;
                const imageData = new FormData();
                imageData.append("image", imageFile);

                const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, imageData);
                avatarUrl = imgRes.data.data.url;
            }

            // 2. Update backend with email in URL
            const updatedUser = { ...formData, avatar: avatarUrl };
            await axios.patch(`https://blood-donation-serverset.vercel.app/users/${formData.email}`, updatedUser);

            alert("Profile updated successfully!");
            setIsEditable(false);
        } catch (err) {
            console.error("Update failed:", err);
            alert("Profile update failed!");
        }
    };



    return (
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-red-600">My Profile</h2>
                {isEditable ? (
                    <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditable(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold"
                    >
                        Edit
                    </button>
                )}
            </div>

            <div className="flex justify-center mb-4">
                <img
                    src={formData.avatar || "https://i.ibb.co/ZYW3VTp/blood-drop.png"}
                    alt="avatar"
                    className="w-32 h-32 object-cover rounded-full border-4 border-red-500"
                />
            </div>

            <form className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className="w-full p-2 rounded border border-gray-300 disabled:bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email (Not Editable)</label>
                    <input
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full p-2 rounded border border-gray-300 bg-gray-100 text-gray-500"
                    />
                </div>

                {/* Avatar Upload */}
                {isEditable && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Upload New Avatar</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                )}

                <div>
                    <label className="block text-gray-700 font-medium mb-1">District</label>
                    <input
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className="w-full p-2 rounded border border-gray-300 disabled:bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Upazila</label>
                    <input
                        name="upazila"
                        value={formData.upazila}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className="w-full p-2 rounded border border-gray-300 disabled:bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Blood Group</label>
                    <select
                        name="blood"
                        value={formData.blood}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className="w-full p-2 rounded border border-gray-300 disabled:bg-gray-100"
                    >
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Profile;
