export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getDb, DatabaseHelper } from '@/lib/db';
import { ApiResponse } from '@/lib/types/database';

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const helper = new DatabaseHelper(db);
    
    // Get total products
    const [{ totalProducts }] = await helper.executeQuery<{ totalProducts: number }>(
      'SELECT COUNT(*) as totalProducts FROM Product'
    );

    // Get total inventory value
    const [{ totalInventoryValue }] = await helper.executeQuery<{ totalInventoryValue: number }>(
      'SELECT SUM(SoLuongTonKho * GiaNhap) as totalInventoryValue FROM Product'
    );

    // Get total sales this month
    const [{ totalSalesThisMonth }] = await helper.executeQuery<{ totalSalesThisMonth: number }>(
      `SELECT COALESCE(SUM(TongTien), 0) as totalSalesThisMonth 
       FROM SalesOrder 
       WHERE strftime('%Y-%m', NgayBan) = strftime('%Y-%m', 'now')`
    );

    // Get low stock products (less than 10)
    const lowStockProducts = await helper.executeQuery(
      'SELECT ProductID, TenSanPham, Size, SoLuongTonKho FROM Product WHERE SoLuongTonKho < 10 ORDER BY SoLuongTonKho ASC'
    );

    // Get recent sales orders
    const recentSales = await helper.executeQuery(
      `SELECT so.SalesOrderID, so.TenHoaDon, so.NgayBan, so.TongTien,
              COUNT(sod.SalesOrderDetailID) as TotalItems
       FROM SalesOrder so
       LEFT JOIN SalesOrderDetail sod ON so.SalesOrderID = sod.SalesOrderID
       GROUP BY so.SalesOrderID
       ORDER BY so.NgayBan DESC, so.SalesOrderID DESC
       LIMIT 5`
    );

    // Get top selling products
    const topProducts = await helper.executeQuery(
      `SELECT p.ProductID, p.TenSanPham, p.Size, p.SoLuongBanDuoc, p.GiaBan
       FROM Product p
       WHERE p.SoLuongBanDuoc > 0
       ORDER BY p.SoLuongBanDuoc DESC
       LIMIT 5`
    );

    const response: ApiResponse<{
      totalProducts: number;
      totalInventoryValue: number;
      totalSalesThisMonth: number;
      lowStockProducts: any[];
      recentSales: any[];
      topProducts: any[];
    }> = {
      success: true,
      data: {
        totalProducts,
        totalInventoryValue: totalInventoryValue || 0,
        totalSalesThisMonth: totalSalesThisMonth || 0,
        lowStockProducts,
        recentSales,
        topProducts
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(response, { status: 500 });
  }
}