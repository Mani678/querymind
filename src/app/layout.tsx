import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "QueryMind — AI Business Analyst",
  description: "Ask your data anything. Get answers, diagnoses, and actions in seconds.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-bg text-primary antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
