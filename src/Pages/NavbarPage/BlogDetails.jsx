import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BlogDetails = () => {
    const { id } = useParams();

    const { data: blog, isLoading, error } = useQuery({
        queryKey: ["blog", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/blogs/publish/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <div className="text-center py-10">Loading blog...</div>;
    if (error || !blog) return <div className="text-center text-red-600">Blog not found.</div>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <img
                src={blog.thumbnailUrl || "/default-thumbnail.png"}
                alt={blog.title}
                className="w-full h-60 object-cover rounded mb-6"
            />
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-700 whitespace-pre-line">{blog.content}</p>
        </div>
    );
};

export default BlogDetails;
