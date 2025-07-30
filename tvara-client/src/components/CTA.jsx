import React, { useState } from "react";

function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus("loading");
    
    try {
      const response = await fetch("https://formspree.io/f/xkgbdrzj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          source: "cta-section",
          message: `New waitlist signup from CTA section: ${email}`
        }),
      });
      
      if (response.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-blue-700 mb-6">
            Ready to Transform Your Workflows?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already building the future with AI-powered automation.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex w-full rounded-md border border-gray-300 px-4 py-3 text-lg bg-white backdrop-blur-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 flex-1"
              placeholder="Enter your email"
              required
              disabled={status === "loading"}
            />
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {status === "success" && (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              )}
              {status === "error" && (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              {status === "idle" && "Get Early Access"}
              {status === "loading" && "Joining..."}
              {status === "success" && "Joined!"}
              {status === "error" && "Try Again"}
            </button>
          </form>

          {/* Status Messages */}
          {status === "success" && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg max-w-md mx-auto animate-fade-in">
              <div className="flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium">🎉 You're on the list!</span>
              </div>
              <p className="text-sm mt-1">We'll be in touch soon with updates.</p>
            </div>
          )}
          {status === "error" && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md mx-auto animate-fade-in">
              <div className="flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-medium">❌ Something went wrong</span>
              </div>
              <p className="text-sm mt-1">Please try again or contact support.</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.801 10A10 10 0 1 1 17 3.335"/>
                <path d="m9 11 3 3L22 4"/>
              </svg>
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.801 10A10 10 0 1 1 17 3.335"/>
                <path d="m9 11 3 3L22 4"/>
              </svg>
              <span>No setup required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
