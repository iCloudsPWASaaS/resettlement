"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: {
    id: string;
    email: string;
    role: string;
    name?: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    occupation?: string;
    bio?: string;
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }

    if (status === "authenticated" && session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email || "",
        role: session.user.role,
        name: session.user.name || undefined,
      });
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [session, status]);

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);