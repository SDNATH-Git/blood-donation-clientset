import axios from "axios";
import { toast } from "react-toastify";

const DonateModal = ({ requestId, donorName, donorEmail, onClose }) => {
    const handleConfirm = async () => {
        try {
            const token = localStorage.getItem("access-token");

            await axios.patch(
                `http://localhost:5000/donations/start/${requestId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Donation started!");
            onClose();
        } catch (error) {
            toast.error("Failed to start donation.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow max-w-md w-full space-y-4">
                <h3 className="text-xl font-bold text-red-600">Confirm Donation</h3>

                <div className="space-y-2">
                    <div>
                        <label className="block text-sm font-medium">Donor Name</label>
                        <input
                            type="text"
                            readOnly
                            value={donorName}
                            className="w-full border px-4 py-2 rounded bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Donor Email</label>
                        <input
                            type="email"
                            readOnly
                            value={donorEmail}
                            className="w-full border px-4 py-2 rounded bg-gray-100"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <button onClick={onClose} className="px-4 py-2 rounded border border-gray-300">
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Confirm Donate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonateModal;
