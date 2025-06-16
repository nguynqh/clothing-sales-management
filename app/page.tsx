"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, DollarSign, ShoppingCart, TruckIcon, Warehouse, Settings, Plus, Menu, X } from "lucide-react"

const menuItems = [
  { id: "products", label: "Sản phẩm", icon: Package, color: "bg-blue-500" },
  { id: "pricing", label: "Đơn giá", icon: DollarSign, color: "bg-green-500" },
  { id: "sales", label: "Đơn bán hàng", icon: ShoppingCart, color: "bg-purple-500" },
  { id: "imports", label: "Nhập hàng", icon: TruckIcon, color: "bg-orange-500" },
  { id: "inventory", label: "Kho tổng quan", icon: Warehouse, color: "bg-red-500" },
  { id: "settings", label: "Cài đặt", icon: Settings, color: "bg-gray-500" },
]

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const renderContent = () => {
    switch (activeMenu) {
      case "products":
        return <ProductsPage />
      case "pricing":
        return <PricingPage />
      case "sales":
        return <SalesPage />
      case "imports":
        return <ImportsPage />
      case "inventory":
        return <InventoryPage />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Quản lý bán hàng</h1>
          </div>
          <Badge variant="secondary" className="text-xs">
            v1.0
          </Badge>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-20 lg:w-64
        `}
        >
          <nav className="p-4 space-y-2 mt-16 md:mt-4">
            <Button
              variant={activeMenu === "home" ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => {
                setActiveMenu("home")
                setIsMenuOpen(false)
              }}
            >
              <Package className="h-5 w-5" />
              <span className="md:hidden lg:inline">Trang chủ</span>
            </Button>

            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeMenu === item.id ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => {
                  setActiveMenu(item.id)
                  setIsMenuOpen(false)
                }}
              >
                <item.icon className="h-5 w-5" />
                <span className="md:hidden lg:inline">{item.label}</span>
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">{renderContent()}</main>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setIsMenuOpen(false)} />
      )}
    </div>
  )
}

// Dashboard Home Component
function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Tổng quan</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg">{item.label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">Quản lý {item.label.toLowerCase()} của cửa hàng</p>
              <Button size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Thêm mới
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thống kê nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Sản phẩm</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Đơn hàng</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0₫</div>
              <div className="text-sm text-gray-600">Doanh thu</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-sm text-gray-600">Tồn kho</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Products Page Component
function ProductsPage() {
  const [products, setProducts] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm sản phẩm
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Thêm sản phẩm mới</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm onClose={() => setShowAddForm(false)} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!</div>
          ) : (
            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {product.category} - Size {product.size}
                      </p>
                      <p className="text-sm font-medium text-green-600">{product.price}₫</p>
                    </div>
                    <Badge variant="outline">Tồn: {product.stock}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Product Form Component
function ProductForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    size: "",
    price: "",
    stock: "",
    notes: "",
  })

  const categories = ["Quần", "Áo", "Váy học sinh", "Đồ thể dục", "Cặp sách", "Balo"]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Save product logic here
    console.log("Product saved:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Loại mặt hàng</label>
        <select
          className="w-full p-2 border rounded-md"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Chọn loại</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Size</label>
        <select
          className="w-full p-2 border rounded-md"
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          required
        >
          <option value="">Chọn size</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Giá bán lẻ (₫)</label>
        <input
          type="number"
          className="w-full p-2 border rounded-md"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Số lượng tồn kho</label>
        <input
          type="number"
          className="w-full p-2 border rounded-md"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ghi chú</label>
        <textarea
          className="w-full p-2 border rounded-md"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1">
          Lưu
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
      </div>
    </form>
  )
}

// Pricing Page Component
function PricingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý đơn giá</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm đơn giá
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bảng giá theo loại và size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">Chưa có dữ liệu đơn giá. Hãy thêm đơn giá đầu tiên!</div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sales Page Component
function SalesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Đơn bán hàng</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tạo hóa đơn
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách hóa đơn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">Chưa có hóa đơn nào. Hãy tạo hóa đơn đầu tiên!</div>
        </CardContent>
      </Card>
    </div>
  )
}

// Imports Page Component
function ImportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Phiếu nhập hàng</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tạo phiếu nhập
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách phiếu nhập</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">Chưa có phiếu nhập nào. Hãy tạo phiếu nhập đầu tiên!</div>
        </CardContent>
      </Card>
    </div>
  )
}

// Inventory Page Component
function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Kho tổng quan</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tổng nhập</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600">sản phẩm</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Đã bán</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-600">sản phẩm</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tồn kho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">0</div>
            <div className="text-sm text-gray-600">sản phẩm</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chi tiết tồn kho</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            Chưa có dữ liệu tồn kho. Hãy thêm sản phẩm và phiếu nhập!
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Settings Page Component
function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Cài đặt</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quản lý trường dữ liệu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Loại mặt hàng</h3>
              <div className="flex flex-wrap gap-2">
                {["Quần", "Áo", "Váy học sinh", "Đồ thể dục", "Cặp sách", "Balo"].map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
              <Button size="sm" className="mt-2">
                <Plus className="h-3 w-3 mr-1" />
                Thêm loại
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <Badge key={size} variant="secondary">
                    {size}
                  </Badge>
                ))}
              </div>
              <Button size="sm" className="mt-2">
                <Plus className="h-3 w-3 mr-1" />
                Thêm size
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
