// Skill Detail Page
// Design: Clean detail page with 56×56 icon, metadata table, and tabbed content
// Image spec: 56×56px rounded-square icon (no large cover banner)
import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { MOCK_SKILLS } from "@/lib/mockData";
import { useSkills } from "@/contexts/SkillContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

function formatNumber(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "w";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

export default function SkillDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { getInteraction, toggleLike, toggleFavorite, incrementDownload } = useSkills();
  const { isLoggedIn, setShowLoginModal } = useAuth();

  const [activeTab, setActiveTab] = useState<"detail" | "download">("detail");
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [favAnimating, setFavAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  const skill = MOCK_SKILLS.find(s => s.id === id);

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Skill 不存在</h2>
          <button onClick={() => navigate("/popular")} className="text-blue-600 hover:underline text-sm">
            返回热门列表
          </button>
        </div>
      </div>
    );
  }

  const interaction = getInteraction(skill.id);

  const handleLike = () => {
    if (!isLoggedIn) { setShowLoginModal(true); return; }
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 400);
    toggleLike(skill.id, () => setShowLoginModal(true));
  };

  const handleFavorite = () => {
    if (!isLoggedIn) { setShowLoginModal(true); return; }
    setFavAnimating(true);
    setTimeout(() => setFavAnimating(false), 400);
    toggleFavorite(skill.id, () => setShowLoginModal(true));
  };

  const handleDownload = () => {
    incrementDownload(skill.id);
    toast.success(`已开始下载 ${skill.name} v${skill.version}`);
  };

  const curlCommand = `curl -L https://skillhub.io/api/skills/${skill.id}/download -o ${skill.name.toLowerCase().replace(/\s+/g, '-')}.zip`;

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => navigate(-1 as any)}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Card: icon (56×56) + info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-6 shadow-sm">
          {/* Top: icon + name + badges */}
          <div className="flex items-start gap-5 mb-5">
            {/* 56×56 rounded-square icon */}
            <div
              className="flex-shrink-0 overflow-hidden bg-gray-100 border border-gray-100"
              style={{ width: 56, height: 56, borderRadius: 8 }}
            >
              <img
                src={skill.coverImage}
                alt={skill.name}
                style={{ width: 56, height: 56, objectFit: "cover" }}
              />
            </div>

            {/* Name + badges */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{skill.name}</h1>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                  {skill.category}
                </span>
                <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                  ✓ 已发布
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {skill.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                #{tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{skill.longDescription}</p>

          {/* Author */}
          <div className="flex items-center gap-2 mb-6">
            <img src={skill.authorAvatar} alt={skill.author} className="w-6 h-6 rounded-full" />
            <span className="text-sm text-gray-500">
              by <span className="font-medium text-gray-700">{skill.author}</span>
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-500">更新于 {skill.updatedAt}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              一键下载
            </button>

            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-all ${
                interaction.liked
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-500"
              }`}
            >
              <span className={`transition-transform duration-200 ${likeAnimating ? "scale-150" : "scale-100"}`}>
                {interaction.liked ? "❤️" : "🤍"}
              </span>
              {formatNumber(interaction.likes)}
            </button>

            <button
              onClick={handleFavorite}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-all ${
                interaction.favorited
                  ? "border-yellow-200 bg-yellow-50 text-yellow-600"
                  : "border-gray-200 text-gray-600 hover:border-yellow-200 hover:text-yellow-500"
              }`}
            >
              <span className={`transition-transform duration-200 ${favAnimating ? "scale-150" : "scale-100"}`}>
                {interaction.favorited ? "⭐" : "☆"}
              </span>
              {formatNumber(interaction.favorites)}
            </button>
          </div>
        </div>

        {/* Metadata Table */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">元数据</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { label: "版本号", value: `v${skill.version}`, icon: "🏷️" },
              { label: "下载量", value: formatNumber(interaction.downloads), icon: "⬇️" },
              { label: "热度", value: formatNumber(skill.heat), icon: "🔥" },
              { label: "点赞数", value: formatNumber(interaction.likes), icon: "❤️" },
              { label: "收藏数", value: formatNumber(interaction.favorites), icon: "⭐" },
            ].map(item => (
              <div key={item.label} className="text-center p-3 bg-gray-50 rounded-xl">
                <div className="text-xl mb-1">{item.icon}</div>
                <div className="text-lg font-bold text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-100">
            {[
              { key: "detail", label: "详情", icon: "📋" },
              { key: "download", label: "下载方式", icon: "⬇️" },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "detail" ? (
              <div className="space-y-8 animate-in fade-in duration-200">
                {/* Features */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs">✦</span>
                    功能说明
                  </h3>
                  <ul className="space-y-2">
                    {skill.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Usage Example */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 bg-purple-100 text-purple-600 rounded flex items-center justify-center text-xs">{"</>"}</span>
                    使用示例
                  </h3>
                  <pre className="bg-gray-900 text-gray-100 rounded-xl p-4 text-sm overflow-x-auto leading-relaxed">
                    <code>{skill.usageExample}</code>
                  </pre>
                </div>

                {/* Input/Output */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded flex items-center justify-center text-xs">⇄</span>
                    输入输出说明
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">输入参数</h4>
                      <div className="space-y-2">
                        {skill.inputOutput.inputs.map(inp => (
                          <div key={inp.name} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                            <code className="text-xs font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">{inp.name}</code>
                            <div>
                              <span className="text-xs text-gray-400">{inp.type}</span>
                              <p className="text-xs text-gray-600 mt-0.5">{inp.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">输出参数</h4>
                      <div className="space-y-2">
                        {skill.inputOutput.outputs.map(out => (
                          <div key={out.name} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                            <code className="text-xs font-mono text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{out.name}</code>
                            <div>
                              <span className="text-xs text-gray-400">{out.type}</span>
                              <p className="text-xs text-gray-600 mt-0.5">{out.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Install Steps */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 bg-orange-100 text-orange-600 rounded flex items-center justify-center text-xs">⚙</span>
                    安装步骤
                  </h3>
                  <ol className="space-y-3">
                    {skill.installSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Changelog */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-5 h-5 bg-gray-100 text-gray-600 rounded flex items-center justify-center text-xs">📝</span>
                    版本历史
                  </h3>
                  <div className="space-y-3">
                    {skill.changelog.map((log, i) => (
                      <div key={i} className="border-l-2 border-blue-200 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">v{log.version}</span>
                          <span className="text-xs text-gray-400">{log.date}</span>
                        </div>
                        <ul className="space-y-0.5">
                          {log.changes.map((c, j) => (
                            <li key={j} className="text-xs text-gray-600 flex items-start gap-1.5">
                              <span className="text-blue-400 mt-0.5">•</span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* One-click download */}
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">一键下载（推荐）</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        点击下方按钮，直接下载 <strong>{skill.name}</strong> v{skill.version} 的完整 zip 包。
                        解压后按照安装步骤配置即可使用。
                      </p>
                      <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        下载 {skill.name} v{skill.version}
                      </button>
                    </div>
                  </div>
                </div>

                {/* curl download */}
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">命令行下载</h3>
                      <p className="text-sm text-gray-600 mb-3">使用 curl 命令直接下载到本地：</p>
                      <div className="relative">
                        <pre className="bg-gray-900 text-green-400 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed">
                          {curlCommand}
                        </pre>
                        <button
                          onClick={handleCopy}
                          className="absolute top-2 right-2 px-2.5 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-lg transition-colors flex items-center gap-1"
                        >
                          {copied ? (
                            <>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              已复制
                            </>
                          ) : (
                            <>
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              复制
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package info */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "文件格式", value: "ZIP" },
                    { label: "版本号", value: `v${skill.version}` },
                    { label: "许可证", value: "MIT" },
                  ].map(item => (
                    <div key={item.label} className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-sm font-semibold text-gray-900">{item.value}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
