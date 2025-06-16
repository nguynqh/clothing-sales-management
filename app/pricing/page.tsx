"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface PriceItem {
  id: string
  category: string
  size: string
  retailPrice: number
  costPrice: number
  notes: string
}

export default function PricingPage() {
  const [priceItems, setPriceItems] = useState<PriceItem[]>([
    {
      id: "1",
      category: "Áo",
      size: "S",
      retailPrice: 150000,
      costPrice: 80000,
      notes: "Áo sơ mi cotton",
    },
    {
      id: "2",
      category: "Áo",
      size: "M",
      retailPrice: 160000,
      costPrice: 85000,
      notes: "Áo sơ mi cotton",
    },
    {
      id: "3",
      category: "Váy",
      size: "S",
      retailPrice: 200000,
      costPrice: 120000,
      notes: "Váy học sinh",
    },
    {
      id: "4",
      category: "Balo",
      size: "One Size",
      retailPrice: 350000,
      costPrice: 200000,
      notes: "Balo chống thấm",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPriceItem, setNewPriceItem] = useState<Omit<PriceItem, "id">>({
    category: "",
    size: "",
    retailPrice: 0,
    costPrice: 0,
    notes: "",
  })

  const categories = ["Áo", "Quần", "Váy", "Đồ thể dục", "Cặp sách", "Balo", "Phụ kiện"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]

  const handleAddPriceItem = () => {
    if (newPriceItem.category && newPriceItem.size) {
      const priceItem: PriceItem = {
        ...newPriceItem,
        id: Date.now().toString(),
      }
      setPriceItems([...priceItems, priceItem])
      setNewPriceItem({
        category: "",
        size: "",
        retailPrice: 0,
        costPrice: 0,
        notes: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeletePriceItem = (id: string) => {
    setPriceItems(priceItems.filter((p) => p.id !== id))
  }

  const calculateProfit = (retailPrice: number, costPrice: number) => {
    return retailPrice - costPrice
  }

  const calculateProfitMargin = (retailPrice: number, costPrice: number) => {
    if (retailPrice === 0) return 0
    return ((retailPrice - costPrice) / retailPrice) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center">
        <Link href="/">
          <ArrowLeft className="h-6 w-6 mr-3" />
        </Link>
        <h1 className="text-xl font-bold">Quản lý đơn giá</h1>
      </div>

      {/* Add Button */}
      <div className="p-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Thêm đơn giá mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Thêm đơn giá mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Loại mặt hàng</Label>
                <Select
                  value={newPriceItem.category}
                  onValueChange={(value) => setNewPriceItem({ ...newPriceItem, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="size">Size</Label>
                <Select
                  value={newPriceItem.size}
                  onValueChange={(value) => setNewPriceItem({ ...newPriceItem, size: value })}
                >
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
              <div>
                <Label htmlFor="retailPrice">Giá bán lẻ (VNĐ)</Label>
                <Input
                  id="retailPrice"
                  type="number"
                  value={newPriceItem.retailPrice}
                  onChange={(e) => setNewPriceItem({ ...newPriceItem, retailPrice: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="costPrice">Giá nhập (VNĐ)</Label>
                <Input
                  id="costPrice"
                  type="number"
                  value={newPriceItem.costPrice}
                  onChange={(e) => setNewPriceItem({ ...newPriceItem, costPrice: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  value={newPriceItem.notes}
                  onChange={(e) => setNewPriceItem({ ...newPriceItem, notes: e.target.value })}
                  placeholder="Ghi chú thêm..."
                  rows={3}
                />
              </div>
              <Button onClick={handleAddPriceItem} className="w-full">
                Thêm đơn giá
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Price Items List */}
      <div className="p-4 space-y-3">
        {priceItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{item.category}</Badge>
                  <Badge variant="outline">{item.size}</Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeletePriceItem(item.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-600">Giá bán lẻ</p>
                  <p className="font-semibold text-green-600">{item.retailPrice.toLocaleString("vi-VN")}đ</p>
                </div>
                <div>
                  <p className="text-gray-600">Giá nhập</p>
                  <p className="font-semibold text-blue-600">{item.costPrice.toLocaleString("vi-VN")}đ</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-600">Lợi nhuận</p>
                  <p className="font-semibold text-purple-600">
                    {calculateProfit(item.retailPrice, item.costPrice).toLocaleString("vi-VN")}đ
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Tỷ suất lợi nhuận</p>
                  <p className="font-semibold text-orange-600">
                    {calculateProfitMargin(item.retailPrice, item.costPrice).toFixed(1)}%
                  </p>
                </div>
              </div>

              {item.notes && (
                <div className="p-2 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">{item.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {priceItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Chưa có đơn giá nào</p>
          </div>
        )}
      </div>
    </div>
  )
}
