// Home Page
// Design: Linear/Notion style - clean hero with large search bar, two entry cards below
// Hero background: subtle tech circuit pattern, dark text on light background
import { useLocation } from "wouter";
import SearchBar from "@/components/SearchBar";
import { MOCK_SKILLS } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663606961907/68YoGpKzp6v5CcvrUggY9c/hero-bg-9VjW3E7CNUZgKzeipaYaGg.webp";
const POPULAR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663606961907/68YoGpKzp6v5CcvrUggY9c/popular-skills-card-GTAaN8TQA9oNe6WarYT6kh.webp";
const UPLOAD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663606961907/68YoGpKzp6v5CcvrUggY9c/upload-skill-card-LNFKAa7JtCp5SBUG7ShW9h.webp";

const STATS = [
  { label: "已发布 Skills", value: "2,400+" },
  { label: "开发者", value: "18,000+" },
  { label: "总下载量", value: "1.2M+" },
  { label: "分类", value: "32" },
];

export default function Home() {
  const [, navigate] = useLocation();
  const { isLoggedIn, setShowLoginModal } = useAuth();

  const totalDownloads = MOCK_SKILLS.reduce((s, sk) => s + sk.downloads, 0);

  const handlePublishClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      navigate("/dashboard?tab=publish");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-medium text-blue-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Agent 能力生态平台
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
            发现、分享与管理
            <br />
            <span className="text-blue-600">Agent Skills</span>
          </h1>

          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            GeniusNexus 为 Agent 生态提供标准化、可复用的能力接入方式。
            <br className="hidden sm:block" />
            上传你的 Skill，让全球开发者使用。
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar size="large" />
          </div>

          {/* Hot Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-gray-400">热门搜索：</span>
            {["网络搜索", "代码执行", "浏览器自动化", "图像识别", "数据分析"].map(tag => (
              <button
                key={tag}
                onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                className="px-2.5 py-1 bg-white/80 border border-gray-200 text-xs text-gray-600 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative bg-white/80 backdrop-blur-sm border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two Entry Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Popular Skills Card */}
          <div
            onClick={() => navigate("/popular")}
            className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="h-52 overflow-hidden bg-blue-50">
              <img
                src={POPULAR_IMG}
                alt="热门 Skills"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔥</span>
                <h2 className="text-xl font-bold text-gray-900">热门 Skill 展示</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                浏览社区中最受欢迎的 Skills，按下载量、热度排序，一键下载即可为你的 Agent 赋能。
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{MOCK_SKILLS.length}+ Skills</span>
                  <span>{(totalDownloads / 10000).toFixed(0)}w+ 下载</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                  浏览全部
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Hover border accent */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>

          {/* Upload Skill Card */}
          <div
            onClick={handlePublishClick}
            className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="h-52 overflow-hidden bg-emerald-50">
              <img
                src={UPLOAD_IMG}
                alt="上传 Skill"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🚀</span>
                <h2 className="text-xl font-bold text-gray-900">Skill 上传与发布</h2>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                将你开发的 Skill 分享给社区。支持拖拽上传、填写元信息，一键发布到 GeniusNexus 生态。
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>3 步完成发布</span>
                  <span>支持 zip / 文件夹</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium group-hover:gap-2 transition-all">
                  立即发布
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Hover border accent */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>
        </div>
      </section>

      {/* Featured Skills Preview */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">精选 Skills</h2>
            <p className="text-sm text-gray-500 mt-0.5">社区最受欢迎的能力</p>
          </div>
          <button
            onClick={() => navigate("/popular")}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            查看全部
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_SKILLS.sort((a, b) => b.downloads - a.downloads).slice(0, 6).map(skill => (
            <div
              key={skill.id}
              onClick={() => navigate(`/skill/${skill.id}`)}
              className="group flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl cursor-pointer hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-200"
            >
              <img
                src={skill.coverImage}
                alt={skill.name}
                className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                style={{ width: 56, height: 56, borderRadius: 8 }}
              />
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-xs text-gray-500 truncate mt-0.5">{skill.description.slice(0, 40)}...</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">⬇ {(skill.downloads / 1000).toFixed(0)}k</span>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-400">v{skill.version}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
