// SearchBar Component
// Design: Large prominent search bar with rotating placeholder and autocomplete suggestions
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { HOT_SEARCH_TERMS, MOCK_SKILLS } from "@/lib/mockData";

interface SearchBarProps {
  defaultValue?: string;
  size?: "large" | "normal";
  onSearch?: (query: string) => void;
}

export default function SearchBar({ defaultValue = "", size = "normal", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  // Rotate placeholder hot search terms
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex(i => (i + 1) % HOT_SEARCH_TERMS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Generate suggestions based on input
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    const matched = MOCK_SKILLS
      .filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q)
      )
      .slice(0, 6)
      .map(s => s.name);
    setSuggestions(matched);
  }, [query]);

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery ?? query;
    if (!q.trim()) return;
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(q);
    } else {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") setShowSuggestions(false);
  };

  const isLarge = size === "large";

  return (
    <div className="relative w-full">
      <div className={`flex items-center gap-2 bg-white border-2 ${isLarge ? "border-gray-200 rounded-2xl shadow-lg" : "border-gray-200 rounded-xl shadow-sm"} focus-within:border-blue-400 focus-within:shadow-blue-100 focus-within:shadow-lg transition-all`}>
        {/* Search Icon */}
        <div className={`${isLarge ? "pl-5" : "pl-4"} text-gray-400`}>
          <svg className={`${isLarge ? "w-5 h-5" : "w-4 h-4"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder={`搜索 ${HOT_SEARCH_TERMS[placeholderIndex]}...`}
          className={`flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 ${isLarge ? "py-4 text-base" : "py-2.5 text-sm"}`}
        />

        {/* Clear */}
        {query && (
          <button
            onClick={() => { setQuery(""); setSuggestions([]); inputRef.current?.focus(); }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={() => handleSearch()}
          className={`${isLarge ? "px-6 py-4 text-sm" : "px-4 py-2.5 text-sm"} bg-blue-600 text-white font-medium rounded-r-xl hover:bg-blue-700 transition-colors whitespace-nowrap`}
          style={{ borderRadius: isLarge ? "0 14px 14px 0" : "0 10px 10px 0" }}
        >
          搜索
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-xl z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-50">
            <span className="text-xs text-gray-400 font-medium">搜索建议</span>
          </div>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onMouseDown={() => { setQuery(s); handleSearch(s); }}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
