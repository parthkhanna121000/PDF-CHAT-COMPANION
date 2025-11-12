import React, { useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { LogoIcon } from "../../components/ui/Icons";
import { loginUser } from "../../api/auth"; // ✅ Backend integration

const glassCardStyle =
  "bg-white/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-lg";

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser({ email, password });

      // ✅ If login success
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        onLoginSuccess(); // trigger redirect / dashboard render
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          "Unable to log in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 h-screen w-full flex justify-center items-center">
      <div
        className={`${glassCardStyle} w-full max-w-md p-8 md:p-12 space-y-8`}
      >
        {/* --- Header --- */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogoIcon className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back!</h1>
          <p className="text-slate-600 mt-2">
            Log in to access your dashboard.
          </p>
        </div>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </form>

        {/* --- Signup Link --- */}
        <p className="text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
