"use client";
import {
  ReactElement,
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";

// Type definitions for useAuthContext
type User = {
  name: string;
  photoURL: string;
};
type AuthProviderType = ({ children }: { children: ReactNode }) => ReactElement;
type Login = (email: string, password: string) => Promise<User>;
type Signup = (email: string, password: string) => Promise<User>;
type ContextValue = {
  currentUser: User | null;
  login: Login;
  // signup: Signup;
  logout: () => Promise<boolean>;
  // resetPassword: (email: string) => Promise<boolean>;
  // updateEmail: (email: string) => Promise<boolean> | null;
  // updatePassword: (password: string) => Promise<boolean> | null;
  // verifyEmail: () => Promise<boolean> | null;
};

// Create the context
const AuthContext = createContext<ContextValue | undefined>(undefined);

// Use the context
const useAuthContext = (): ContextValue => {
  return useContext(AuthContext) as ContextValue;
};

// Create the provider
const AuthProvider: AuthProviderType = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentUser({
      name: "Karuppusamy",
      photoURL: "",
    });
    setLoading(false);
  }, []);

  const login: Login = async () => {
    const user = {
      name: "Karuppusamy",
      photoURL: "",
    };
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    return true;
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  // Return the provider
  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
export default AuthContext;
