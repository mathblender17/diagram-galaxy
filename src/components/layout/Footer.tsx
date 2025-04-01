
import { Link } from "react-router-dom";
import { BookOpen, Mail, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-7 w-7 text-primary mr-2" />
              <span className="font-bold text-xl text-gray-900">Diagram Encyclopedia</span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              A comprehensive collection of scientific diagrams for educational and research purposes.
              Discover, share, and learn with high-quality visual resources.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-600 hover:text-primary transition-colors">
                  Upload
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* More links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/copyright" className="text-gray-600 hover:text-primary transition-colors">
                  Copyright
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Diagram Encyclopedia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
