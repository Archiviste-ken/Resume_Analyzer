import Link from 'next/link';
import Button from './ui/Button';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-black tracking-tighter uppercase">
          AI<span className="text-[#FF4081]">REZU</span>
        </Link>
        <div className="hidden md:flex gap-8 font-bold uppercase">
          <Link href="#features" className="hover:text-[#FFB800]">Features</Link>
          <Link href="#how-it-works" className="hover:text-[#FFB800]">Process</Link>
        </div>
        <Button href="/analyze" variant="primary" className="py-2 px-4 text-sm">
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;