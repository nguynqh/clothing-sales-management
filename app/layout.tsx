import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quản Lý Bán Hàng Quần Áo",
  description: "Ứng dụng quản lý bán hàng quần áo cho điện thoại",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <main className="pb-20">{children}</main>
        <Navigation />
      </body>
    </html>
  )
}
