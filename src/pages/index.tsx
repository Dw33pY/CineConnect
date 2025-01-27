import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold">Welcome to CineConnect</h1>
        <p className="text-xl mt-4">A social platform for movie lovers</p>
      </header>

      <main className="flex flex-col items-center">
        <Link
          href="/projects"
          className="bg-white text-blue-600 py-2 px-6 rounded-lg text-xl font-semibold transition-all hover:bg-blue-600 hover:text-white"
        >
          Discover Movies
        </Link>
      </main>
    </div>
  );
}
