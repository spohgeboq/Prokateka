"use client";

import React, { useState } from "react";
import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = "md",
  className = "",
  showSubtitle = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Scaled dimensions
  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.3 : 1;

  return (
    <div
      className={`inline-flex flex-col items-center justify-center cursor-pointer select-none group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        {/* Real Logo or SVG Interactive Composite */}
        <div className="flex items-center tracking-tight font-black leading-none">
          {/* PR */}
          <span
            className="text-white font-extrabold uppercase transition-colors duration-200 group-hover:text-amber-100"
            style={{ fontSize: `${2.25 * scale}rem`, letterSpacing: "-0.03em" }}
          >
            PR
          </span>

          {/* O - Industrial Gear Element */}
          <div
            className="relative inline-flex items-center justify-center mx-[2px] transition-transform duration-700 ease-out"
            style={{
              width: `${2.3 * scale}rem`,
              height: `${2.3 * scale}rem`,
              transform: isHovered ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Gear Teeth (Amber-Orange) */}
              <g fill="#F59E0B">
                {/* 8 Gear Teeth */}
                <rect x="42" y="2" width="16" height="14" rx="3" />
                <rect x="42" y="84" width="16" height="14" rx="3" />
                <rect x="2" y="42" width="14" height="16" rx="3" />
                <rect x="84" y="42" width="14" height="16" rx="3" />
                <rect x="14" y="14" width="15" height="15" rx="3" transform="rotate(45 21.5 21.5)" />
                <rect x="71" y="14" width="15" height="15" rx="3" transform="rotate(45 78.5 21.5)" />
                <rect x="14" y="71" width="15" height="15" rx="3" transform="rotate(45 21.5 78.5)" />
                <rect x="71" y="71" width="15" height="15" rx="3" transform="rotate(45 78.5 78.5)" />

                {/* Right half gear body */}
                <path d="M50 10 A40 40 0 0 1 50 90 Z" />
              </g>

              {/* Left half white ring body */}
              <path
                d="M50 90 A40 40 0 0 1 50 10 Z"
                fill="#FFFFFF"
              />

              {/* Center hole cutout (Deep Navy) */}
              <circle cx="50" cy="50" r="23" fill="#0F172A" />
            </svg>
          </div>

          {/* kateka */}
          <span
            className="text-white font-extrabold tracking-tight transition-colors duration-200 group-hover:text-amber-100"
            style={{ fontSize: `${2.25 * scale}rem`, letterSpacing: "-0.04em" }}
          >
            kateka
          </span>
        </div>
      </div>

      {/* Subtitle: JALĞA BERU ORTALYĞY */}
      {showSubtitle && (
        <span
          className="text-brand-500 font-extrabold uppercase tracking-widest leading-none mt-1 transition-all duration-300 group-hover:tracking-[0.25em]"
          style={{
            fontSize: `${0.65 * scale}rem`,
            letterSpacing: "0.18em",
          }}
        >
          JALĞA BERU ORTALYĞY
        </span>
      )}
    </div>
  );
};
