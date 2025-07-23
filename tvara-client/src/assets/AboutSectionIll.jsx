import React from "react";

const AboutSectionIll = () => (
  <svg
    width="500"
    height="400"
    viewBox="0 0 500 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full max-w-lg"
  >
    {/* Background circles */}
    <circle cx="250" cy="200" r="180" fill="url(#gradient1)" opacity="0.1" />
    <circle cx="250" cy="200" r="120" fill="url(#gradient2)" opacity="0.1" />

    {/* Main elements */}
    <rect x="180" y="120" width="140" height="100" rx="12" fill="white" stroke="url(#gradient3)" strokeWidth="2" />
    <rect x="200" y="140" width="100" height="8" rx="4" fill="url(#gradient3)" />
    <rect x="200" y="160" width="80" height="6" rx="3" fill="#e5e7eb" />
    <rect x="200" y="175" width="60" height="6" rx="3" fill="#e5e7eb" />

    {/* Connecting lines */}
    <path d="M250 120 L250 80 L350 80 L350 120" stroke="url(#gradient3)" strokeWidth="2" />
    <path d="M250 220 L250 260 L350 260 L350 220" stroke="url(#gradient3)" strokeWidth="2" />
    <path d="M180 170 L120 170 L120 120 L150 120" stroke="url(#gradient3)" strokeWidth="2" />

    {/* Small nodes */}
    <circle cx="350" cy="120" r="8" fill="url(#gradient3)" />
    <circle cx="350" cy="220" r="8" fill="url(#gradient3)" />
    <circle cx="150" cy="120" r="8" fill="url(#gradient3)" />

    {/* Gradients */}
    <defs>
      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

export default AboutSectionIll;
