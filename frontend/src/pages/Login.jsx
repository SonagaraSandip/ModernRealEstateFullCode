import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(formData);

    if (res.error) {
      setError(res.error);
    } else {
      //store token + user info in local storage
      localStorage.setItem("token", res.token);
      localStorage.setItem("role" , res.user.role)
      localStorage.setItem("user", JSON.stringify(res.user));

      //redirect admin dashboard if role = admin
      if (res.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Top Section */}
      <div className="flex flex-col items-center mb-8">
        <Link
          to={"/"}
          className="flex items-center gap-2 text-gray-700 hover:text-black transition"
        >
          <ArrowLeft
            size={32}
            className="p-1 border border-gray-400 rounded-full "
          />
          <span className="font-medium text-md">Back to Shop</span>
        </Link>
        <h1 className="text-3xl font-extrabold mt-6">Log In</h1>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-2xl border border-gray-400">
        {/* Header */}
        <div className="border-b border-gray-400 p-6">
          <h2 className="text-lg font-semibold">Log In</h2>
        </div>

        {/* Body */}
        <div className="border-b border-gray-400 p-6">
          <p className="text-gray-800 mb-6 font-medium">
            I am a returning customer
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}

            {error && (
              <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-3">
                {error}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-400 px-3 py-2 outline-none focus:border-black"
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
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-400 px-3 py-2 outline-none focus:border-black"
                />
              </div>
            </div>
            {/* Footer */}
            <div className="border-b border-gray-400 flex flex-col md:flex-row items-center justify-between p-6">
              <a
                href="#"
                className="text-red-600 hover:underline mb-4 md:mb-0 text-sm"
              >
                Forgot Password?
              </a>
              <button
                type="submit"
                className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Login <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Register Section */}
        <div className="p-6 flex items-center justify-center text-sm">
          <span>If you don’t have an account&nbsp;</span>
          <Link
            to={"/account/register"}
            className="flex items-center gap-2 bg-pink-100 hover:bg-pink-200 text-gray-800 px-6 py-2 rounded-full font-medium transition"
          >
            Register <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
