import { useState } from "react";
import CheckoutForm from "./CheckoutForm";

const FundModal = ({ user, onClose, onPaymentSuccess }) => {
    const [amount, setAmount] = useState(0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
                >
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4 text-center text-red-700">Make a Donation</h2>

                <form className="space-y-4">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        placeholder="Enter amount in USD"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-red-500"
                    />
                </form>

                {amount > 0 && (
                    <CheckoutForm
                        amount={amount}
                        user={user}
                        onClose={onClose}
                        onPaymentSuccess={onPaymentSuccess}  // এখানে পাস করলাম
                    />
                )}
            </div>
        </div>
    );
};

export default FundModal;
