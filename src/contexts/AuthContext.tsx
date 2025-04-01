
import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../data/diagramsData";
import { api } from "../services/api";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  hasRole: (role: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Check for existing user session on mount
  useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
  });

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await api.users.login(email, password);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    setLoading(true);
    try {
      const user = await api.users.register(name, email, password, role);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast({
        title: "Registration successful",
        description: `Welcome, ${user.name}!`,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: "Please check your input and try again",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const hasRole = (role: string | string[]) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
