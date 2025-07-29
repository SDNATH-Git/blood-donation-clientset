import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JoditEditor } from "jodit-react";
import { toast } from "react-toastify";

const AddBlog = () => {
    const [title, setTitle] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [content, setContent] = useState("");
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("access-token");

    // ImageBB API key (environment variable recommended)
    const imgbbApiKey = process.env.REACT_APP_IMGBB_API_KEY;

    const uploadImage = async (file) => {
        setUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                formData
            );
            setThumbnailUrl(res.data.data.url);
            toast.success("Image uploaded successfully");
        } catch (error) {
            toast.error("Image upload failed");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || !thumbnailUrl) {
            toast.error("All fields are required");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:5000/blogs",
                {
                    title,
                    content,
                    thumbnailUrl,
                    status: "draft", // default
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.data.success) {
                toast.success("Blog created successfully");
                navigate("/dashboard/content-management");
            } else {
                toast.error("Failed to create blog");
            }
        } catch (err) {
            toast.error("Failed to create blog");
            console.error(err);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-1 font-semibold">Title</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Thumbnail Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadImage(e.target.files[0])}
                        disabled={uploading}
                        required
                    />
                    {thumbnailUrl && (
                        <img src={thumbnailUrl} alt="Thumbnail" className="mt-2 w-48" />
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Content</label>
                    <JoditEditor value={content} onChange={(newContent) => setContent(newContent)} />
                </div>

                <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    disabled={uploading}
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
