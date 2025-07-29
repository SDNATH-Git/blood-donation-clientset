import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Blog = () => {
    const [search, setSearch] = useState("");

    const { data: blogs = [], isLoading, error } = useQuery({
        queryKey: ["publishedBlogs"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/blogs/published");
            return res.data;
        },
    });

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center text-red-600">Failed to load blogs</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">Published Blogs</h2>

            {/* Search Box */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search blogs by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border px-4 py-2 rounded shadow"
                />
            </div>

            {/* Blog Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                    <div key={blog._id} className="border rounded shadow p-4 bg-white">
                        <img
                            src={blog.thumbnailUrl || "/default-thumbnail.png"}
                            alt={blog.title}
                            className="w-full h-40 object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                        <p className="text-gray-600 line-clamp-3">{blog.content.slice(0, 100)}...</p>
                        <Link
                            to={`/blogs/${blog._id}`}
                            className="inline-block mt-4 text-red-600 font-medium hover:underline"
                        >
                            View Details →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;