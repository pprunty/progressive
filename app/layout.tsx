import "./globals.css"
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { themeEffect } from "@/components/theme-effect"
import config from "@/app/config"
import { doge } from "./doge"
import { Header } from "./header"
import Footer from "./footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "transparent",
}

export const metadata: Metadata = {
  title: `${config.companyName}`,
  description: `${config.companyDescription}`,
  keywords: [],
  manifest: process.env.NODE_ENV === "production" ? "/manifest.prod.json" : "/manifest.json",
  openGraph: {
    title: `${config.companyName}`,
    description: `${config.companyDescription}`,
    url: config.url,
    siteName: config.companyName,
    images: [
      {
        url: `${config.url}/icon.webp`,
        alt: ``,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: config.socials.twitter,
    creator: config.socials.twitter,
    images: [
      {
        url: `${config.url}/icon.webp`,
        alt: `${config.companyName}`,
      },
    ],
  },
  icons: {
    icon: [{ url: "/icons/192x192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/180x180.png", sizes: "180x180", type: "image/png" }],
  },
  metadataBase: new URL(config.url),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
        <link rel="icon" href="/icons/32x32.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="max-w-3xl mx-auto px-4 justify-center sm:px-12 mt-4 sm:mt-8 min-h-screen">
          <Header />
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}

