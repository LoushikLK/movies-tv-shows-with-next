import { useAppContext } from "context";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Private = ({ children }: any) => {
  const { user, loading } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (loading) return;
      if (!user?._id) {
        router?.push("/login");
      }
    }

    return () => {
      mounted = false;
    };
  }, [user, loading]);

  return <main>{user?._id ? children : <></>}</main>;
};

export default Private;
