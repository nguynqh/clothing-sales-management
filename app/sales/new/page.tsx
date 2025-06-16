"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Plus, Minus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OrderItem {
  id: string
  name: string
  size: string
  price: number
  quantity: number
  total: number
}

export default function NewSalesOrderPage() {
  const [orderId] = useState(`DH${String(Date.now()).slice(-6)}`)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedSize, setSelectedSize] = useState("")

  const products = [
    { id: "SP001", name: "Áo sơ mi trắng", sizes: ["S", "M", "L"], prices: { S: 320000, M: 350000, L: 380000 } },
    { id: "SP002", name: "Quần jean nam", sizes: ["M", "L"], prices: { M: 420000, L: 450000 } },
    { id: "SP003", name: "Váy học sinh", sizes: ["S", "M"], prices: { S: 280000, M: 300000 } },
  ]

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  const addProduct = () => {
    if (!selectedProduct || !selectedSize) return

    const product = products.find((p) => p.id === selectedProduct)
    if (!product) return

    const price = product.prices[selectedSize as keyof typeof product.prices]
    const newItem: OrderItem = {
      id: `${selectedProduct}-${selectedSize}-${Date.now()}`,
      name: product.name,
      size: selectedSize,
      price: price,
      quantity: 1,
      total: price,
    }
    setOrderItems([...orderItems, newItem])
    setSelectedProduct("")
    setSelectedSize("")
  }

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems(orderItems.filter((_, i) => i !== index))
      return
    }
    const updatedItems = [...orderItems]
    updatedItems[index].quantity = newQuantity
    updatedItems[index].total = updatedItems[index].price * newQuantity
    setOrderItems(updatedItems)
  }

  const getTotalAmount = () => orderItems.reduce((sum, item) => sum + item.total, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderItems.length === 0) {
      alert("Vui lòng thêm sản phẩm")
      return
    }
    console.log("Order:", { orderId, items: orderItems, total: getTotalAmount() })
    alert("Đơn hàng đã được tạo!")
  }

  const selectedProductData = products.find((p) => p.id === selectedProduct)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center space-x-3 p-4">
          <Link href="/sales">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Tạo đơn hàng</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Label>Mã đơn hàng</Label>
                <Input value={orderId} disabled />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Thêm sản phẩm</h3>

              <div className="space-y-3">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn sản phẩm..." />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedProductData && (
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
                )}

                <Button
                  type="button"
                  onClick={addProduct}
                  disabled={!selectedProduct || !selectedSize}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm vào đơn
                </Button>
              </div>
            </CardContent>
          </Card>

          {orderItems.length > 0 && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold">Sản phẩm ({orderItems.length})</h3>
                {orderItems.map((item, index) => (
                  <div key={item.id} className="border rounded p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          Size {item.size} - {formatPrice(item.price)}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setOrderItems(orderItems.filter((_, i) => i !== index))}
                        className="text-red-600"
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
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="font-semibold">{formatPrice(item.total)}</div>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-medium">Tổng:</span>
                  <span className="text-2xl font-bold text-green-600">{formatPrice(getTotalAmount())}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <Button type="submit" className="w-full" size="lg" disabled={orderItems.length === 0}>
              <Save className="h-4 w-4 mr-2" />
              Lưu đơn hàng
            </Button>
            <Link href="/sales" className="block">
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
