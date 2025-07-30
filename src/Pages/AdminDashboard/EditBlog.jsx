import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: "https://blood-donation-serverset.vercel.app",
    headers: { Authorization: `Bearer ${localStorage.getItem("access-token")}` },
});

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosSecure.get(`/blogs/${id}`);
                // console.log("Fetched blog:", res.data);
                const blog = res.data;

                setTitle(blog.title);
                setContent(blog.content);
                setThumbnailUrl(blog.thumbnailUrl || "");
            } catch (error) {
                console.error("Failed to load blog data:", error);
                toast.error("Failed to load blog data.");
            }
        };

        if (id) fetchBlog();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error("Title and Content cannot be empty.");
            return;
        }

        setLoading(true);

        try {
            await axiosSecure.patch(`/blogs/${id}`, {
                title,
                content,
                thumbnailUrl,
            });

            toast.success("Blog updated successfully!");
            navigate("/dashboard/content-management");
        } catch (error) {
            toast.error("Failed to update blog.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
            <h2 className="text-2xl font-bold mb-6 text-red-600">Edit Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Title</label>
                    <input
                        type="text"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Content</label>
                    <textarea
                        className="w-full border rounded px-4 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Thumbnail URL</label>
                    <input
                        type="url"
                        className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded text-white font-semibold ${loading ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                        } transition`}
                >
                    {loading ? "Updating..." : "Update Blog"}
                </button>
            </form>
        </div>
    );
};

export default EditBlog;
