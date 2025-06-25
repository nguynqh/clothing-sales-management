export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getDb, DatabaseHelper } from '@/lib/db';
import { SalesOrder, CreateSalesOrderRequest, ApiResponse } from '@/lib/types/database';

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const helper = new DatabaseHelper(db);
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const query = `
      SELECT 
        so.*,
        COUNT(sod.SalesOrderDetailID) as TotalItems,
        SUM(sod.ThanhTien) as TotalAmount
      FROM SalesOrder so
      LEFT JOIN SalesOrderDetail sod ON so.SalesOrderID = sod.SalesOrderID
      GROUP BY so.SalesOrderID
      ORDER BY so.NgayBan DESC, so.SalesOrderID DESC
      LIMIT ? OFFSET ?
    `;

    const orders = await helper.executeQuery(query, [limit, offset]);

    // Get total count
    const [{ total }] = await helper.executeQuery<{ total: number }>('SELECT COUNT(*) as total FROM SalesOrder');

    const response: ApiResponse<{ orders: any[]; total: number; page: number; limit: number }> = {
      success: true,
      data: {
        orders,
        total,
        page,
        limit
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

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    const helper = new DatabaseHelper(db);
    
    const body: CreateSalesOrderRequest = await request.json();
    
    await helper.beginTransaction();
    
    try {
      // Calculate total amount
      const totalAmount = body.details.reduce((sum, detail) => {
        return sum + (detail.SoLuongBan * detail.GiaBan);
      }, 0);

      // Insert sales order
      const insertOrderQuery = `
        INSERT INTO SalesOrder (TenHoaDon, NgayBan, TongTien, GhiChu)
        VALUES (?, ?, ?, ?)
      `;
      
      const orderId = await helper.executeInsert(insertOrderQuery, [
        body.TenHoaDon || null,
        body.NgayBan,
        totalAmount,
        body.GhiChu || null
      ]);

      // Insert order details and update product inventory
      for (const detail of body.details) {
        // Check if product has enough inventory
        const [product] = await helper.executeQuery<{ SoLuongTonKho: number }>(
          'SELECT SoLuongTonKho FROM Product WHERE ProductID = ?',
          [detail.ProductID]
        );

        if (!product || product.SoLuongTonKho < detail.SoLuongBan) {
          throw new Error(`Not enough inventory for product ID ${detail.ProductID}`);
        }

        // Insert order detail
        const insertDetailQuery = `
          INSERT INTO SalesOrderDetail (SalesOrderID, ProductID, SoLuongBan, GiaBan)
          VALUES (?, ?, ?, ?)
        `;
        
        await helper.executeInsert(insertDetailQuery, [
          orderId,
          detail.ProductID,
          detail.SoLuongBan,
          detail.GiaBan
        ]);

        // Update product inventory and sales count
        const updateProductQuery = `
          UPDATE Product 
          SET SoLuongTonKho = SoLuongTonKho - ?, 
              SoLuongBanDuoc = SoLuongBanDuoc + ?,
              GiaBan = ?
          WHERE ProductID = ?
        `;
        
        await helper.executeUpdate(updateProductQuery, [
          detail.SoLuongBan,
          detail.SoLuongBan,
          detail.GiaBan,
          detail.ProductID
        ]);
      }

      await helper.commitTransaction();

      const response: ApiResponse<{ orderId: number }> = {
        success: true,
        data: { orderId }
      };

      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      await helper.rollbackTransaction();
      throw error;
    }
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(response, { status: 500 });
  }
}