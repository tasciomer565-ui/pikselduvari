import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-indigo-600/30 mb-4">404</div>
        <h1 className="text-2xl font-bold mb-3">Sayfa Bulunamadı</h1>
        <p className="text-gray-400 mb-8">
          Aradığınız sayfa mevcut değil ya da taşınmış olabilir.
        </p>
        <Link
          href="/"
          className="bg-indigo-600 hover:bg-indigo-500 transition px-6 py-3 rounded-xl font-semibold inline-block"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </main>
  );
}
