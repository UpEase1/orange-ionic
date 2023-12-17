import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for your user data
export type UserDataType = {
  displayName?: string;
  id?: string;
  userPrincipalName?: string;
  faxNumber?: string;
  jobTitle?: string;
};

// Define the type for your context value
type UserContextType = {
  userData: UserDataType;
  setUserData: (userData: UserDataType) => void;
};

// Create the context with a default value
const UserContext = createContext<UserContextType>({
  userData: {},
  setUserData: () => {},
});

// Define the type for the provider props
type UserProviderProps = {
  children: ReactNode;
};

// Create the UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataType>({});
  return (
    <UserContext.Provider value={{userData,setUserData}}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the user context
export const useUser = () => useContext(UserContext) as UserContextType;
