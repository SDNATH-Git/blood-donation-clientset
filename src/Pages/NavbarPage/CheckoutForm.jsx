import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ user, amount, onPaymentSuccess, onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card information is missing.");
            setProcessing(false);
            return;
        }

        // Create token (Demo purpose only)
        const { error, token } = await stripe.createToken(card);
        if (error) {
            setError(error.message);
            setProcessing(false);
            return;
        }

        try {
            const res = await fetch("https://blood-donation-serverset.vercel.app/funds", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.displayName || user.name,
                    email: user.email,
                    amount,
                    date: new Date(),
                    token: token.id,
                }),
            });

            if (res.ok) {
                alert("✅ Payment submitted .");
                if (onPaymentSuccess) onPaymentSuccess();
                if (onClose) onClose();
            } else {
                setError("Failed to save payment info.");
            }
        } catch (err) {
            setError("Payment failed: " + err.message);
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4 mt-4">
            <div className="border p-3 rounded bg-white text-black">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#32325d",
                                "::placeholder": {
                                    color: "#a0aec0",
                                },
                            },
                            invalid: {
                                color: "#fa755a",
                                iconColor: "#fa755a",
                            },
                        },
                    }}
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
                type="submit"
                disabled={!stripe || processing}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
            >
                {processing ? "Processing..." : `Donate $${amount}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
