import React, { createContext, useContext, useState, useEffect } from 'react';

// Default admin credentials - In a real app, these would be stored securely
const DEFAULT_ADMIN = {
  email: 'admin@luxe.com',
  password: 'admin123'
};

interface AdminContextType {
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateAdminCredentials: (email: string, currentPassword: string, newPassword?: string) => Promise<boolean>;
}

interface AdminProviderProps {
  children: React.ReactNode;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: AdminProviderProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState(DEFAULT_ADMIN);

  useEffect(() => {
    // Check for existing admin session
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAdmin(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Compare with stored admin credentials
      const isValid = email === adminCredentials.email && password === adminCredentials.password;
      
      if (isValid) {
        setIsAdmin(true);
        localStorage.setItem('adminToken', btoa(`${email}:${Date.now()}`));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('adminToken');
  };

  const updateAdminCredentials = async (email: string, currentPassword: string, newPassword?: string) => {
    try {
      // Verify current password
      if (currentPassword !== adminCredentials.password) {
        return false;
      }

      // Update credentials
      setAdminCredentials({
        email: email || adminCredentials.email, // Keep current email if new one not provided
        password: newPassword || adminCredentials.password // Keep current password if new one not provided
      });

      // Update successful
      return true;
    } catch (error) {
      console.error('Failed to update admin credentials:', error);
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, updateAdminCredentials }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}