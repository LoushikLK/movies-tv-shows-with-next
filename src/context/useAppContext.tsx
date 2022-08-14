import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({});

export const AppContextProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [refetchUser, setRefetchUser] = useState(false);
  const [user, setUser] = useState<any>({
    _id: "",
    name: "",
    userName: "",
    email: "",
    phone: "",
    country: "",
  });

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);

      (async () => {
        try {
          let response = await fetch("/api/user/self");
          let user = await response.json();
          console.log(user);
          setUser(user);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [refetchUser]);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        refetchUser: () => {
          setRefetchUser((prev: any) => {
            return !prev;
          });
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const { user, refetchUser, loading } = useContext<any>(AppContext);

  return {
    user,
    refetchUser,
    loading,
  };
};

export default useAppContext;
