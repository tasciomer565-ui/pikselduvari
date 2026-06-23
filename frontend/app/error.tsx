"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-3">Bir Hata Oluştu</h1>
        <p className="text-gray-400 mb-8">
          {error.message || "Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold"
          >
            Tekrar Dene
          </button>
          <a
            href="/"
            className="bg-gray-800 hover:bg-gray-700 transition px-6 py-3 rounded-xl font-semibold"
          >
            Ana Sayfa
          </a>
        </div>
      </div>
    </main>
  );
}
