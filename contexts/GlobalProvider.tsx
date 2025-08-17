import { getCurrentUser } from "@lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "types/common";

type GlobalContextType = {
  updateIsLoggedIn: (value: boolean) => void;
  updateUser: (newUser: any) => void;
  updateIsLoading: (value: boolean) => void;
  isLoggedIn: boolean;
  user: UserType | null;
  isLoading: boolean;
};

const globalContext = createContext<GlobalContextType>({
  updateIsLoggedIn: (value: boolean) => {},
  updateUser: () => {},
  updateIsLoading: () => {},
  isLoggedIn: false,
  user: null,
  isLoading: true,
});

export const useGlobal = () => {
  try {
    const context = useContext(globalContext);

    return context;
  } catch (err) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
};

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<GlobalContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const updateIsLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };

  const updateUser = (newUser: any) => {
    setUser(newUser);
  };

  const updateIsLoading = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <globalContext.Provider
      value={{
        updateIsLoggedIn,
        updateUser,
        updateIsLoading,
        isLoggedIn,
        user,
        isLoading,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
