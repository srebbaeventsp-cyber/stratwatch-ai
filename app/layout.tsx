import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";

export const metadata: Metadata = {
  title: "StratWatch AI - Sovereign Intelligence",
  description: "Plateforme de veille stratégique souveraine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* Remplacement de Inter par des classes standard Tailwind/CSS */}
      <body className="font-sans antialiased bg-stw-charcoal text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}