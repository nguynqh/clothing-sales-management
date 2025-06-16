"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Plus, Minus, Trash2, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface OrderItem {
  id: string
  productId: string
  name: string
  size: string
  price: number
  quantity: number
  total: number
}

export default function NewSalesOrderPage() {
  const [orderData, setOrderData] = useState({
    orderId: `DH${String(Date.now()).slice(-6)}`,
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedSize, setSelectedSize] = useState("")

  // Mock data - trong thực tế sẽ lấy từ database
  const availableProducts = [
    { id: "SP001", name: "Áo sơ mi trắng", sizes: ["S", "M", "L"], prices: { S: 320000, M: 350000, L: 380000 } },
    { id: "SP002", name: "Quần jean nam", sizes: ["M", "L", "XL"], prices: { M: 420000, L: 450000, XL: 480000 } },
    { id: "SP003", name: "Váy học sinh", sizes: ["S", "M"], prices: { S: 280000, M: 300000 } },
    { id: "SP004", name: "Đồ thể dục", sizes: ["S", "M", "L"], prices: { S: 180000, M: 200000, L: 220000 } },
    { id: "SP005", name: "Cặp sách da", sizes: ["Lớn"], prices: { Lớn: 650000 } },
    { id: "SP006", name: "Balo thể thao", sizes: ["Vừa", "Lớn"], prices: { Vừa: 380000, Lớn: 420000 } },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const addProductToOrder = () => {
    if (!selectedProduct || !selectedSize) return

    const product = availableProducts.find((p) => p.id === selectedProduct)
    if (!product) return

    const price = product.prices[selectedSize as keyof typeof product.prices]
    const existingItemIndex = orderItems.findIndex(
      (item) => item.productId === selectedProduct && item.size === selectedSize,
    )

    if (existingItemIndex >= 0) {
      // Nếu sản phẩm đã có, tăng số lượng
      updateQuantity(existingItemIndex, orderItems[existingItemIndex].quantity + 1)
    } else {
      // Thêm sản phẩm mới
      const newItem: OrderItem = {
        id: `${selectedProduct}-${selectedSize}-${Date.now()}`,
        productId: selectedProduct,
        name: product.name,
        size: selectedSize,
        price: price,
        quantity: 1,
        total: price,
      }
      setOrderItems([...orderItems, newItem])
    }

    setSelectedProduct("")
    setSelectedSize("")
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(index)
      return
    }

    const updatedItems = [...orderItems]
    updatedItems[index].quantity = newQuantity
    updatedItems[index].total = updatedItems[index].price * newQuantity
    setOrderItems(updatedItems)
  }

  const removeItem = (index: number) => {
    const updatedItems = orderItems.filter((_, i) => i !== index)
    setOrderItems(updatedItems)
  }

  const getTotalAmount = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderItems.length === 0) {
      alert("Vui lòng thêm ít nhất một sản phẩm vào đơn hàng")
      return
    }

    const orderToSubmit = {
      ...orderData,
      items: orderItems,
      totalAmount: getTotalAmount(),
    }

    console.log("Đơn hàng mới:", orderToSubmit)
    // Xử lý lưu đơn hàng ở đây
    alert("Đơn hàng đã được tạo thành công!")
  }

  const selectedProductData = availableProducts.find((p) => p.id === selectedProduct)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/sales">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tạo đơn bán hàng</h1>
              <p className="text-sm text-gray-600">Tạo hóa đơn bán hàng mới</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Thông tin đơn hàng</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderId">Mã hóa đơn</Label>
                  <Input
                    id="orderId"
                    value={orderData.orderId}
                    onChange={(e) => setOrderData((prev) => ({ ...prev, orderId: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Ngày bán</Label>
                  <Input
                    id="date"
                    type="date"
                    value={orderData.date}
                    onChange={(e) => setOrderData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Product */}
          <Card>
            <CardHeader>
              <CardTitle>Thêm sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Chọn sản phẩm</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn sản phẩm..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} ({product.id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProductData && (
                  <div className="space-y-2">
                    <Label>Chọn size</Label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn size..." />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedProductData.sizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            Size {size} -{" "}
                            {formatPrice(selectedProductData.prices[size as keyof typeof selectedProductData.prices])}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={addProductToOrder}
                  disabled={!selectedProduct || !selectedSize}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm vào đơn hàng
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          {orderItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Danh sách sản phẩm ({orderItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orderItems.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Badge variant="outline">Size {item.size}</Badge>
                          <span>{formatPrice(item.price)}</span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">{formatPrice(item.total)}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="border-t pt-3 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Tổng cộng:</span>
                    <span className="text-2xl font-bold text-green-600">{formatPrice(getTotalAmount())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
                  value={orderData.notes}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button type="submit" className="w-full" size="lg" disabled={orderItems.length === 0}>
              <Save className="h-4 w-4 mr-2" />
              Lưu đơn hàng ({formatPrice(getTotalAmount())})
            </Button>
            <Link href="/sales" className="block">
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
