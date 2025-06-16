"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Search, Filter, Edit, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PricingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const pricingData = [
    {
      id: "P001",
      category: "Áo",
      size: "S",
      retailPrice: 320000,
      importPrice: 180000,
      margin: 77.8,
      notes: "Giá tốt cho mùa hè",
    },
    {
      id: "P002",
      category: "Áo",
      size: "M",
      retailPrice: 350000,
      importPrice: 200000,
      margin: 75.0,
      notes: "",
    },
    {
      id: "P003",
      category: "Áo",
      size: "L",
      retailPrice: 380000,
      importPrice: 220000,
      margin: 72.7,
      notes: "",
    },
    {
      id: "P004",
      category: "Quần",
      size: "M",
      retailPrice: 420000,
      importPrice: 250000,
      margin: 68.0,
      notes: "Chất liệu cao cấp",
    },
    {
      id: "P005",
      category: "Quần",
      size: "L",
      retailPrice: 450000,
      importPrice: 270000,
      margin: 66.7,
      notes: "",
    },
    {
      id: "P006",
      category: "Váy",
      size: "S",
      retailPrice: 280000,
      importPrice: 150000,
      margin: 86.7,
      notes: "Váy học sinh phổ biến",
    },
    {
      id: "P007",
      category: "Cặp sách",
      size: "Lớn",
      retailPrice: 650000,
      importPrice: 400000,
      margin: 62.5,
      notes: "Da thật cao cấp",
    },
    {
      id: "P008",
      category: "Balo",
      size: "Vừa",
      retailPrice: 380000,
      importPrice: 220000,
      margin: 72.7,
      notes: "Thiết kế thể thao",
    },
  ]

  const categories = ["all", "Áo", "Quần", "Váy", "Đồ thể dục", "Cặp sách", "Balo"]

  const filteredPricing = pricingData.filter((item) => {
    const matchesSearch =
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.size.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getMarginStatus = (margin: number) => {
    if (margin >= 80) return { color: "text-green-600", icon: TrendingUp, label: "Cao" }
    if (margin >= 70) return { color: "text-blue-600", icon: TrendingUp, label: "Tốt" }
    if (margin >= 60) return { color: "text-yellow-600", icon: TrendingDown, label: "Trung bình" }
    return { color: "text-red-600", icon: TrendingDown, label: "Thấp" }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Quản lý đơn giá</h1>
              <p className="text-sm text-gray-600">{filteredPricing.length} mục giá</p>
            </div>
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
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Lọc theo loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(filteredPricing.reduce((sum, item) => sum + item.margin, 0) / filteredPricing.length)}%
              </div>
              <div className="text-sm text-gray-600">Lợi nhuận TB</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">
                {formatPrice(filteredPricing.reduce((sum, item) => sum + item.retailPrice, 0) / filteredPricing.length)}
              </div>
              <div className="text-sm text-gray-600">Giá bán TB</div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing List */}
        <div className="space-y-3">
          {filteredPricing.map((item) => {
            const marginStatus = getMarginStatus(item.margin)
            const MarginIcon = marginStatus.icon

            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Size {item.size}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-600">Giá bán lẻ</div>
                          <div className="font-semibold text-lg text-green-600">{formatPrice(item.retailPrice)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Giá nhập</div>
                          <div className="font-semibold text-lg text-blue-600">{formatPrice(item.importPrice)}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-gray-600">Lợi nhuận:</span>
                        <div className={`flex items-center space-x-1 ${marginStatus.color}`}>
                          <MarginIcon className="h-4 w-4" />
                          <span className="font-medium">{item.margin.toFixed(1)}%</span>
                          <Badge variant="outline" className={`text-xs ${marginStatus.color}`}>
                            {marginStatus.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        Lãi:{" "}
                        <span className="font-medium text-green-600">
                          {formatPrice(item.retailPrice - item.importPrice)}
                        </span>
                      </div>

                      {item.notes && <p className="text-sm text-gray-500 italic mt-2">{item.notes}</p>}
                    </div>

                    <Button variant="outline" size="sm" className="ml-4">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
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
