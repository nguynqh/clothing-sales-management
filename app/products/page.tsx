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
import { ArrowLeft, Plus, Search, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: string
  size: string
  retailPrice: number
  stock: number
  notes: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Áo sơ mi trắng",
      category: "Áo",
      size: "M",
      retailPrice: 150000,
      stock: 25,
      notes: "Chất liệu cotton cao cấp",
    },
    {
      id: "2",
      name: "Váy học sinh",
      category: "Váy",
      size: "S",
      retailPrice: 200000,
      stock: 15,
      notes: "Màu xanh navy",
    },
    {
      id: "3",
      name: "Balo học sinh",
      category: "Balo",
      size: "One Size",
      retailPrice: 350000,
      stock: 8,
      notes: "Chống thấm nước",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    size: "",
    retailPrice: 0,
    stock: 0,
    notes: "",
  })

  const categories = ["Áo", "Quần", "Váy", "Đồ thể dục", "Cặp sách", "Balo", "Phụ kiện"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.size) {
      const product: Product = {
        ...newProduct,
        id: Date.now().toString(),
      }
      setProducts([...products, product])
      setNewProduct({
        name: "",
        category: "",
        size: "",
        retailPrice: 0,
        stock: 0,
        notes: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <Link href="/">
          <ArrowLeft className="h-6 w-6 mr-3" />
        </Link>
        <h1 className="text-xl font-bold">Quản lý sản phẩm</h1>
      </div>

      {/* Search and Add */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Thêm sản phẩm mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              <div>
                <Label htmlFor="category">Loại mặt hàng</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
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
                  value={newProduct.size}
                  onValueChange={(value) => setNewProduct({ ...newProduct, size: value })}
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
                <Label htmlFor="price">Giá bán lẻ (VNĐ)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.retailPrice}
                  onChange={(e) => setNewProduct({ ...newProduct, retailPrice: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="stock">Số lượng tồn kho</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  value={newProduct.notes}
                  onChange={(e) => setNewProduct({ ...newProduct, notes: e.target.value })}
                  placeholder="Ghi chú thêm..."
                  rows={3}
                />
              </div>
              <Button onClick={handleAddProduct} className="w-full">
                Thêm sản phẩm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products List */}
      <div className="p-4 space-y-3">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary">{product.category}</Badge>
                    <Badge variant="outline">{product.size}</Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Giá bán lẻ</p>
                  <p className="font-semibold text-green-600">{product.retailPrice.toLocaleString("vi-VN")}đ</p>
                </div>
                <div>
                  <p className="text-gray-600">Tồn kho</p>
                  <p
                    className={`font-semibold ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-orange-600" : "text-red-600"}`}
                  >
                    {product.stock} sản phẩm
                  </p>
                </div>
              </div>

              {product.notes && (
                <div className="mt-3 p-2 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">{product.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
          </div>
        )}
      </div>
    </div>
  )
}
