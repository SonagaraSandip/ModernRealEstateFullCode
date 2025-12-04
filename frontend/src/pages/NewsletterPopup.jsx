import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem("newsletter_shown");

    // Show popup only once every 24 hours
    if (!lastShown || Date.now() - lastShown > 24 * 60 * 60 * 1000) {
      setTimeout(() => setOpen(true), 1000); // delay 1s
      localStorage.setItem("newsletter_shown", Date.now());
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div
        className="
          bg-[#0f1c22] text-white 
          rounded-2xl shadow-xl 
          p-8 sm:p-10 w-[90%] sm:w-[480px] 
          relative animate-fadeIn
        "
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl sm:text-3xl text-center font-semibold mb-4">
          Sign up our newsletter
        </h2>

        <p className="text-gray-300 text-center mb-6 leading-relaxed">
          Subscribe our newsletters now and stay up-to-date with new
          collections.
        </p>

        {/* Email Input */}
        <div className="flex items-center border border-gray-500 rounded-full overflow-hidden px-4 py-2">
          <input
            type="email"
            placeholder="Enter Email"
            className="bg-transparent w-full text-white outline-none placeholder:text-gray-400"
          />
          <button className="p-2 text-white hover:text-teal-300 transition">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Animation Style */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}
