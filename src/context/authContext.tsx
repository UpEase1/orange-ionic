import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Providers, ProviderState } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';

interface AuthContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
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


export const initializeAuthentication = async (clientId: string, scopes: string[], setTokenCallback: (token: string) => void): Promise<void> => {
  const provider = Providers.globalProvider;

  if (!provider) {
      console.error('Provider is not initialized');
      return Promise.reject('Provider is not initialized');
  }

  // Polling function to check provider state
  const checkProviderState = (): Promise<void> => {
      return new Promise((resolve, reject) => {
          const pollState = () => {
              if (provider.state === ProviderState.Loading) {
                  setTimeout(pollState, 1000); // Poll every second
                  console.log("polled for provider state");
              } else {
                  resolve();
              }
          };
          pollState();
      });
  };

  const handleAuthentication = async (): Promise<void> => {
      if (provider.state !== ProviderState.SignedIn) {
          return await provider.login!()
              .then(async () => await provider.getAccessTokenForScopes(scopes[2]))
              .then((accessToken) => {
                  setTokenCallback(accessToken);
              })
              .catch((error) => {
                  console.error('Error during authentication', error);
              });
      } else {
          return await provider.getAccessTokenForScopes(scopes[2])
              .then((accessToken) => {
                  setTokenCallback(accessToken);
              })
              .catch((error) => {
                console.error('Error during authentication', error);
            });
      }
  };

  return checkProviderState().then(handleAuthentication);
};


