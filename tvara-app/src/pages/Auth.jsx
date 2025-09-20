import React, { useState } from "react";
import { Github, Mail, Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";
import authService from "../services/authServices";

function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!isLogin) {
      if (!formData.first_name) {
        newErrors.first_name = "First name is required";
      }

      if (!formData.last_name) {
        newErrors.last_name = "Last name is required";
      }

      if (!formData.confirm_password) {
        newErrors.confirm_password = "Please confirm your password";
      } else if (formData.password !== formData.confirm_password) {
        newErrors.confirm_password = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      let response;

      if (isLogin) {
        const loginData = {
          email: formData.email,
          password: formData.password,
        };
        response = await authService.login(loginData);
      } else {
        const registerData = {
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
          confirm_password: formData.confirm_password,
        };
        response = await authService.register(registerData);
      }

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Auth error:", error);

      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else if (error.response?.data?.detail) {
        setErrors({ general: error.response.data.detail });
      } else {
        setErrors({
          general: isLogin
            ? "Login failed. Please try again."
            : "Registration failed. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  };

  return (
    <div className="bg-[#0F181F] min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Build the
              <span className="bg-gradient-to-r from-blue-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent block">
                Future of AI
              </span>
            </h1>

            <p className="text-gray-300 text-base mb-6 leading-relaxed">
              Transform your ideas into powerful AI workflows. No coding
              required, infinite possibilities ahead.
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>10,000+ workflows created</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Now!</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {isLogin ? "Welcome back" : "Create your account"}
                </h2>
                <p className="text-gray-400 text-sm">
                  {isLogin
                    ? "Sign in to continue your AI journey"
                    : "Start building powerful AI workflows in seconds"}
                </p>
              </div>

              {errors.general && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{errors.general}</p>
                </div>
              )}

              <div className="flex gap-3 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-lg transition-all duration-300 group text-sm cursor-pointer">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </button>

                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-lg transition-all duration-300 group text-sm cursor-pointer">
                  <Mail className="w-4 h-4" />
                  <span>Google</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#0F181F] text-gray-400">
                    or continue with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-3">
                  {!isLogin && (
                    <div className="flex gap-3">
                      <div className="flex-1 space-y-1">
                        <label className="text-xs font-medium text-gray-300">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                          placeholder="First name"
                          className={`w-full bg-white/5 border rounded-lg p-2.5 focus:outline-none focus:bg-white/10 transition-all duration-300 placeholder-gray-500 text-sm ${
                            errors.first_name
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-white/20 focus:border-blue-500"
                          }`}
                          required={!isLogin}
                        />
                        {errors.first_name && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.first_name}
                          </p>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <label className="text-xs font-medium text-gray-300">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                          placeholder="Last name"
                          className={`w-full bg-white/5 border rounded-lg p-2.5 focus:outline-none focus:bg-white/10 transition-all duration-300 placeholder-gray-500 text-sm ${
                            errors.last_name
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-white/20 focus:border-blue-500"
                          }`}
                          required={!isLogin}
                        />
                        {errors.last_name && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.last_name}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`w-full bg-white/5 border rounded-lg p-2.5 focus:outline-none focus:bg-white/10 transition-all duration-300 placeholder-gray-500 text-sm ${
                        errors.email
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/20 focus:border-blue-500"
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {isLogin ? (
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-300">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                          className={`w-full bg-white/5 border rounded-lg p-2.5 pr-10 focus:outline-none focus:bg-white/10 transition-all duration-300 placeholder-gray-500 text-sm ${
                            errors.password
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-white/20 focus:border-blue-500"
                          }`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div className="flex-1 space-y-1">
                        <label className="text-xs font-medium text-gray-300">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className={`w-full bg-white/5 border rounded-lg p-2.5 pr-10 focus:outline-none focus:bg-white/10 transition-all duration-300 placeholder-gray-500 text-sm ${
                              errors.password
                                ? "border-red-500/50 focus:border-red-500"
                                : "border-white/20 focus:border-blue-500"
                            }`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      <div className="flex-1 space-y-1">
                        <label className="text-xs font-medium text-gray-300">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleInputChange}
                            placeholder="Confirm password"
                            className={`w-full bg-white/5 border rounded-lg p-2.5 pr-10 focus:outline-none focus:bg-white/10 transition-all duration-300 placeholder-gray-500 text-sm ${
                              errors.confirm_password
                                ? "border-red-500/50 focus:border-red-500"
                                : "border-white/20 focus:border-blue-500"
                            }`}
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.confirm_password && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.confirm_password}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold p-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 text-sm mt-4 cursor-pointer"
                  >
                    {isLoading
                      ? isLogin
                        ? "Signing In..."
                        : "Creating Account..."
                      : isLogin
                      ? "Sign In"
                      : "Create Account"}
                  </button>
                </div>

                <div className="text-center mt-6 pt-6 border-t border-white/10">
                  <p className="text-gray-400">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <button
                      onClick={toggleAuthMode}
                      className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline cursor-pointer"
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>

                {!isLogin && (
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-blue-400 hover:underline">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-400 hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
