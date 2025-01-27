import Link from "next/link"; 

const Header = ({ setSearchQuery }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">
        <Link href="/">CineConnect</Link>
      </h1>

      <div>
        <Link href="/favorites">
          <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700">
            View Favorites
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
