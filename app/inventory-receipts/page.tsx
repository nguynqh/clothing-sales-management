"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Plus, Eye, Trash2, TruckIcon } from "lucide-react"
import Link from "next/link"

interface ReceiptItem {
  id: string
  productName: string
  size: string
  costPrice: number
  quantity: number
  total: number
}

interface InventoryReceipt {
  id: string
  receiptDate: string
  items: ReceiptItem[]
  totalAmount: number
  notes: string
}

export default function InventoryReceiptsPage() {
  const [receipts, setReceipts] = useState<InventoryReceipt[]>([
    {
      id: "PN001",
      receiptDate: "2024-01-10",
      items: [
        {
          id: "1",
          productName: "Áo sơ mi trắng",
          size: "M",
          costPrice: 80000,
          quantity: 20,
          total: 1600000,
        },
        {
          id: "2",
          productName: "Váy học sinh",
          size: "S",
          costPrice: 120000,
          quantity: 15,
          total: 1800000,
        },
      ],
      totalAmount: 3400000,
      notes: "Nhập hàng đầu tháng",
    },
    {
      id: "PN002",
      receiptDate: "2024-01-12",
      items: [
        {
          id: "3",
          productName: "Balo học sinh",
          size: "One Size",
          costPrice: 200000,
          quantity: 10,
          total: 2000000,
        },
      ],
      totalAmount: 2000000,
      notes: "",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState<InventoryReceipt | null>(null)
  const [newReceipt, setNewReceipt] = useState<Omit<InventoryReceipt, "id">>({
    receiptDate: new Date().toISOString().split("T")[0],
    items: [],
    totalAmount: 0,
    notes: "",
  })
  const [currentItem, setCurrentItem] = useState<Omit<ReceiptItem, "id" | "total">>({
    productName: "",
    size: "",
    costPrice: 0,
    quantity: 1,
  })

  const products = [
    { name: "Áo sơ mi trắng", sizes: ["S", "M", "L"], costPrice: 80000 },
    { name: "Váy học sinh", sizes: ["S", "M", "L"], costPrice: 120000 },
    { name: "Balo học sinh", sizes: ["One Size"], costPrice: 200000 },
    { name: "Quần âu", sizes: ["S", "M", "L", "XL"], costPrice: 100000 },
  ]

  const handleAddItem = () => {
    if (currentItem.productName && currentItem.size && currentItem.quantity > 0) {
      const item: ReceiptItem = {
        ...currentItem,
        id: Date.now().toString(),
        total: currentItem.costPrice * currentItem.quantity,
      }
      const updatedItems = [...newReceipt.items, item]
      const totalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0)

      setNewReceipt({
        ...newReceipt,
        items: updatedItems,
        totalAmount,
      })

      setCurrentItem({
        productName: "",
        size: "",
        costPrice: 0,
        quantity: 1,
      })
    }
  }

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = newReceipt.items.filter((item) => item.id !== itemId)
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0)

    setNewReceipt({
      ...newReceipt,
      items: updatedItems,
      totalAmount,
    })
  }

  const handleProductChange = (productName: string) => {
    const product = products.find((p) => p.name === productName)
    setCurrentItem({
      ...currentItem,
      productName,
      costPrice: product?.costPrice || 0,
      size: "",
    })
  }

  const handleSaveReceipt = () => {
    if (newReceipt.items.length > 0) {
      const receipt: InventoryReceipt = {
        ...newReceipt,
        id: `PN${String(receipts.length + 1).padStart(3, "0")}`,
      }
      setReceipts([receipt, ...receipts])
      setNewReceipt({
        receiptDate: new Date().toISOString().split("T")[0],
        items: [],
        totalAmount: 0,
        notes: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleViewReceipt = (receipt: InventoryReceipt) => {
    setSelectedReceipt(receipt)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-orange-600 text-white p-4 flex items-center">
        <Link href="/">
          <ArrowLeft className="h-6 w-6 mr-3" />
        </Link>
        <h1 className="text-xl font-bold">Phiếu nhập hàng</h1>
      </div>

      {/* Add Button */}
      <div className="p-4">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Tạo phiếu nhập mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tạo phiếu nhập mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="receiptDate">Ngày nhập</Label>
                <Input
                  id="receiptDate"
                  type="date"
                  value={newReceipt.receiptDate}
                  onChange={(e) => setNewReceipt({ ...newReceipt, receiptDate: e.target.value })}
                />
              </div>

              {/* Add Item Section */}
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Thêm sản phẩm</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Sản phẩm</Label>
                    <Select value={currentItem.productName} onValueChange={handleProductChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn sản phẩm" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.name} value={product.name}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {currentItem.productName && (
                    <div>
                      <Label>Size</Label>
                      <Select
                        value={currentItem.size}
                        onValueChange={(value) => setCurrentItem({ ...currentItem, size: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn size" />
                        </SelectTrigger>
                        <SelectContent>
                          {products
                            .find((p) => p.name === currentItem.productName)
                            ?.sizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Giá nhập</Label>
                      <Input
                        type="number"
                        value={currentItem.costPrice}
                        onChange={(e) => setCurrentItem({ ...currentItem, costPrice: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label>Số lượng</Label>
                      <Input
                        type="number"
                        value={currentItem.quantity}
                        onChange={(e) => setCurrentItem({ ...currentItem, quantity: Number(e.target.value) })}
                        min="1"
                      />
                    </div>
                  </div>

                  <Button onClick={handleAddItem} className="w-full" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm vào phiếu nhập
                  </Button>
                </div>
              </div>

              {/* Items List */}
              {newReceipt.items.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Danh sách sản phẩm</h4>
                  <div className="space-y-2">
                    {newReceipt.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-600">
                            {item.size} - {item.quantity} x {item.costPrice.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">{item.total.toLocaleString("vi-VN")}đ</p>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)}>
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-2 bg-blue-50 rounded">
                    <p className="font-bold text-center">
                      Tổng cộng: {newReceipt.totalAmount.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  value={newReceipt.notes}
                  onChange={(e) => setNewReceipt({ ...newReceipt, notes: e.target.value })}
                  placeholder="Ghi chú thêm..."
                  rows={3}
                />
              </div>

              <Button onClick={handleSaveReceipt} className="w-full" disabled={newReceipt.items.length === 0}>
                <TruckIcon className="h-4 w-4 mr-2" />
                Lưu phiếu nhập
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Receipts List */}
      <div className="p-4 space-y-3">
        {receipts.map((receipt) => (
          <Card key={receipt.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">#{receipt.id}</h3>
                  <p className="text-sm text-gray-600">{receipt.receiptDate}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleViewReceipt(receipt)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 mb-3">
                {receipt.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.productName} ({item.size}) x{item.quantity}
                    </span>
                    <span>{item.total.toLocaleString("vi-VN")}đ</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Tổng tiền nhập:</span>
                  <span className="font-bold text-lg text-blue-600">
                    {receipt.totalAmount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              {receipt.notes && (
                <div className="mt-3 p-2 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">{receipt.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {receipts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Chưa có phiếu nhập nào</p>
          </div>
        )}
      </div>

      {/* View Receipt Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết phiếu nhập #{selectedReceipt?.id}</DialogTitle>
          </DialogHeader>
          {selectedReceipt && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Ngày nhập: {selectedReceipt.receiptDate}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Danh sách sản phẩm:</h4>
                <div className="space-y-2">
                  {selectedReceipt.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-gray-600">
                          Size: {item.size} | SL: {item.quantity} | Giá nhập: {item.costPrice.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.total.toLocaleString("vi-VN")}đ</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Tổng tiền nhập:</span>
                  <span className="font-bold text-lg text-blue-600">
                    {selectedReceipt.totalAmount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              {selectedReceipt.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Ghi chú:</h4>
                  <p className="text-sm text-gray-600 p-2 bg-gray-50 rounded">{selectedReceipt.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
