"use client";
import { useState } from "react";
import { ShareIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-md"
    >
      {copied ? (
        <ClipboardDocumentCheckIcon className="h-5 w-5" />
      ) : (
        <ShareIcon className="h-5 w-5" />
      )}
      {copied ? "¡Copiado!" : "Compartir"}
    </button>
  );
}
