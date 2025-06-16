"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Search, Filter, Edit, Trash2, Package } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const products = [
    {
      id: "SP001",
      name: "Áo sơ mi trắng",
      category: "Áo",
      size: "M",
      retailPrice: 350000,
      stock: 25,
      notes: "Chất liệu cotton cao cấp",
    },
    {
      id: "SP002",
      name: "Quần jean nam",
      category: "Quần",
      size: "L",
      retailPrice: 450000,
      stock: 15,
      notes: "",
    },
    {
      id: "SP003",
      name: "Váy học sinh",
      category: "Váy",
      size: "S",
      retailPrice: 280000,
      stock: 30,
      notes: "Màu xanh navy",
    },
    {
      id: "SP004",
      name: "Đồ thể dục",
      category: "Đồ thể dục",
      size: "M",
      retailPrice: 200000,
      stock: 8,
      notes: "Bộ đồ thể dục học sinh",
    },
    {
      id: "SP005",
      name: "Cặp sách da",
      category: "Cặp sách",
      size: "Lớn",
      retailPrice: 650000,
      stock: 12,
      notes: "Da thật, chống nước",
    },
    {
      id: "SP006",
      name: "Balo thể thao",
      category: "Balo",
      size: "Vừa",
      retailPrice: 380000,
      stock: 20,
      notes: "Nhiều ngăn tiện lợi",
    },
  ]

  const categories = ["all", "Áo", "Quần", "Váy", "Đồ thể dục", "Cặp sách", "Balo"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Hết hàng", variant: "destructive" as const }
    if (stock < 10) return { label: "Sắp hết", variant: "secondary" as const }
    return { label: "Còn hàng", variant: "default" as const }
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
              <h1 className="text-xl font-bold text-gray-900">Quản lý sản phẩm</h1>
              <p className="text-sm text-gray-600">{filteredProducts.length} sản phẩm</p>
            </div>
          </div>
          <Link href="/products/new">
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
                placeholder="Tìm kiếm sản phẩm..."
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

        {/* Products List */}
        <div className="space-y-3">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock)
            return (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{product.id}</span>
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                        <div>
                          Size: <span className="font-medium">{product.size}</span>
                        </div>
                        <div>
                          Giá: <span className="font-medium text-green-600">{formatPrice(product.retailPrice)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm">Tồn kho:</span>
                        <span className="font-medium">{product.stock}</span>
                        <Badge variant={stockStatus.variant} className="text-xs">
                          {stockStatus.label}
                        </Badge>
                      </div>
                      {product.notes && <p className="text-sm text-gray-500 italic">{product.notes}</p>}
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-600 mb-4">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
              <Link href="/products/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm sản phẩm mới
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
