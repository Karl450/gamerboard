import Link from 'next/link';

export default function Navbar({ links }) {
  return (
    <nav className="flex justify-between items-center h-16 px-6 bg-slate-50 text-black font-bold sticky top-0 shadow-md z-10">
      <div className="flex items-center space-x-8">
        <span className="font-bold text-lg font-protest-strike">Gamerboard</span>
      </div>
      <div className="hidden md:flex space-x-6">
        {links.map((link, index) => (
          <Link key={index} href={link.href} className="hover:text-amber-400 transition duration-300 hover:underline">
            {link.name}
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        <button className="text-2xl focus:outline-none">&#9776;</button>
      </div>
    </nav>
  );
}
