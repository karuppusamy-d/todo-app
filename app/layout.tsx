import Navbar from "@/components/Navbar";
import "./globals.css";
import { siteConfig } from "@/components/config/site.config";
import { Metadata } from "next";
import { AuthProvider } from "@/components/contexts/useAuthContext";
import Footer from "@/components/Footer";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${siteConfig.fontSans.variable} bg-white text-black antialiased dark:bg-black dark:text-white`}
      >
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
