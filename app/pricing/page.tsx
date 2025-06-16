"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, DollarSign } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const pricing = [
    { category: "Áo", size: "M", retailPrice: 350000, importPrice: 200000, margin: 75.0 },
    { category: "Quần", size: "L", retailPrice: 450000, importPrice: 270000, margin: 66.7 },
    { category: "Váy", size: "S", retailPrice: 280000, importPrice: 150000, margin: 86.7 },
  ]

  const filteredPricing = pricing.filter((item) => item.category.toLowerCase().includes(searchTerm.toLowerCase()))

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded">
              ←
            </Link>
            <h1 className="text-xl font-bold">Quản lý đơn giá</h1>
          </div>
          <Link href="/pricing/new">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Thêm
            </Button>
          </Link>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo loại hoặc size..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing List */}
        <div className="space-y-3">
          {filteredPricing.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold">
                      {item.category} - Size {item.size}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        Giá bán: <span className="text-green-600 font-medium">{formatPrice(item.retailPrice)}</span>
                      </div>
                      <div>
                        Giá nhập: <span className="text-blue-600 font-medium">{formatPrice(item.importPrice)}</span>
                      </div>
                      <div>
                        Lợi nhuận: <span className="text-purple-600 font-medium">{item.margin}%</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="ml-4">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPricing.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy dữ liệu giá</h3>
              <p className="text-gray-600 mb-4">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
              <Link href="/pricing/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm đơn giá mới
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
