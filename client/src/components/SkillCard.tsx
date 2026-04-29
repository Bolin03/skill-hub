// SkillCard Component
// Design: Linear/Notion style - horizontal card with 56×56 rounded-square icon, hover lift effect
// Image spec: 56×56px, border-radius 8px (rounded-lg)
import { useState } from "react";
import { useLocation } from "wouter";
import { Skill } from "@/lib/mockData";
import { useSkills } from "@/contexts/SkillContext";
import { useAuth } from "@/contexts/AuthContext";

interface SkillCardProps {
  skill: Skill;
}

function formatNumber(n: number): string {
  if (n >= 10000) return (n / 10000).toFixed(1) + "w";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

export default function SkillCard({ skill }: SkillCardProps) {
  const [, navigate] = useLocation();
  const { getInteraction, toggleLike, toggleFavorite } = useSkills();
  const { isLoggedIn, setShowLoginModal } = useAuth();
  const interaction = getInteraction(skill.id);

  const [likeAnimating, setLikeAnimating] = useState(false);
  const [favAnimating, setFavAnimating] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) { setShowLoginModal(true); return; }
    setLikeAnimating(true);
    setTimeout(() => setLikeAnimating(false), 400);
    toggleLike(skill.id, () => setShowLoginModal(true));
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) { setShowLoginModal(true); return; }
    setFavAnimating(true);
    setTimeout(() => setFavAnimating(false), 400);
    toggleFavorite(skill.id, () => setShowLoginModal(true));
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/skill/${skill.id}`);
  };

  return (
    <div
      onClick={() => navigate(`/skill/${skill.id}`)}
      className="group bg-white border border-gray-100 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-gray-200"
    >
      {/* Top row: icon + title + category badge */}
      <div className="flex items-start gap-3 mb-3">
        {/* 56×56 rounded-square icon */}
        <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={skill.coverImage}
            alt={skill.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title + category + tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-gray-900 text-[15px] leading-snug group-hover:text-blue-600 transition-colors truncate">
              {skill.name}
            </h3>
            <span className="flex-shrink-0 px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-medium rounded-full">
              {skill.category}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {skill.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
        {skill.description}
      </p>

      {/* Author */}
      <div className="flex items-center gap-1.5 mb-3">
        <img src={skill.authorAvatar} alt={skill.author} className="w-4 h-4 rounded-full" />
        <span className="text-xs text-gray-400">{skill.author}</span>
        <span className="text-xs text-gray-300">·</span>
        <span className="text-xs text-gray-400">v{skill.version}</span>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {/* Downloads */}
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {formatNumber(interaction.downloads)}
          </span>
          {/* Heat */}
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c0 0-4 4-4 8 0 2.21 1.79 4 4 4s4-1.79 4-4c0-4-4-8-4-8z"/>
            </svg>
            {formatNumber(skill.heat)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-xs transition-colors ${
              interaction.liked ? "text-red-500" : "text-gray-400 hover:text-red-400"
            }`}
          >
            <span className={`transition-transform duration-200 ${likeAnimating ? "scale-150" : "scale-100"}`}>
              {interaction.liked ? "❤️" : "🤍"}
            </span>
            <span>{formatNumber(interaction.likes)}</span>
          </button>

          {/* Favorite */}
          <button
            onClick={handleFavorite}
            className={`flex items-center gap-1 text-xs transition-colors ${
              interaction.favorited ? "text-yellow-500" : "text-gray-400 hover:text-yellow-400"
            }`}
          >
            <span className={`transition-transform duration-200 ${favAnimating ? "scale-150" : "scale-100"}`}>
              {interaction.favorited ? "⭐" : "☆"}
            </span>
            <span>{formatNumber(interaction.favorites)}</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="px-2.5 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            下载
          </button>
        </div>
      </div>
    </div>
  );
}
