import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Survey Feedback Analysis",
  description: "Local MVP for analysing survey feedback with AI"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
