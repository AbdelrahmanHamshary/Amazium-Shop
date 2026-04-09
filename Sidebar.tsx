import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-amazon text-white mt-auto">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="w-full bg-amazon-light hover:bg-[#37475a] py-3 text-sm text-center transition-colors"
      >
        Back to top
      </button>

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-bold mb-3">Get to Know Us</h3>
          {['Careers', 'Blog', 'About Amazium', 'Investor Relations', 'Amazium Devices'].map((i) => (
            <p key={i} className="text-gray-300 hover:text-white hover:underline cursor-pointer py-1">{i}</p>
          ))}
        </div>
        <div>
          <h3 className="font-bold mb-3">Make Money with Us</h3>
          {['Sell products', 'Become an Affiliate', 'Advertise', 'Self-Publish', 'Host a Hub'].map((i) => (
            <p key={i} className="text-gray-300 hover:text-white hover:underline cursor-pointer py-1">{i}</p>
          ))}
        </div>
        <div>
          <h3 className="font-bold mb-3">Payment Products</h3>
          {['Business Card', 'Shop with Points', 'Reload Your Balance', 'Currency Converter'].map((i) => (
            <p key={i} className="text-gray-300 hover:text-white hover:underline cursor-pointer py-1">{i}</p>
          ))}
        </div>
        <div>
          <h3 className="font-bold mb-3">Let Us Help You</h3>
          {['Your Account', 'Your Orders', 'Shipping Rates', 'Returns', 'Help'].map((i) => (
            <Link key={i} to="/" className="block text-gray-300 hover:text-white hover:underline py-1">{i}</Link>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-amazon-orange">a</span>mazium<span className="text-amazon-orange text-xs">.shop</span>
          </Link>
          <div className="text-right">
            <p className="text-gray-400 text-xs">© {new Date().getFullYear()} Amazium.shop — All rights reserved</p>
            <p className="text-gray-500 text-[11px]">Built by abdelrahman hamdy — ID: 202002570</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
