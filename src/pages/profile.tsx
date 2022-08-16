import Layouts from "layouts";
import Private from "layouts/Private";
import { useApiData } from "hooks";
import { useAppContext } from "context";
import { Loader } from "components/core";
import { Avatar } from "@mui/material";
const Profile = () => {
  let { user } = useAppContext();

  const { data, loading } = useApiData(`/api/user/${user?._id}`);

  const favorites = useApiData(`/api/user/${user?._id}/favorites`);

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen items-center justify-center ">
          <Loader height={400} width={400} />
        </div>
      ) : (
        <Private>
          <Layouts title="Profile">
            <section className="w-full py-12 bg-white dark:bg-gray-900  ">
              <div className="flex flex-col my-container  border border-gray-300/20 w-full rounded-3xl bg-gray-100/50 dark:bg-gray-800/70 ">
                <div className="flex w-full gap-8 items-center py-3 border-b border-gray-300/20 px-8 ">
                  <span className="text-base font-semibold text-black dark:text-white tracking-wide">
                    Details
                  </span>
                  <span className="text-base font-semibold text-black dark:text-gray-400 tracking-wide">
                    Password & Security
                  </span>
                </div>
                <div className="w-full p-8  flex">
                  <div className="w-full md:w-1/6 flex justify-center ">
                    <div>
                      <Avatar
                        alt={data?.data?.userName}
                        className="relative !h-[7rem] !w-[7rem]   !overflow-hidden"
                      />
                    </div>
                  </div>
                  <div className="w-full gap-4 flex flex-col md:w-5/6">
                    <span className="text-lg font-semibold text-black dark:text-white tracking-wide">
                      Info
                    </span>
                    <span className="text-sm gap-1 flex flex-col font-semibold text-black dark:text-white tracking-wide">
                      <span>Name</span>
                      <span className="dark:text-gray-400">
                        {data?.data?.name}{" "}
                      </span>
                    </span>
                    <span className="text-sm gap-1 flex flex-col font-semibold text-black dark:text-white tracking-wide">
                      <span>Email</span>
                      <span className="dark:text-gray-400">
                        {data?.data?.email}{" "}
                      </span>
                    </span>
                    <span className="text-sm gap-1 flex flex-col font-semibold text-black dark:text-white tracking-wide">
                      <span>Phone</span>
                      <span className="dark:text-gray-400">
                        {data?.data?.country && " + " + data?.data?.country}
                        {data?.data?.phone}
                      </span>
                    </span>
                    <span className="text-sm gap-1 flex flex-col font-semibold text-black dark:text-white tracking-wide">
                      <span>Joined on</span>
                      <span className="dark:text-gray-400">
                        {new Date(data?.data?.created_at).toDateString()}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex my-container py-8 flex-col">
                <div className="text-lg font-semibold text-black dark:text-white tracking-wide">
                  Favorites
                </div>
                {favorites?.data?.data?.favoriteShow?.length > 0 ? (
                  ""
                ) : (
                  <h3 className="font-medium tracking-wide text-lg border border-teal-500 text-black dark:text-white w-fit rounded-full p-2 mt-8 ">
                    No favorites
                  </h3>
                )}

                <div className="flex"></div>
              </div>
            </section>
          </Layouts>
        </Private>
      )}
    </>
  );
};

export default Profile;
