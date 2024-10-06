import Link from 'next/link';

export default function Navbar({ links }) {
    return (
        <nav className="flex justify-center items-center h-16 text-center text-xl bg-gray-900 text-neutral-100 sticky top-0">
            <div>
                {links.map((link, index) => (
                    <Link key={index} href={link.href} className="mx-6">
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}