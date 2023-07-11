import { Noto_Sans } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans({
  variable: "--font-noto-sans",
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Tugu Agung",
  description: "Price List for Tugu Agung",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${noto.variable} h-full font-sans`}>
      <body className="h-full bg-stone-100">{children}</body>
    </html>
  );
}
