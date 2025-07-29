import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const ContentManagement = () => {
    const [filter, setFilter] = useState("all"); // draft, published, all
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const token = localStorage.getItem("access-token");

    // axios instance with token
    const axiosSecure = axios.create({
        baseURL: "http://localhost:5000",
        headers: { Authorization: `Bearer ${token}` },
    });

    // Fetch blogs with filter
    const { data: blogs = [], isLoading, error } = useQuery({
        queryKey: ["blogs", filter],
        queryFn: async () => {
            const res = await axiosSecure.get("/blogs", {
                params: filter === "all" ? {} : { status: filter },
            });
            return res.data;
        },
        keepPreviousData: true,
    });

    // Pagination calculation
    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const currentBlogs = blogs.slice(
        (currentPage - 1) * blogsPerPage,
        currentPage * blogsPerPage
    );

    // Role from user context or fallback
    const userRole = user?.role || "donor";

    // Mutation handlers
    const publishMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/blogs/publish/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["blogs", filter]);
        },
    });

    const unpublishMutation = useMutation({
        mutationFn: (id) => axiosSecure.patch(`/blogs/unpublish/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["blogs", filter]);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/blogs/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["blogs", filter]);
        },
    });

    if (isLoading) return <div>Loading blogs...</div>;
    if (error) return <div className="text-red-600">Failed to load blogs.</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-red-600">Content Management</h2>
                {(userRole === "admin" || userRole === "volunteer") && (
                    <button
                        onClick={() => navigate("/dashboard/content-management/add-blog")}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        Add Blog
                    </button>
                )}
            </div>

            {/* Filter */}
            <select
                value={filter}
                onChange={(e) => {
                    setFilter(e.target.value);
                    setCurrentPage(1);
                }}
                className="mb-4 border px-2 py-1 rounded"
            >
                <option value="all">All</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
            </select>

            {/* Blogs list */}
            <div className="space-y-4">
                {currentBlogs.length === 0 ? (
                    <p>No blogs found.</p>
                ) : (
                    currentBlogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="border rounded p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={blog.thumbnailUrl || "/default-thumbnail.png"}
                                    alt={blog.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-semibold text-lg">{blog.title}</h3>
                                    <p className="capitalize text-gray-600">{blog.status}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-x-2 mt-4 md:mt-0">
                                {/* Only Admin can publish */}
                                {userRole === "admin" && blog.status === "draft" && (
                                    <button
                                        onClick={() => publishMutation.mutate(blog._id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                                        disabled={publishMutation.isLoading}
                                    >
                                        {publishMutation.isLoading ? "Publishing..." : "Publish"}
                                    </button>
                                )}

                                {/* Only Admin can unpublish */}
                                {userRole === "admin" && blog.status === "published" && (
                                    <button
                                        onClick={() => unpublishMutation.mutate(blog._id)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                                        disabled={unpublishMutation.isLoading}
                                    >
                                        {unpublishMutation.isLoading ? "Unpublishing..." : "Unpublish"}
                                    </button>
                                )}

                                {/* Only Admin can delete */}
                                {userRole === "admin" && (
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this blog?")) {
                                                deleteMutation.mutate(blog._id);
                                            }
                                        }}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                        disabled={deleteMutation.isLoading}
                                    >
                                        {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {[...Array(totalPages).keys()].map((n) => (
                        <button
                            key={n}
                            onClick={() => setCurrentPage(n + 1)}
                            className={`px-4 py-2 rounded ${currentPage === n + 1
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {n + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentManagement;



