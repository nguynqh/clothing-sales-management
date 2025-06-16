"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, TruckIcon, BarChart3, Plus, Shirt, Calculator } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold text-center">Quản Lý Bán Hàng Quần Áo</h1>
      </div>

      {/* Quick Stats */}
      <div className="p-4 grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-gray-600">Sản phẩm</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">23</p>
            <p className="text-sm text-gray-600">Đơn hàng hôm nay</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Menu */}
      <div className="p-4 space-y-3">
        <Link href="/products">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shirt className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Quản lý sản phẩm</h3>
                  <p className="text-sm text-gray-600">Thêm, sửa, xóa sản phẩm</p>
                </div>
              </div>
              <Plus className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/pricing">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calculator className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">Quản lý đơn giá</h3>
                  <p className="text-sm text-gray-600">Cập nhật giá theo loại & size</p>
                </div>
              </div>
              <Plus className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/sales">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
                <div>
                  <h3 className="font-semibold">Đơn bán hàng</h3>
                  <p className="text-sm text-gray-600">Tạo hóa đơn bán hàng</p>
                </div>
              </div>
              <Plus className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/inventory-receipts">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TruckIcon className="h-6 w-6 text-orange-600" />
                <div>
                  <h3 className="font-semibold">Phiếu nhập hàng</h3>
                  <p className="text-sm text-gray-600">Quản lý nhập kho</p>
                </div>
              </div>
              <Plus className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/inventory-overview">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold">Kho tổng quan</h3>
                  <p className="text-sm text-gray-600">Tình trạng tồn kho</p>
                </div>
              </div>
              <Plus className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Bán áo sơ mi trắng</p>
                <p className="text-sm text-gray-600">2 phút trước</p>
              </div>
              <span className="text-green-600 font-semibold">+150,000đ</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Nhập váy học sinh</p>
                <p className="text-sm text-gray-600">1 giờ trước</p>
              </div>
              <span className="text-blue-600 font-semibold">+20 sản phẩm</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Cập nhật giá balo</p>
                <p className="text-sm text-gray-600">3 giờ trước</p>
              </div>
              <span className="text-orange-600 font-semibold">Đã cập nhật</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
