// Upload Page - 3-step wizard for skill upload
// Design: Clean step wizard with drag-drop upload, form, and success state
import { useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

type Step = 1 | 2 | 3;

interface SkillForm {
  name: string;
  description: string;
  category: string;
  tags: string;
  version: string;
  longDescription: string;
}

const CATEGORIES = [
  "信息获取", "代码工具", "文件工具", "数据工具",
  "通信工具", "自动化工具", "AI 工具", "生产力工具",
];

export default function UploadPage() {
  const [step, setStep] = useState<Step>(1);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<SkillForm>({
    name: "",
    description: "",
    category: "",
    tags: "",
    version: "1.0.0",
    longDescription: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();
  const { isLoggedIn, setShowLoginModal } = useAuth();

  const simulateUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 80));
      setUploadProgress(i);
    }
    setUploading(false);
    // Auto-fill name from filename
    const baseName = file.name.replace(/\.(zip|tar\.gz)$/, "").replace(/[-_]/g, " ");
    setForm(prev => ({ ...prev, name: prev.name || baseName }));
  };

  const handleFileSelect = async (file: File) => {
    setUploadedFile(file);
    await simulateUpload(file);
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleFileSelect(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleSubmit = async () => {
    if (!isLoggedIn) { setShowLoginModal(true); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setStep(3);
  };

  const STEPS = [
    { num: 1, label: "上传文件" },
    { num: 2, label: "填写信息" },
    { num: 3, label: "提交发布" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回首页
          </button>
          <h1 className="text-2xl font-bold text-gray-900">发布 Skill</h1>
          <p className="text-sm text-gray-500 mt-1">将你的 Skill 分享给 Agent 生态社区</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step > s.num
                    ? "bg-green-500 text-white"
                    : step === s.num
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-400"
                }`}>
                  {step > s.num ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : s.num}
                </div>
                <span className={`text-xs mt-1.5 font-medium ${step === s.num ? "text-blue-600" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-20 sm:w-32 h-0.5 mx-2 mb-5 transition-colors ${step > s.num ? "bg-green-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: File Upload */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">上传 Skill 文件</h2>
            <p className="text-sm text-gray-500 mb-6">支持 .zip 压缩包或文件夹，文件大小不超过 100MB</p>

            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                isDragging
                  ? "border-blue-400 bg-blue-50 scale-[1.01]"
                  : uploadedFile
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 hover:border-gray-300 bg-gray-50"
              }`}
            >
              {uploading ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">正在上传 {uploadedFile?.name}...</p>
                  <div className="max-w-xs mx-auto bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400">{uploadProgress}%</p>
                </div>
              ) : uploadedFile ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{uploadedFile.name}</p>
                  <p className="text-xs text-gray-400">{(uploadedFile.size / 1024).toFixed(1)} KB · 上传完成</p>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    重新选择
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-14 h-14 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {isDragging ? "松开以上传文件" : "拖拽文件到此处"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">或点击下方按钮选择文件</p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Buttons */}
            {!uploadedFile && !uploading && (
              <div className="flex gap-3 mt-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".zip,.tar.gz"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
                <input
                  ref={folderInputRef}
                  type="file"
                  {...({ webkitdirectory: "" } as any)}
                  className="hidden"
                  onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  选择 zip 文件
                </button>
                <button
                  onClick={() => folderInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  选择文件夹
                </button>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(2)}
                disabled={!uploadedFile || uploading}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                下一步
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Fill Info */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">填写 Skill 信息</h2>
            <p className="text-sm text-gray-500 mb-6">完善信息有助于其他开发者发现和使用你的 Skill</p>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Skill 名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="例如：Web Search Pro"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Category + Version */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">分类</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="">选择分类</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">版本号</label>
                  <input
                    type="text"
                    value={form.version}
                    onChange={e => setForm(p => ({ ...p, version: e.target.value }))}
                    placeholder="1.0.0"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">标签</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                  placeholder="搜索、网络、信息获取（用逗号分隔）"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  简短描述 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="一句话描述 Skill 的核心功能（50字以内）"
                  maxLength={80}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">{form.description.length}/80</p>
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">详细描述</label>
                <textarea
                  value={form.longDescription}
                  onChange={e => setForm(p => ({ ...p, longDescription: e.target.value }))}
                  placeholder="详细介绍 Skill 的功能、适用场景、技术特点等..."
                  rows={4}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                上一步
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.description || submitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                {submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    提交中...
                  </>
                ) : (
                  <>
                    提交发布
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm text-center">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⏳</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">提交成功，审核中</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              你的 Skill <strong className="text-gray-900">"{form.name}"</strong> 已成功提交，
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              我们将在 1-3 个工作日内完成审核。审核通过后将通过邮件通知你。
            </p>

            {/* Status Timeline */}
            <div className="max-w-sm mx-auto text-left mb-8 space-y-3">
              {[
                { label: "文件上传", status: "done", time: "刚刚" },
                { label: "信息填写", status: "done", time: "刚刚" },
                { label: "提交审核", status: "done", time: "刚刚" },
                { label: "审核中", status: "current", time: "预计 1-3 工作日" },
                { label: "发布上线", status: "pending", time: "" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.status === "done" ? "bg-green-500" :
                    item.status === "current" ? "bg-orange-400" :
                    "bg-gray-200"
                  }`}>
                    {item.status === "done" && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {item.status === "current" && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      item.status === "done" ? "text-gray-700" :
                      item.status === "current" ? "text-orange-600" :
                      "text-gray-400"
                    }`}>{item.label}</span>
                    {item.time && <span className="text-xs text-gray-400">{item.time}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
              >
                查看我的 Skills
              </button>
              <button
                onClick={() => { setStep(1); setUploadedFile(null); setForm({ name: "", description: "", category: "", tags: "", version: "1.0.0", longDescription: "" }); }}
                className="px-6 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                继续上传
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
