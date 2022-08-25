import { Loader } from "components/core";
import { useAppContext } from "context";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
  }, [user, loading, router]);

  return (
    <main>
      {user?._id ? (
        children
      ) : (
        <div className="min-h-screen flex items-center justify-center ">
          <Loader height={400} width={400} />
        </div>
      )}
    </main>
  );
};

export default Private;
