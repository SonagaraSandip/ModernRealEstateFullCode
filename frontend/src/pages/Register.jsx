import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await registerUser(formData);

      if (res?.error) {
        setError(res.error);
      } else {
        navigate("/account/login");
      }
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-10">
      {/* Back to Shop */}
      <div className="flex flex-col items-center mb-10">
        <Link
          to={"/"}
          className="flex items-center gap-2 text-gray-700 hover:text-black transition"
        >
          <ArrowLeft
            size={32}
            className="p-1 border border-gray-400 rounded-full"
          />
          <span className="font-medium text-md">Back to Shop</span>
        </Link>

        <h1 className="text-3xl md:text-4xl font-extrabold mt-6">Register</h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-3xl border border-gray-400 rounded-md overflow-hidden shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-400 p-6 bg-gray-50">
          <h2 className="text-lg font-semibold">Register</h2>
        </div>

        {/* Body */}
        <div className="border-b border-gray-400 p-6">
          <p className="text-gray-800 mb-6 font-medium">Create your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <p className="bg-red-100 text-red-600 text-sm p-2 rounded">
                {error}
              </p>
            )}

            {/* Inputs */}
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full border border-gray-400 px-3 py-2 outline-none focus:border-black rounded"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full border border-gray-400 px-3 py-2 outline-none focus:border-black rounded"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full border border-gray-400 px-3 py-2 outline-none focus:border-black rounded"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <Link
                to="/forgot-password"
                className="text-red-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>

              <button
                type="submit"
                className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Create <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Login Redirect */}
        <div className="p-6 flex items-center justify-center text-sm bg-gray-50">
          <span>Already have an account?&nbsp;</span>
          <Link
            to={"/account/login"}
            className="flex items-center gap-2 bg-pink-100 hover:bg-pink-200 text-gray-800 px-6 py-2 rounded-full font-medium transition"
          >
            Login <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
