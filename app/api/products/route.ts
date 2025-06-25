// export const dynamic = "force-static"
import { NextRequest, NextResponse } from 'next/server';
import { getDb, DatabaseHelper } from '@/lib/db';
import { Product, CreateProductRequest, ApiResponse } from '@/lib/types/database';

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const helper = new DatabaseHelper(db);
    
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM Product';
    let params: any[] = [];

    if (search) {
      query += ' WHERE TenSanPham LIKE ? OR Size LIKE ?';
      params = [`%${search}%`, `%${search}%`];
    }

    query += ' ORDER BY ProductID DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const products = await helper.executeQuery<Product>(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM Product';
    let countParams: any[] = [];
    if (search) {
      countQuery += ' WHERE TenSanPham LIKE ? OR Size LIKE ?';
      countParams = [`%${search}%`, `%${search}%`];
    }

    const [{ total }] = await helper.executeQuery<{ total: number }>(countQuery, countParams);

    const response: ApiResponse<{ products: Product[]; total: number; page: number; limit: number }> = {
      success: true,
      data: {
        products,
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
    
    const body: CreateProductRequest = await request.json();
    
    const query = `
      INSERT INTO Product (TenSanPham, Size, SoLuongTonKho, SoLuongBanDuoc, GiaNhap, GiaBan, GhiChu)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      body.TenSanPham,
      body.Size,
      body.SoLuongTonKho || 0,
      body.SoLuongBanDuoc || 0,
      body.GiaNhap || 0,
      body.GiaBan || 0,
      body.GhiChu || null
    ];

    const productId = await helper.executeInsert(query, params);

    const response: ApiResponse<{ productId: number }> = {
      success: true,
      data: { productId }
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json(response, { status: 500 });
  }
}