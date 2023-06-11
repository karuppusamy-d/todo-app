import { Poppins } from "next/font/google";

import { SiteConfig } from "./SiteConfigTypes";

const fontSans = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteConfig: SiteConfig = {
  title: "Todo App",
  url: "https://todo.karuppusamy.me",
  description:
    "The ultimate todo app that helps you stay organized and accomplish more. With its sleek and user-friendly interface, Todo App allows you to effortlessly create and manage your tasks.",
  fontSans: fontSans,
  navbarLogo: "Todo App",
  footer: {
    text: "Todo App",
    link: "/",
  },
  links: {
    email: "d.karuppusamy@outlook.com",
    github: "https://github.com/karuppusamy-d",
    facebook: "https://facebook.com/karuppusamy2001/",
    twitter: "https://twitter.com/karuppusamy_",
    instagram: "https://instagram.com/karuppusamy.d",
    linkedin: "https://linkedin.com/in/karuppusamy",
    youtube: "",
  },
};

export { siteConfig };
