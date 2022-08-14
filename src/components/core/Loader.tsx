import React from "react";
import { LoadingAnimation } from "assets/animations";
import Lottie from "react-lottie";

type Props = {
  title?: string;
  height?: number;
  width?: number;
};

const Loader = ({ title, height = 80, width = 80 }: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Lottie options={defaultOptions} height={height} width={width} />
      <h3 className="font-medium tracking-wide text-center">{title}</h3>
    </div>
  );
};

export default Loader;
