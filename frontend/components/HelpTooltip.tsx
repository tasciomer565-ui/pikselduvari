"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";

interface Props {
  text: string;
}

export default function HelpTooltip({ text }: Props) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="text-gray-600 hover:text-gray-400 transition ml-1 align-middle"
        aria-label="Bilgi"
      >
        <HelpCircle size={13} />
      </button>
      {show && (
        <span className="absolute left-6 top-0 z-50 w-52 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 shadow-xl pointer-events-none leading-relaxed whitespace-normal">
          {text}
        </span>
      )}
    </span>
  );
}
