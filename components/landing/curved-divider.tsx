"use client";

import { motion } from "framer-motion";

interface CurvedDividerProps {
  flip?: boolean;
  color?: string;
}

export function CurvedDivider({
  flip = false,
  color = "#6BA3D0",
}: CurvedDividerProps) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "60px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: flip ? "scaleX(-1)" : "none",
        }}
      >
        <defs>
          {/* Gradiente que se mueve */}
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2E5C8A" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#6BA3D0" stopOpacity="1" />
            <stop offset="60%" stopColor="#A8D0E8" stopOpacity="1" />
            <stop offset="100%" stopColor="#2E5C8A" stopOpacity="0.3" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-1 0"
              to="1 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Filtro de brillo/destello */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sombra/halo detrás */}
        <path
          d="M0,30 C300,60 900,0 1200,30"
          fill="none"
          stroke="#A8D0E8"
          strokeWidth="6"
          strokeOpacity="0.3"
          filter="url(#glow)"
        />

        {/* Línea principal con gradiente animado */}
        <motion.path
          d="M0,30 C300,60 900,0 1200,30"
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="3"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Destello que viaja sobre la línea */}
        <motion.circle
          r="4"
          fill="white"
          filter="url(#glow)"
          style={{ offsetPath: "path('M0,30 C300,60 900,0 1200,30')" } as React.CSSProperties}
          animate={{ offsetDistance: ["0%", "100%"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        />
      </svg>
    </div>
  );
}