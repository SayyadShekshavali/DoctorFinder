import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Find General Physicians | Doctor Listings",
  description:
    "Search and filter top General Physicians near you. View doctor profiles, fees, experience, and locations.",
  keywords: [
    "doctor",
    "general physician",
    "internal medicine",
    "health",
    "online consultation",
    "appointment",
  ],
  authors: [{ name: "Your Name or Brand" }],
  openGraph: {
    title: "Find General Physicians | Doctor Listings",
    description: "Search and filter top General Physicians near you.",
    url: "https://your-deployed-url.com",
    images: [
      {
        url: "https://your-deployed-url.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Doctor Listings",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
