import { Cancel } from "@mui/icons-material";
import React from "react";

type Props = {
  title?: string;
  url: string;
  close: () => void;
};

const VideoPlayer = ({ title, url, close }: Props) => {
  return (
    <section className="w-full backdrop-blur-sm z-[9999] fixed top-0 left-0 h-full ">
      <div className=" relative z-50 p-4  bg-white dark:bg-gray-900 flex w-full items-center   border border-emerald-200/20 justify-between">
        <h3 className="text-black dark:text-white text-lg font-medium">
          {title}
        </h3>
        <span
          className="cursor-pointer"
          onClick={() => {
            close();
          }}
        >
          <Cancel className="text-red-500" />
        </span>
      </div>
      <div className="w-full h-full bg-gray-900 pb-16 ">
        <iframe
          src={url}
          frameBorder="0"
          allowFullScreen
          className="h-full w-full relative z-50 "
        ></iframe>
      </div>
    </section>
  );
};

export default VideoPlayer;
