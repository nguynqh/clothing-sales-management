"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Plus, Minus, Trash2, TruckIcon } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface PurchaseItem {
  id: string
  productName: string
  size: string
  importPrice: number
  quantity: number
  total: number
}

export default function NewPurchaseOrderPage() {
  const [purchaseData, setPurchaseData] = useState({
    purchaseId: `NH${String(Date.now()).slice(-6)}`,
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([])
  const [newItem, setNewItem] = useState({
    productName: "",
    size: "",
    importPrice: "",
    quantity: "1",
  })

  // Danh sách sản phẩm có thể nhập
  const productOptions = [
    "Áo sơ mi trắng",
    "Áo sơ mi xanh",
    "Quần jean nam",
    "Quần jean nữ",
    "Váy học sinh",
    "Đồ thể dục nam",
    "Đồ thể dục nữ",
    "Cặp sách da",
    "Cặp sách vải",
    "Balo thể thao",
    "Balo học sinh",
    "Giày thể thao",
    "Dép sandal",
  ]

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "Nhỏ", "Vừa", "Lớn", "Free Size"]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const addItemToPurchase = () => {
    if (!newItem.productName || !newItem.size || !newItem.importPrice || !newItem.quantity) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm")
      return
    }

    const price = Number.parseInt(newItem.importPrice.replace(/\D/g, ""))
    const quantity = Number.parseInt(newItem.quantity)

    if (price <= 0 || quantity <= 0) {
      alert("Giá nhập và số lượng phải lớn hơn 0")
      return
    }

    const item: PurchaseItem = {
      id: `${Date.now()}-${Math.random()}`,
      productName: newItem.productName,
      size: newItem.size,
      importPrice: price,
      quantity: quantity,
      total: price * quantity,
    }

    setPurchaseItems([...purchaseItems, item])
    setNewItem({
      productName: "",
      size: "",
      importPrice: "",
      quantity: "1",
    })
  }

  const updateItemQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(index)
      return
    }

    const updatedItems = [...purchaseItems]
    updatedItems[index].quantity = newQuantity
    updatedItems[index].total = updatedItems[index].importPrice * newQuantity
    setPurchaseItems(updatedItems)
  }

  const updateItemPrice = (index: number, newPrice: number) => {
    if (newPrice < 0) return

    const updatedItems = [...purchaseItems]
    updatedItems[index].importPrice = newPrice
    updatedItems[index].total = newPrice * updatedItems[index].quantity
    setPurchaseItems(updatedItems)
  }

  const removeItem = (index: number) => {
    const updatedItems = purchaseItems.filter((_, i) => i !== index)
    setPurchaseItems(updatedItems)
  }

  const getTotalAmount = () => {
    return purchaseItems.reduce((sum, item) => sum + item.total, 0)
  }

  const getTotalQuantity = () => {
    return purchaseItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (purchaseItems.length === 0) {
      alert("Vui lòng thêm ít nhất một sản phẩm vào phiếu nhập")
      return
    }

    const purchaseToSubmit = {
      ...purchaseData,
      items: purchaseItems,
      totalAmount: getTotalAmount(),
      totalQuantity: getTotalQuantity(),
    }

    console.log("Phiếu nhập mới:", purchaseToSubmit)
    // Xử lý lưu phiếu nhập ở đây
    alert("Phiếu nhập hàng đã được tạo thành công!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Link href="/purchases">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tạo phiếu nhập hàng</h1>
              <p className="text-sm text-gray-600">Tạo phiếu nhập hàng mới</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Purchase Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TruckIcon className="h-5 w-5" />
                <span>Thông tin phiếu nhập</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseId">Mã phiếu nhập</Label>
                  <Input
                    id="purchaseId"
                    value={purchaseData.purchaseId}
                    onChange={(e) => setPurchaseData((prev) => ({ ...prev, purchaseId: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Ngày nhập</Label>
                  <Input
                    id="date"
                    type="date"
                    value={purchaseData.date}
                    onChange={(e) => setPurchaseData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Product */}
          <Card>
            <CardHeader>
              <CardTitle>Thêm sản phẩm nhập</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tên sản phẩm</Label>
                  <Select
                    value={newItem.productName}
                    onValueChange={(value) => setNewItem((prev) => ({ ...prev, productName: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn sản phẩm..." />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptions.map((product) => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Size</Label>
                    <Select
                      value={newItem.size}
                      onValueChange={(value) => setNewItem((prev) => ({ ...prev, size: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn size..." />
                      </SelectTrigger>
                      <SelectContent>
                        {sizeOptions.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Số lượng</Label>
                    <Input
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem((prev) => ({ ...prev, quantity: e.target.value }))}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Đơn giá nhập (VNĐ)</Label>
                  <Input
                    placeholder="0"
                    value={newItem.importPrice}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      setNewItem((prev) => ({ ...prev, importPrice: value }))
                    }}
                  />
                  {newItem.importPrice && (
                    <p className="text-sm text-gray-600">
                      {new Intl.NumberFormat("vi-VN").format(
                        Number.parseInt(newItem.importPrice.replace(/\D/g, "")) || 0,
                      )}{" "}
                      VNĐ
                    </p>
                  )}
                </div>

                <Button type="button" onClick={addItemToPurchase} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm vào phiếu nhập
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Items */}
          {purchaseItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Danh sách sản phẩm nhập ({purchaseItems.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {purchaseItems.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.productName}</h4>
                        <Badge variant="outline" className="mt-1">
                          Size {item.size}
                        </Badge>
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

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <Label className="text-xs text-gray-600">Số lượng</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateItemQuantity(index, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => updateItemQuantity(index, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-600">Đơn giá nhập</Label>
                        <Input
                          type="number"
                          value={item.importPrice}
                          onChange={(e) => updateItemPrice(index, Number.parseInt(e.target.value) || 0)}
                          className="mt-1"
                          min="0"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-gray-600">Thành tiền:</span>
                      <span className="font-semibold text-lg text-blue-600">{formatPrice(item.total)}</span>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div className="border-t pt-3 mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium">Tổng số lượng:</span>
                    <span className="text-lg font-semibold">{getTotalQuantity()} sản phẩm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Tổng tiền nhập:</span>
                    <span className="text-2xl font-bold text-blue-600">{formatPrice(getTotalAmount())}</span>
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
                  placeholder="Ghi chú thêm về phiếu nhập (tùy chọn)"
                  value={purchaseData.notes}
                  onChange={(e) => setPurchaseData((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button type="submit" className="w-full" size="lg" disabled={purchaseItems.length === 0}>
              <Save className="h-4 w-4 mr-2" />
              Lưu phiếu nhập ({formatPrice(getTotalAmount())})
            </Button>
            <Link href="/purchases" className="block">
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
