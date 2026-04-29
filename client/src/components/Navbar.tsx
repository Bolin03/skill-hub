// Navbar Component
// Design: Linear/Notion style - clean top nav with logo, nav links, and user avatar
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";

export default function Navbar() {
  const { user, isLoggedIn, logout, setShowLoginModal } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [, navigate] = useLocation();

  const handlePublishClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      navigate("/dashboard?tab=publish");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold text-gray-900 text-[15px] tracking-tight">SkillHub</span>
            </Link>

            {/* Center Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              <Link href="/popular" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                热门 Skills
              </Link>
              <button onClick={handlePublishClick} className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                发布 Skill
              </button>
            </div>

            {/* Right: User */}
            <div className="flex items-center gap-3">
              {isLoggedIn && user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => { setDropdownOpen(false); navigate("/dashboard"); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        个人中心
                      </button>
                      <button
                        onClick={() => { setDropdownOpen(false); logout(); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        退出登录
                      </button>
                    </div>
                  )}
                  {dropdownOpen && (
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  登录
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <LoginModal />
    </>
  );
}
