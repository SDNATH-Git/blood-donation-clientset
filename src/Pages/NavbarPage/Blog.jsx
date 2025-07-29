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
        <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-black py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-10 text-center text-red-600">Published Blogs</h2>

                {/* Search Box */}
                <div className="mb-10 max-w-md mx-auto">
                    <input
                        type="text"
                        placeholder="Search blogs by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 border border-red-400 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                {/* Blog Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBlogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
                        >
                            <img
                                src={blog.thumbnailUrl || "/default-thumbnail.png"}
                                alt={blog.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-semibold text-red-700 mb-2">{blog.title}</h3>
                                    <p className="text-gray-600 line-clamp-3">{blog.content.slice(0, 120)}...</p>
                                </div>
                                <Link
                                    to={`/blogs/${blog._id}`}
                                    className="mt-4 inline-block text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium text-center"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
