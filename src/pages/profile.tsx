import Layouts from "layouts";
import Image from "next/image";
import ProfileImg from "assets/profile.jpg";
const Profile = () => {
  return (
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
              <div className="relative h-[7rem] w-[7rem] rounded-full   overflow-hidden">
                <Image layout="fill" src={ProfileImg} objectFit="cover" />
              </div>
            </div>
            <div className="w-full gap-4 flex flex-col md:w-5/6">
              <span className="text-lg font-semibold text-black dark:text-white tracking-wide">
                Info
              </span>
              <span className="text-sm gap-1 flex flex-col font-semibold text-black dark:text-white tracking-wide">
                <span>Name</span>
                <span className="dark:text-gray-400">Loushik Giri </span>
              </span>
              <span className="text-sm gap-1 flex flex-col font-semibold text-black dark:text-white tracking-wide">
                <span>Email</span>
                <span className="dark:text-gray-400">l@g.com </span>
              </span>
              <span className="text-sm gap-1 flex flex-col font-semibold text-black dark:text-white tracking-wide">
                <span>Phone</span>
                <span className="dark:text-gray-400"> +1234567890 </span>
              </span>
              <span className="text-sm gap-1 flex flex-col font-semibold text-black dark:text-white tracking-wide">
                <span>Joined on</span>
                <span className="dark:text-gray-400">may 2020</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex my-container py-8 flex-col">
          <div className="text-lg font-semibold text-black dark:text-white tracking-wide">
            Favorites
          </div>

          <div className="flex"></div>
        </div>
      </section>
    </Layouts>
  );
};

export default Profile;
