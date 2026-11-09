import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Duodu | Development, Digital Systems & Design",
  description: "Christian Kwame Duodu's portfolio: websites, web applications, IT support, digital systems, creative work and research. Based in Kumasi, Ghana.",
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
