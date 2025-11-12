import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoIcon } from "../../components/ui/Icons";
import { registerUser } from "../../api/auth"; // ✅ API integration
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const glassCardStyle =
  "bg-white/30 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-lg";

const Signup = ({ onSignupSuccess }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser({
        name: fullName,
        email,
        password,
      });

      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Account created successfully!");
        onSignupSuccess?.(); // Redirect or trigger post-signup logic
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message ||
          "Unable to create account. Try again later."
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
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogoIcon className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            Create an Account
          </h1>
          <p className="text-slate-600 mt-2">
            Get started with your PDF companion.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Full Name
            </label>
            <Input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Johnson"
            />
          </div>

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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
