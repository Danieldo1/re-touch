import type { Metadata } from "next";
import { Montserrat,Righteous } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const righteous = Righteous({ subsets: ["latin"],weight: "400",variable: "--font-righteous" });
export const metadata: Metadata = {
  title: "Re-Touch",
  description: "Generate,create and re-imagine your photos in style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#674ea7" } }}>
      <html lang="en">
        <body className={montserrat.className + " " + righteous.variable}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
