"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! // put in .env.local
);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const showId = searchParams.get("showId");

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("selectedSeats");
    if (stored) setSelectedSeats(JSON.parse(stored));
  }, []);

  const handlePayment = async () => {
  if (!selectedSeats.length) {
    alert("Please select at least one seat.");
    return;
  }

  try {
    setLoading(true);

    // Call your backend API to create a Checkout Session
    const res = await fetch("/api/checkout_session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        showId,
        seats: selectedSeats,
      }),
    });

    const data = await res.json();
    console.log("Checkout session response:", data);

    if (!res.ok || !data.url) {
      alert("Failed to create checkout: " + (data.error || "Unknown error"));
      return;
    }

    // Redirect user to Stripe Checkout page
    window.location.href = data.url;
  } catch (err) {
    console.error("Payment error:", err);
    alert("Payment failed! Check console for details.");
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Booking summary */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
        <p><strong>Show ID:</strong> {showId}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(", ")}</p>
        <p><strong>Total Price:</strong> ₹{selectedSeats.length * 200}</p>
      </div>

      <button
        disabled={!selectedSeats.length || loading}
        onClick={handlePayment}
        className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Redirecting..." : "Pay with Stripe"}
      </button>
    </main>
  );
}
