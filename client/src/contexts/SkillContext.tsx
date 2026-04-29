import React, { createContext, useContext, useState, useCallback } from "react";
import { MOCK_SKILLS, Skill } from "@/lib/mockData";

interface SkillInteraction {
  likes: number;
  favorites: number;
  downloads: number;
  liked: boolean;
  favorited: boolean;
}

interface SkillContextType {
  skills: Skill[];
  interactions: Record<string, SkillInteraction>;
  toggleLike: (skillId: string, requireLogin: () => void) => void;
  toggleFavorite: (skillId: string, requireLogin: () => void) => void;
  incrementDownload: (skillId: string) => void;
  getInteraction: (skillId: string) => SkillInteraction;
}

const SkillContext = createContext<SkillContextType | null>(null);

export function SkillProvider({ children }: { children: React.ReactNode }) {
  const [skills] = useState<Skill[]>(MOCK_SKILLS);
  const [interactions, setInteractions] = useState<Record<string, SkillInteraction>>(() => {
    const init: Record<string, SkillInteraction> = {};
    MOCK_SKILLS.forEach(s => {
      init[s.id] = {
        likes: s.likes,
        favorites: s.favorites,
        downloads: s.downloads,
        liked: false,
        favorited: false,
      };
    });
    return init;
  });

  const toggleLike = useCallback((skillId: string, requireLogin: () => void) => {
    // Check login via callback
    setInteractions(prev => {
      const cur = prev[skillId];
      if (!cur) return prev;
      return {
        ...prev,
        [skillId]: {
          ...cur,
          liked: !cur.liked,
          likes: cur.liked ? cur.likes - 1 : cur.likes + 1,
        },
      };
    });
  }, []);

  const toggleFavorite = useCallback((skillId: string, requireLogin: () => void) => {
    setInteractions(prev => {
      const cur = prev[skillId];
      if (!cur) return prev;
      return {
        ...prev,
        [skillId]: {
          ...cur,
          favorited: !cur.favorited,
          favorites: cur.favorited ? cur.favorites - 1 : cur.favorites + 1,
        },
      };
    });
  }, []);

  const incrementDownload = useCallback((skillId: string) => {
    setInteractions(prev => {
      const cur = prev[skillId];
      if (!cur) return prev;
      return {
        ...prev,
        [skillId]: { ...cur, downloads: cur.downloads + 1 },
      };
    });
  }, []);

  const getInteraction = useCallback((skillId: string): SkillInteraction => {
    return interactions[skillId] ?? { likes: 0, favorites: 0, downloads: 0, liked: false, favorited: false };
  }, [interactions]);

  return (
    <SkillContext.Provider value={{ skills, interactions, toggleLike, toggleFavorite, incrementDownload, getInteraction }}>
      {children}
    </SkillContext.Provider>
  );
}

export function useSkills() {
  const ctx = useContext(SkillContext);
  if (!ctx) throw new Error("useSkills must be used within SkillProvider");
  return ctx;
}
