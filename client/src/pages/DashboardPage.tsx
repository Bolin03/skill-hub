// Dashboard / Personal Center Page
// Design: Left sidebar nav + right content area, clean and minimal
import { useState, useMemo, useRef, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useSkills } from "@/contexts/SkillContext";
import SkillCard from "@/components/SkillCard";

type Tab = "my-skills" | "publish" | "favorites";

function formatNumber(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "w";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("my-skills");
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();
  const search = useSearch();
  const { user, isLoggedIn, setShowLoginModal } = useAuth();
  const { skills } = useSkills();

  // Read URL param ?tab=publish to auto-activate publish tab
  useEffect(() => {
    const params = new URLSearchParams(search);
    const tab = params.get("tab");
    if (tab === "publish" || tab === "my-skills" || tab === "favorites") {
      setActiveTab(tab as Tab);
    }
  }, [search]);

  // All hooks must be called before any conditional returns
  const mySkills = useMemo(() => {
    if (!user) return [];
    const mySkillIds = user.mySkills ?? [];
    return skills.filter(s => mySkillIds.includes(s.id));
  }, [skills, user]);

  const favoriteSkills = useMemo(() => {
    if (!user) return [];
    const favIds = user.favorites ?? [];
    return skills.filter(s => favIds.includes(s.id));
  }, [skills, user]);

  const filteredMySkills = useMemo(() => {
    if (!searchQuery.trim()) return mySkills;
    const q = searchQuery.toLowerCase();
    return mySkills.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }, [mySkills, searchQuery]);

  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favoriteSkills;
    const q = searchQuery.toLowerCase();
    return favoriteSkills.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }, [favoriteSkills, searchQuery]);

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white rounded-2xl border border-gray-100 p-12 shadow-sm max-w-sm mx-4">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">请先登录</h2>
          <p className="text-sm text-gray-500 mb-6">登录后即可访问个人中心</p>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
          >
            立即登录
          </button>
        </div>
      </div>
    );
  }

  const NAV_ITEMS: { key: Tab; label: string; icon: string; count?: number }[] = [
    { key: "my-skills", label: "我的 Skills", icon: "🧩", count: mySkills.length },
    { key: "publish", label: "发布 Skill", icon: "🚀" },
    { key: "favorites", label: "我的收藏", icon: "⭐", count: favoriteSkills.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0">
            {/* User Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md mb-3"
                />
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5 truncate w-full">{user?.email}</p>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50 w-full justify-center">
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900">{mySkills.length}</div>
                    <div className="text-xs text-gray-400">已发布</div>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900">{favoriteSkills.length}</div>
                    <div className="text-xs text-gray-400">已收藏</div>
                  </div>
                  <div className="w-px h-8 bg-gray-100" />
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900">
                      {formatNumber(mySkills.reduce((s, sk) => s + sk.downloads, 0))}
                    </div>
                    <div className="text-xs text-gray-400">总下载</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.key}
                  onClick={() => { setActiveTab(item.key); setSearchQuery(""); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === item.key
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>{item.icon}</span>
                    {item.label}
                  </span>
                  {item.count !== undefined && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      activeTab === item.key ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500"
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "publish" ? (
              // Embed upload flow
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-8 pt-8 pb-0">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">发布 Skill</h2>
                  <p className="text-sm text-gray-500">上传你的 Skill 并分享给社区</p>
                </div>
                <UploadInline />
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {activeTab === "my-skills" ? "我的 Skills" : "我的收藏"}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activeTab === "my-skills"
                        ? `共 ${mySkills.length} 个已发布 Skill`
                        : `共 ${favoriteSkills.length} 个收藏`}
                    </p>
                  </div>
                  {/* Search */}
                  <div className="relative w-56">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="搜索..."
                      className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {activeTab === "my-skills" && (
                    filteredMySkills.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filteredMySkills.map(skill => (
                          <SkillCard key={skill.id} skill={skill} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon="🧩"
                        title={searchQuery ? "未找到匹配的 Skill" : "还没有发布任何 Skill"}
                        desc={searchQuery ? "尝试其他关键词" : "点击左侧「发布 Skill」开始创建"}
                        action={!searchQuery ? { label: "立即发布", onClick: () => setActiveTab("publish") } : undefined}
                      />
                    )
                  )}

                  {activeTab === "favorites" && (
                    filteredFavorites.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filteredFavorites.map(skill => (
                          <SkillCard key={skill.id} skill={skill} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        icon="⭐"
                        title={searchQuery ? "未找到匹配的收藏" : "还没有收藏任何 Skill"}
                        desc={searchQuery ? "尝试其他关键词" : "在热门页面点击收藏按钮即可保存"}
                        action={!searchQuery ? { label: "去发现 Skills", onClick: () => navigate("/popular") } : undefined}
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, desc, action }: {
  icon: string;
  title: string;
  desc: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">{desc}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Inline upload component for dashboard (simplified)
function UploadInline() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", category: "", tags: "", version: "1.0.0" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isLoggedIn, setShowLoginModal } = useAuth();

  const simulateUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 80));
      setUploadProgress(i);
    }
    setUploading(false);
    const baseName = file.name.replace(/\.(zip|tar\.gz)$/, "").replace(/[-_]/g, " ");
    setForm(prev => ({ ...prev, name: prev.name || baseName }));
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) { setUploadedFile(file); await simulateUpload(file); }
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) { setShowLoginModal(true); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setStep(3);
  };

  const CATEGORIES = ["信息获取", "代码工具", "文件工具", "数据工具", "通信工具", "自动化工具", "AI 工具", "生产力工具"];

  return (
    <div className="p-8">
      {step === 1 && (
        <div>
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
              isDragging ? "border-blue-400 bg-blue-50" : uploadedFile ? "border-green-300 bg-green-50" : "border-gray-200 bg-gray-50"
            }`}
          >
            {uploading ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">上传中 {uploadedFile?.name}...</p>
                <div className="max-w-xs mx-auto bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            ) : uploadedFile ? (
              <div>
                <div className="text-3xl mb-2">✅</div>
                <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                <button onClick={() => setUploadedFile(null)} className="text-xs text-gray-400 hover:text-red-500 mt-1">重新选择</button>
              </div>
            ) : (
              <div>
                <div className="text-3xl mb-3">📦</div>
                <p className="text-sm text-gray-600">拖拽文件到此处，或</p>
                <input ref={fileInputRef} type="file" accept=".zip" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) { setUploadedFile(f); simulateUpload(f); } }} />
                <button onClick={() => fileInputRef.current?.click()} className="mt-2 text-sm text-blue-600 hover:underline">点击选择文件</button>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={() => setStep(2)} disabled={!uploadedFile || uploading} className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-40">
              下一步 →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill 名称 *</label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Skill 名称" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">版本号</label>
              <input type="text" value={form.version} onChange={e => setForm(p => ({ ...p, version: e.target.value }))} placeholder="1.0.0" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="">选择分类</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">标签（逗号分隔）</label>
            <input type="text" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="搜索, 网络, 信息获取" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">简短描述 *</label>
            <input type="text" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="一句话描述核心功能" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-700">← 上一步</button>
            <button onClick={handleSubmit} disabled={!form.name || !form.description || submitting} className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-40 flex items-center gap-2">
              {submitting ? "提交中..." : "提交发布 →"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">⏳</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">提交成功，审核中</h3>
          <p className="text-sm text-gray-500 mb-6">
            <strong>"{form.name}"</strong> 已提交，预计 1-3 工作日完成审核
          </p>
          <button onClick={() => { setStep(1); setUploadedFile(null); setForm({ name: "", description: "", category: "", tags: "", version: "1.0.0" }); }} className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
            继续上传
          </button>
        </div>
      )}
    </div>
  );
}


