export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getDb, DatabaseHelper } from '@/lib/db';
import { ImportOrder, CreateImportOrderRequest, ApiResponse } from '@/lib/types/database';

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
        io.*,
        COUNT(iod.ImportOrderDetailID) as TotalItems,
        SUM(iod.ThanhTien) as TotalAmount
      FROM ImportOrder io
      LEFT JOIN ImportOrderDetail iod ON io.ImportOrderID = iod.ImportOrderID
      GROUP BY io.ImportOrderID
      ORDER BY io.NgayNhap DESC, io.ImportOrderID DESC
      LIMIT ? OFFSET ?
    `;

    const orders = await helper.executeQuery(query, [limit, offset]);

    // Get total count
    const [{ total }] = await helper.executeQuery<{ total: number }>('SELECT COUNT(*) as total FROM ImportOrder');

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
    
    const body: CreateImportOrderRequest = await request.json();
    
    await helper.beginTransaction();
    
    try {
      // Insert import order
      const insertOrderQuery = `
        INSERT INTO ImportOrder (NgayNhap, GhiChu)
        VALUES (?, ?)
      `;
      
      const orderId = await helper.executeInsert(insertOrderQuery, [
        body.NgayNhap,
        body.GhiChu || null
      ]);

      // Insert order details and update product inventory
      for (const detail of body.details) {
        // Insert order detail
        const insertDetailQuery = `
          INSERT INTO ImportOrderDetail (ImportOrderID, ProductID, SoLuongNhap, GiaNhap)
          VALUES (?, ?, ?, ?)
        `;
        
        await helper.executeInsert(insertDetailQuery, [
          orderId,
          detail.ProductID,
          detail.SoLuongNhap,
          detail.GiaNhap
        ]);

        // Update product inventory and purchase price
        const updateProductQuery = `
          UPDATE Product 
          SET SoLuongTonKho = SoLuongTonKho + ?, 
              GiaNhap = ?
          WHERE ProductID = ?
        `;
        
        await helper.executeUpdate(updateProductQuery, [
          detail.SoLuongNhap,
          detail.GiaNhap,
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