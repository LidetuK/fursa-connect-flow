import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';

interface AuthContextType {
  user: any | null;
  session: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('auth_token');
    if (token) {
      console.log('🔑 JWT Token:', token);
      console.log('📋 To decode: Go to https://jwt.io and paste the token above');
      apiClient.setToken(token);
      getProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const getProfile = async () => {
    try {
      const user = await apiClient.getProfile();
      setUser(user);
      setSession({ user });
    } catch (error) {
      console.error('Failed to get profile:', error);
      localStorage.removeItem('auth_token');
      apiClient.clearToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { access_token, user } = await apiClient.login(email, password);
      localStorage.setItem('auth_token', access_token);
      apiClient.setToken(access_token);
      setUser(user);
      setSession({ user });
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      const { access_token, user } = await apiClient.register(email, password, firstName, lastName);
      localStorage.setItem('auth_token', access_token);
      apiClient.setToken(access_token);
      setUser(user);
      setSession({ user });
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    localStorage.removeItem('auth_token');
    apiClient.clearToken();
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    login,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 