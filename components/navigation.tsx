"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, Calculator, ShoppingCart, TruckIcon, BarChart3 } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Trang chủ" },
    { href: "/products", icon: Package, label: "Sản phẩm" },
    { href: "/pricing", icon: Calculator, label: "Đơn giá" },
    { href: "/sales", icon: ShoppingCart, label: "Bán hàng" },
    { href: "/inventory-receipts", icon: TruckIcon, label: "Nhập hàng" },
    { href: "/inventory-overview", icon: BarChart3, label: "Kho" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
