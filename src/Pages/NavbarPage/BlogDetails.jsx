import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BlogDetails = () => {
    const { id } = useParams();

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ["blog", id],
        queryFn: async () => {
            const res = await axios.get(`https://blood-donation-serverset.vercel.app/blogs/publish/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <div className="text-center py-10 text-lg text-gray-600">Loading blog...</div>;
    if (error || !blog) return <div className="text-center text-red-600 text-lg">Blog not found.</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-black px-4 py-10">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
                {/* Thumbnail */}
                <img
                    src={blog.thumbnailUrl || "/default-thumbnail.png"}
                    alt={blog.title}
                    className="w-full h-64 object-cover"
                />

                {/* Content */}
                <div className="p-6">
                    <h1 className="text-4xl font-bold text-red-700 mb-4">{blog.title}</h1>
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                        {blog.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
