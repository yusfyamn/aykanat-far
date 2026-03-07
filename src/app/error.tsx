"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-dark text-white p-6">
      <h2 className="mb-4 text-3xl font-bold text-red-500">Bir Hata Oluştu!</h2>
      <div className="bg-red-950 p-4 rounded mb-6 max-w-2xl w-full">
        <p className="font-mono text-sm break-words">{error.message || "Bilinmeyen Hata"}</p>
        {error.stack && (
          <pre className="mt-4 p-4 bg-black/50 text-xs overflow-auto max-h-64 rounded">
            {error.stack}
          </pre>
        )}
      </div>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-white text-dark font-medium rounded-full"
      >
        Tekrar Dene
      </button>
    </div>
  );
}
