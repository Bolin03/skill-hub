// SkillListLayout Component
// Shared layout for Search Results and Popular Skills pages
// Design: Left filter sidebar + right card grid
import { useState, useMemo } from "react";
import { Skill, CATEGORIES } from "@/lib/mockData";
import SkillCard from "@/components/SkillCard";
import SearchBar from "@/components/SearchBar";
import { useLocation } from "wouter";

interface SkillListLayoutProps {
  title: string;
  subtitle?: string;
  skills: Skill[];
  defaultQuery?: string;
}

type SortKey = "downloads" | "heat" | "likes" | "newest";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "downloads", label: "下载量" },
  { key: "heat", label: "热度" },
  { key: "likes", label: "点赞数" },
  { key: "newest", label: "最新" },
];

export default function SkillListLayout({ title, subtitle, skills, defaultQuery = "" }: SkillListLayoutProps) {
  const [sortBy, setSortBy] = useState<SortKey>("downloads");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState(defaultQuery);
  const [, navigate] = useLocation();

  const filteredAndSorted = useMemo(() => {
    let result = [...skills];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (selectedCategory !== "全部") {
      result = result.filter(s => s.category === selectedCategory);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "downloads": return b.downloads - a.downloads;
        case "heat": return b.heat - a.heat;
        case "likes": return b.likes - a.likes;
        case "newest": return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default: return 0;
      }
    });

    return result;
  }, [skills, searchQuery, selectedCategory, sortBy]);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <SearchBar defaultValue={searchQuery} onSearch={handleSearch} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-20">
              {/* Sort */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">排序方式</h3>
                <div className="space-y-1">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setSortBy(opt.key)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        sortBy === opt.key
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">分类筛选</h3>
                <div className="space-y-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Right - Card Grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filters */}
            <div className="lg:hidden mb-4 flex gap-2 overflow-x-auto pb-2">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setSortBy(opt.key)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    sortBy === opt.key ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <div className="w-px bg-gray-200 mx-1" />
              {CATEGORIES.slice(0, 5).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === cat ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Result Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                共 <span className="font-semibold text-gray-900">{filteredAndSorted.length}</span> 个 Skill
                {searchQuery && <span> · 搜索 "<span className="text-blue-600">{searchQuery}</span>"</span>}
              </p>
            </div>

            {/* Grid */}
            {filteredAndSorted.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredAndSorted.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">未找到相关 Skill</h3>
                <p className="text-sm text-gray-500">尝试调整搜索词或筛选条件</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
