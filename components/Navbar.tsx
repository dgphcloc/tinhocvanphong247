import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImage from "./logo.jpg";
import {
  Menu,
  X,
  Monitor,
  Search,
  Sparkles,
  Bot,
  LogIn,
  User as UserIcon,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { BLOG_NAME } from "../constants";
import { useAuth } from "../context/AuthContext";
import { signOut } from "../services/authService";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchInput(false);
      setIsOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    setIsUserMenuOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-3 shadow-lg group-hover:bg-blue-700 transition-colors">
                {/* <Monitor size={24} /> */}
                <img
                  src={logoImage}
                  alt="Website Logo"
                  className="w-full h-full object-contain" // Thêm class để ảnh vừa vặn với div chứa
                />
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">
                {BLOG_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <NavLink to="/" className={navLinkClass}>
              Trang chủ
            </NavLink>
            <NavLink to="/category/excel" className={navLinkClass}>
              Excel
            </NavLink>
            <NavLink to="/category/word" className={navLinkClass}>
              Word
            </NavLink>
            <NavLink to="/category/powerpoint" className={navLinkClass}>
              PowerPoint
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              Giới thiệu
            </NavLink>

            {/* Featured Chatbot Button */}
            <NavLink
              to="/chatbot"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-md transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white ring-2 ring-purple-300"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:text-purple-600"
                }`
              }
            >
              <Sparkles
                size={16}
                className="mr-2 animate-pulse text-yellow-400"
                fill="currentColor"
              />
              <span>AI Trợ lý</span>
            </NavLink>

            <div className="relative border-l border-slate-200 pl-4 flex items-center gap-4">
              {showSearchInput ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="w-40 px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                    onBlur={() => !searchQuery && setShowSearchInput(false)}
                  />
                  <button
                    type="submit"
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <Search size={18} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="text-slate-500 hover:text-blue-600 transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              )}

              {/* User Auth Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                      {user.fullName ? (
                        user.fullName.charAt(0).toUpperCase()
                      ) : (
                        <UserIcon size={16} />
                      )}
                    </div>
                    <ChevronDown size={14} className="text-slate-500" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 animate-fade-in z-50">
                      <div className="px-4 py-3 border-b border-slate-50">
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {user.fullName || "Người dùng"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.email.substring(0, 10)}
                        </p>
                      </div>
                      {/* <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Monitor size={16} className="mr-2" /> Dashboard
                      </Link> */}
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" /> Đăng xuất
                      </button>
                    </div>
                  )}
                  {isUserMenuOpen && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    ></div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-slate-600 hover:text-blue-600 font-medium text-sm"
                >
                  <LogIn size={18} className="mr-1.5" />
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link to="/chatbot" className="mr-4 p-2 text-purple-600">
              <Bot size={24} />
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="px-4 py-3 border-b border-slate-100">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="w-full pl-4 pr-10 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-slate-400"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user && (
              <div className="px-3 py-2 mb-2 bg-slate-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200 mr-3">
                    {user.fullName
                      ? user.fullName.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <NavLink
              to="/chatbot"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-base font-bold ${
                  isActive
                    ? "bg-purple-50 text-purple-700"
                    : "text-purple-600 hover:bg-purple-50"
                }`
              }
            >
              <Sparkles size={18} className="mr-2" />
              AI Trợ lý (New)
            </NavLink>
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={mobileNavLinkClass}
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/category/excel"
              onClick={() => setIsOpen(false)}
              className={mobileNavLinkClass}
            >
              Excel
            </NavLink>
            <NavLink
              to="/category/word"
              onClick={() => setIsOpen(false)}
              className={mobileNavLinkClass}
            >
              Word
            </NavLink>
            <NavLink
              to="/category/powerpoint"
              onClick={() => setIsOpen(false)}
              className={mobileNavLinkClass}
            >
              PowerPoint
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={mobileNavLinkClass}
            >
              Giới thiệu
            </NavLink>

            {user ? (
              <>
                {/* <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>Dashboard</NavLink> */}
                <button
                  onClick={handleSignOut}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-4 px-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
