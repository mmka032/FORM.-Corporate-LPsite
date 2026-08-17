import type { Metadata } from "next";
import { Montserrat, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["700"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "FORM.",
  description:
    "ブランドの世界観を大切にしながら、目的に合わせたWebサイトをデザインします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
        lang="ja" 
        className={`${notoSerifJP.variable} ${montserrat.variable} antialiased`}
    >
        {/* md:cursor-none：PC(md:以上)ではCustomCursor.tsxが丸いカーソルを追従表示するため、標準の矢印は消す */}
        <body className="md:cursor-none">
          <CustomCursor />
          {children}
          </body>
    </html>
  );
}