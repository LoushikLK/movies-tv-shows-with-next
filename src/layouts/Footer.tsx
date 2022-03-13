import { GitHub, Language, LinkedIn, Twitter } from "@mui/icons-material";
import React from "react";

const Footer = () => {
  const socialLinks = [
    {
      name: "Github",
      icons: <GitHub />,
      url: "https://github.com/LoushikLK",
    },
    {
      name: "Twitter",
      icons: <Twitter />,
      url: "https://twitter.com/LoushikGiri1",
    },
    {
      name: "LinkedIn",
      icons: <LinkedIn />,
      url: "https://twitter.com/LoushikGiri1",
    },
    {
      name: "LinkedIn",
      icons: <Language />,
      url: "https://lkcodes.netlify.app/",
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900">
      <section className="my-container py-8 flex gap-4 flex-col items-center ">
        <h3 className="text-lg text-teal-500 ">Follow Me On Social Media</h3>

        <div className="flex flex-row items-center gap-4">
          {socialLinks.map(({ name, icons, url }, index) => {
            return (
              <span className="flex items-center justify-center " key={index}>
                <a href={url} className="text-teal-500 hover:text-teal-700">
                  {icons}
                </a>
              </span>
            );
          })}
        </div>

        <div className="flex items-center">
          <p className="text-teal-500">
            &copy; {new Date().getFullYear()} Loushik. All rights reserved.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
