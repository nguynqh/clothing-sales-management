"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    size: "",
    retailPrice: "",
    stock: "",
    notes: "",
  })

  const categories = ["Áo", "Quần", "Váy", "Đồ thể dục", "Cặp sách", "Balo"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Product data:", formData)
    alert("Sản phẩm đã được thêm!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center space-x-3 p-4">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Thêm sản phẩm</h1>
        </div>
      </header>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên sản phẩm *</Label>
                <Input
                  id="name"
                  placeholder="Nhập tên sản phẩm"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Loại *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Size *</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Giá bán (VNĐ) *</Label>
                  <Input
                    placeholder="0"
                    value={formData.retailPrice}
                    onChange={(e) => handleInputChange("retailPrice", e.target.value.replace(/\D/g, ""))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Số lượng *</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ghi chú</Label>
                <Textarea
                  placeholder="Ghi chú về sản phẩm"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button type="submit" className="w-full" size="lg">
              <Save className="h-4 w-4 mr-2" />
              Lưu sản phẩm
            </Button>
            <Link href="/products" className="block">
              <Button variant="outline" className="w-full" size="lg">
                Hủy
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
