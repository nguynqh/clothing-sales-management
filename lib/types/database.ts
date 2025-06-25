export interface Product {
  ProductID: number;
  TenSanPham: string;
  Size: string;
  SoLuongTonKho: number;
  SoLuongBanDuoc: number;
  GiaNhap: number;
  GiaBan: number;
  GhiChu?: string;
}

export interface ImportOrder {
  ImportOrderID: number;
  NgayNhap: string; // ISO date string
  GhiChu?: string;
}

export interface ImportOrderDetail {
  ImportOrderDetailID: number;
  ImportOrderID: number;
  ProductID: number;
  SoLuongNhap: number;
  GiaNhap: number;
  ThanhTien: number; // Computed field
}

export interface SalesOrder {
  SalesOrderID: number;
  TenHoaDon?: string;
  NgayBan: string; // ISO date string
  TongTien?: number;
  GhiChu?: string;
}

export interface SalesOrderDetail {
  SalesOrderDetailID: number;
  SalesOrderID: number;
  ProductID: number;
  SoLuongBan: number;
  GiaBan: number;
  ThanhTien: number; // Computed field
}

// Request/Response types
export interface CreateProductRequest {
  TenSanPham: string;
  Size: string;
  SoLuongTonKho?: number;
  SoLuongBanDuoc?: number;
  GiaNhap?: number;
  GiaBan?: number;
  GhiChu?: string;
}

export interface CreateImportOrderRequest {
  NgayNhap: string;
  GhiChu?: string;
  details: {
    ProductID: number;
    SoLuongNhap: number;
    GiaNhap: number;
  }[];
}

export interface CreateSalesOrderRequest {
  TenHoaDon?: string;
  NgayBan: string;
  GhiChu?: string;
  details: {
    ProductID: number;
    SoLuongBan: number;
    GiaBan: number;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}