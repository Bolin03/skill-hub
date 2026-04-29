// Footer Component
// Design: Clean minimal footer with links and branding
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8L7 12L13 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold text-gray-900 text-[15px]">SkillHub</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              为 Agent 生态提供标准化、可复用的能力接入方式。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">探索</h4>
            <ul className="space-y-2">
              {[
                { label: "热门 Skills", href: "/popular" },
                { label: "搜索", href: "/search" },
                { label: "发布 Skill", href: "/upload" },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">开发者</h4>
            <ul className="space-y-2">
              {["文档", "API 参考", "SDK 下载", "更新日志"].map(item => (
                <li key={item}>
                  <span className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">关于</h4>
            <ul className="space-y-2">
              {["关于我们", "隐私政策", "服务条款", "联系我们"].map(item => (
                <li key={item}>
                  <span className="text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© 2024 SkillHub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-300">|</span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              系统正常运行
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
