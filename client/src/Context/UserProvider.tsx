import React, { createContext, useContext, ReactNode } from "react";
import { useGetMeQuery } from "../services/UsersApi";
import Spinner from "../components/Spinner";
import { GetMeResponse } from "../types/UserType";


const UserContext = createContext<GetMeResponse | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: user, isLoading } = useGetMeQuery({});

  if (isLoading) return <Spinner />;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = (): GetMeResponse => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
