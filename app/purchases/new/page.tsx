"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Plus } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PurchaseItem {
  id: string
  productName: string
  size: string
  importPrice: number
  quantity: number
  total: number
}

export default function NewPurchaseOrderPage() {
  const [purchaseId] = useState(`NH${String(Date.now()).slice(-6)}`)
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([])
  const [newItem, setNewItem] = useState({
    productName: "",
    size: "",
    importPrice: "",
    quantity: "1",
  })

  const products = ["Áo sơ mi trắng", "Quần jean nam", "Váy học sinh", "Đồ thể dục", "Cặp sách", "Balo"]
  const sizes = ["S", "M", "L", "XL", "Vừa", "Lớn"]

  const formatPrice = (price: number) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

  const addItem = () => {
    if (!newItem.productName || !newItem.size || !newItem.importPrice) {
      alert("Vui lòng điền đầy đủ thông tin")
      return
    }

    const price = Number.parseInt(newItem.importPrice.replace(/\D/g, ""))
    const quantity = Number.parseInt(newItem.quantity)

    const item: PurchaseItem = {
      id: `${Date.now()}-${Math.random()}`,
      productName: newItem.productName,
      size: newItem.size,
      importPrice: price,
      quantity: quantity,
      total: price * quantity,
    }

    setPurchaseItems([...purchaseItems, item])
    setNewItem({ productName: "", size: "", importPrice: "", quantity: "1" })
  }

  const getTotalAmount = () => purchaseItems.reduce((sum, item) => sum + item.total, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (purchaseItems.length === 0) {
      alert("Vui lòng thêm sản phẩm")
      return
    }
    console.log("Purchase:", { purchaseId, items: purchaseItems, total: getTotalAmount() })
    alert("Phiếu nhập đã được tạo!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center space-x-3 p-4">
          <Link href="/purchases">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Tạo phiếu nhập</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Label>Mã phiếu nhập</Label>
                <Input value={purchaseId} disabled />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Thêm sản phẩm</h3>

              <div className="space-y-3">
                <Select
                  value={newItem.productName}
                  onValueChange={(value) => setNewItem((prev) => ({ ...prev, productName: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn sản phẩm..." />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product} value={product}>
                        {product}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={newItem.size}
                    onValueChange={(value) => setNewItem((prev) => ({ ...prev, size: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Size..." />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    placeholder="Số lượng"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem((prev) => ({ ...prev, quantity: e.target.value }))}
                  />
                </div>

                <Input
                  placeholder="Giá nhập (VNĐ)"
                  value={newItem.importPrice}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, importPrice: e.target.value.replace(/\D/g, "") }))}
                />

                <Button type="button" onClick={addItem} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm vào phiếu
                </Button>
              </div>
            </CardContent>
          </Card>

          {purchaseItems.length > 0 && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold">Sản phẩm nhập ({purchaseItems.length})</h3>
                {purchaseItems.map((item) => (
                  <div key={item.id} className="border rounded p-3 bg-gray-50">
                    <div className="font-medium">{item.productName}</div>
                    <div className="text-sm text-gray-600">
                      Size {item.size} - SL: {item.quantity} - Giá: {formatPrice(item.importPrice)}
                    </div>
                    <div className="font-semibold text-blue-600">{formatPrice(item.total)}</div>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-medium">Tổng:</span>
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(getTotalAmount())}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <Button type="submit" className="w-full" size="lg" disabled={purchaseItems.length === 0}>
              <Save className="h-4 w-4 mr-2" />
              Lưu phiếu nhập
            </Button>
            <Link href="/purchases" className="block">
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
