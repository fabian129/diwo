import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Diwo — Digital arbetsplatskonsulter",
  description: "Vi hjälper er att lyckas med den digitala arbetsplatsen. Strategi, teknik och människa i harmoni.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv" className={`${inter.variable} h-full`}>
      <head>
        <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
      </head>
      <body className={`${inter.variable} min-h-full flex flex-col antialiased bg-[#fcfcfc] text-[#0a0a0a] font-[family-name:var(--font-inter)]`}>
        {children}
      </body>
    </html>
  );
}
