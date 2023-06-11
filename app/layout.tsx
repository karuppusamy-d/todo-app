import { Poppins } from "next/font/google";
import "./globals.css";

const fontSans = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Todo App",
  description:
    "The ultimate todo app that helps you stay organized and accomplish more. With its sleek and user-friendly interface, Todo App allows you to effortlessly create and manage your tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} bg-white text-black antialiased dark:bg-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
