import { Link } from 'react-router-dom';
import { ShoppingBasket } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-primary font-bold text-xl">
          FoodFlow
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-primary">
            Home
          </Link>
          <Link to="/restaurants" className="text-gray-700 hover:text-primary">
            Restaurants
          </Link>
          <Link to="/orders" className="text-gray-700 hover:text-primary">
            Orders
          </Link>
          <Link to="/cart" className="text-gray-700 hover:text-primary">
           <ShoppingBasket/>
          </Link>
          <Link
            to="/login"
            className="bg-primary  px-4 py-2 rounded-md hover:bg-accent transition"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
