import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const userJson = localStorage.getItem('currentUser');
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error("Could not parse user from localStorage", error);
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);
  
  // Mock authentication functions
  const login = async (email: string, pass: string): Promise<void> => {
    // In a real app, you'd make an API call here.
    if (email.includes('@') && pass.length > 5) {
      const mockUser = { name: 'Alex Doe', email: email };
      setCurrentUser(mockUser);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid credentials'));
  };

  const signup = async (name: string, email: string, pass: string): Promise<void> => {
    // In a real app, you'd make an API call to register the user.
    if (name && email.includes('@') && pass.length > 5) {
      const newUser = { name, email };
      setCurrentUser(newUser);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid signup details'));
  };

  const logout = () => {
    setCurrentUser(null);
  };
  
  const value = {
    currentUser,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
