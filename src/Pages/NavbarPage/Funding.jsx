import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
// import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FundModal from "./FundModal";
import { AuthContext } from "../../Provider/AuthProvider";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Funding = () => {
    const { user } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const { data: funds = [], isLoading, refetch } = useQuery({
        queryKey: ["funds"],
        queryFn: async () => {
            const res = await axios.get("https://blood-donation-serverset.vercel.app/funds");
            return res.data;
        },
    });

    const totalAmount = funds.reduce((sum, item) => sum + item.amount, 0);

    // পেমেন্ট সফল হলে কল হবে
    const onPaymentSuccess = () => {
        refetch();       // নতুন ডেটা আনবে
        setShowModal(false);  // মডাল বন্ধ করবে
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-red-700">User Fundings</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition"
                >
                    Give Fund
                </button>
            </div>

            <div className="overflow-x-auto border rounded-md shadow">
                <table className="min-w-full text-sm text-left text-gray-800">
                    <thead className="bg-red-100 text-red-700">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funds.map((fund, index) => (
                            <tr key={fund._id} className="border-b hover:bg-red-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{fund.name}</td>
                                <td className="px-4 py-2">{fund.email}</td>
                                <td className="px-4 py-2 font-semibold text-red-600">${fund.amount}</td>
                                <td className="px-4 py-2">{new Date(fund.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 text-right text-lg font-semibold text-black">
                Total Funds Raised: <span className="text-red-600">${totalAmount}</span>
            </div>

            {showModal && (
                <Elements stripe={stripePromise}>
                    <FundModal
                        user={user}
                        onClose={() => setShowModal(false)}
                        onPaymentSuccess={onPaymentSuccess}  // এখানে পাস করলাম
                    />
                </Elements>
            )}
        </div>
    );
};

export default Funding;
