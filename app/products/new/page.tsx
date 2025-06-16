"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Package, Upload, X } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    size: "",
    retailPrice: "",
    importPrice: "",
    stock: "",
    notes: "",
    brand: "",
    color: "",
    material: "",
  })

  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const categories = ["Áo", "Quần", "Váy", "Đồ thể dục", "Cặp sách", "Balo", "Giày dép", "Phụ kiện"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Nhỏ", "Vừa", "Lớn", "Free Size"]
  const colors = ["Trắng", "Đen", "Xanh", "Đỏ", "Vàng", "Hồng", "Tím", "Xám", "Nâu", "Cam"]
  const materials = ["Cotton", "Polyester", "Jean", "Kaki", "Linen", "Da", "Vải canvas", "Nylon", "Khác"]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.category || selectedSizes.length === 0) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }

    const productData = {
      ...formData,
      sizes: selectedSizes,
      image: imagePreview,
      createdAt: new Date().toISOString(),
      id: `SP${String(Date.now()).slice(-6)}`,
    }

    console.log("Sản phẩm mới:", productData)
    alert("Sản phẩm đã được thêm thành công!")
    // Redirect back to products page
  }

  const formatPrice = (value: string) => {
    const number = value.replace(/\D/g, "")
    return new Intl.NumberFormat("vi-VN").format(Number.parseInt(number) || 0)
  }

  const calculateMargin = () => {
    const retail = Number.parseInt(formData.retailPrice.replace(/\D/g, "")) || 0
    const import_ = Number.parseInt(formData.importPrice.replace(/\D/g, "")) || 0
    if (retail > 0 && import_ > 0) {
      return (((retail - import_) / retail) * 100).toFixed(1)
    }
    return "0"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/products">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Thêm sản phẩm mới</h1>
              <p className="text-sm text-gray-600">Nhập thông tin sản phẩm chi tiết</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Image */}
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Tải lên hình ảnh sản phẩm</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload">
                    <Button type="button" variant="outline" asChild>
                      <span>Chọn hình ảnh</span>
                    </Button>
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Thông tin cơ bản</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <Label htmlFor="category">Loại mặt hàng *</Label>
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
                  <Label htmlFor="brand">Thương hiệu</Label>
                  <Input
                    id="brand"
                    placeholder="Tên thương hiệu"
                    value={formData.brand}
                    onChange={(e) => handleInputChange("brand", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Màu sắc</Label>
                  <Select value={formData.color} onValueChange={(value) => handleInputChange("color", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn màu" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material">Chất liệu</Label>
                  <Select value={formData.material} onValueChange={(value) => handleInputChange("material", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn chất liệu" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material} value={material}>
                          {material}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sizes */}
          <Card>
            <CardHeader>
              <CardTitle>Size có sẵn *</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSizes.includes(size) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSizeToggle(size)}
                    className="w-full"
                  >
                    {size}
                  </Button>
                ))}
              </div>
              {selectedSizes.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Size đã chọn:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedSizes.map((size) => (
                      <Badge key={size} variant="secondary">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin giá cả</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="importPrice">Giá nhập (VNĐ)</Label>
                  <Input
                    id="importPrice"
                    placeholder="0"
                    value={formData.importPrice}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      handleInputChange("importPrice", value)
                    }}
                  />
                  {formData.importPrice && (
                    <p className="text-sm text-gray-600">{formatPrice(formData.importPrice)} VNĐ</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retailPrice">Giá bán lẻ (VNĐ) *</Label>
                  <Input
                    id="retailPrice"
                    placeholder="0"
                    value={formData.retailPrice}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      handleInputChange("retailPrice", value)
                    }}
                    required
                  />
                  {formData.retailPrice && (
                    <p className="text-sm text-gray-600">{formatPrice(formData.retailPrice)} VNĐ</p>
                  )}
                </div>
              </div>

              {formData.retailPrice && formData.importPrice && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tỷ lệ lợi nhuận:</span>
                    <span className="text-lg font-bold text-green-600">{calculateMargin()}%</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-600">Lãi mỗi sản phẩm:</span>
                    <span className="font-medium text-green-600">
                      {formatPrice(
                        String(
                          (Number.parseInt(formData.retailPrice.replace(/\D/g, "")) || 0) -
                            (Number.parseInt(formData.importPrice.replace(/\D/g, "")) || 0),
                        ),
                      )}{" "}
                      VNĐ
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="stock">Số lượng tồn kho ban đầu</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  min="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú thêm</Label>
                <Textarea
                  id="notes"
                  placeholder="Nhập ghi chú về sản phẩm (tùy chọn)"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button type="submit" className="w-full" size="lg">
              <Save className="h-4 w-4 mr-2" />
              Lưu sản phẩm
            </Button>
            <Link href="/products" className="block">
              <Button variant="outline" className="w-full" size="lg">
                Hủy bỏ
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
