import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Duodu | Technology, Marketing & Operations",
  description: "Christian Kwame Duodu — Technology, Marketing & Operations Professional. Web development, digital systems, SEO, sales and business development, product support and creative content.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
