import React from "react";

export default function Logo() {
  return (
    <svg
      width="200"
      height="40"
      viewBox="0 0 200 40"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#2563eb", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <text
        x="10"
        y="30"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="url(#logoGradient)"
      >
        Marketing
        <tspan fill="#3b82f6">Hub</tspan>
      </text>
      <path d="M190 20l-3-3v6l3-3z" fill="#3b82f6" />
    </svg>
  );
}
