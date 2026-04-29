import React, { createContext, useContext, useState, useCallback } from "react";
import { MOCK_USER } from "@/lib/mockData";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  mySkills: string[];
  favorites: string[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  toggleFavorite: (skillId: string) => void;
  isFavorited: (skillId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = useCallback(() => {
    setUser(MOCK_USER);
    setShowLoginModal(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const toggleFavorite = useCallback((skillId: string) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return prev;
      const isFav = prev.favorites.includes(skillId);
      return {
        ...prev,
        favorites: isFav
          ? prev.favorites.filter(id => id !== skillId)
          : [...prev.favorites, skillId],
      };
    });
  }, [user]);

  const isFavorited = useCallback((skillId: string) => {
    return user?.favorites.includes(skillId) ?? false;
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      showLoginModal,
      setShowLoginModal,
      toggleFavorite,
      isFavorited,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
