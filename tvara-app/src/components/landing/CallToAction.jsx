import React, { useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

function CallToActionSection() {
  const [state, handleSubmit] = useForm("xblaqedv");
  const [email, setEmail] = useState("");

  return (
    <div
      id="cta"
      className="bg-background flex flex-col items-center justify-center px-4 py-12"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Transform Your Workflows?
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
          Join thousands of teams already building the future with AI-powered
          automation.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 mb-8 w-full max-w-md mx-auto"
        >
          <input
            id="email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full bg-white border-2 border-primary rounded-xl px-6 py-4 text-gray-800 placeholder-gray-500 text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 block"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <button
            type="submit"
            disabled={state.submitting || state.succeeded}
            className="w-full bg-primary hover:bg-primary text-white cursor-pointer font-semibold text-lg px-6 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed block mx-auto"
          >
            {state.submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : state.succeeded ? (
              <span className="flex items-center justify-center gap-2">
                <CircleCheckBig size={32} color="green" />
                Email Submitted!
              </span>
            ) : (
              "Get Early Access"
            )}
          </button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
          <div className="flex items-center gap-2">
            <CircleCheckBig size={32} className="text-black" color="white" />
            <span className="text-lg">Free to Start</span>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheckBig size={32} className="text-black" color="white" />
            <span className="text-lg">No Setup Required</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToActionSection;
