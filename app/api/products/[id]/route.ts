export const dynamic = "force-static"
import { NextRequest, NextResponse } from 'next/server';
import { getDb, DatabaseHelper } from '@/lib/db';
import { Product, ApiResponse, CreateProductRequest } from '@/lib/types/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const db = getDb();
    const helper = new DatabaseHelper(db);
    
    const productId = parseInt(params.id);
    
    const query = 'SELECT * FROM Product WHERE ProductID = ?';
    const products = await helper.executeQuery<Product>(query, [productId]);
    
    if (products.length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: products[0]
    };

    return NextResponse.json({ id, message: 'Product found' }, { status: 200 });
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const db = getDb();
    const helper = new DatabaseHelper(db);
    
    const productId = parseInt(params.id);
    const body: Partial<CreateProductRequest> = await request.json();
    
    const updates: string[] = [];
    const values: any[] = [];
    
    if (body.TenSanPham !== undefined) {
      updates.push('TenSanPham = ?');
      values.push(body.TenSanPham);
    }
    if (body.Size !== undefined) {
      updates.push('Size = ?');
      values.push(body.Size);
    }
    if (body.SoLuongTonKho !== undefined) {
      updates.push('SoLuongTonKho = ?');
      values.push(body.SoLuongTonKho);
    }
    if (body.GiaNhap !== undefined) {
      updates.push('GiaNhap = ?');
      values.push(body.GiaNhap);
    }
    if (body.GiaBan !== undefined) {
      updates.push('GiaBan = ?');
      values.push(body.GiaBan);
    }
    if (body.GhiChu !== undefined) {
      updates.push('GhiChu = ?');
      values.push(body.GhiChu);
    }
    
    if (updates.length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'No fields to update'
      };
      return NextResponse.json(response, { status: 400 });
    }
    
    const query = `UPDATE Product SET ${updates.join(', ')} WHERE ProductID = ?`;
    values.push(productId);
    
    const changedRows = await helper.executeUpdate(query, values);
    
    if (changedRows === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: { message: 'Product updated successfully' }
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const db = getDb();
    const helper = new DatabaseHelper(db);
    
    const productId = parseInt(params.id);
    
    const query = 'DELETE FROM Product WHERE ProductID = ?';
    const changedRows = await helper.executeUpdate(query, [productId]);
    
    if (changedRows === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product not found'
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: { message: 'Product deleted successfully' }
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

export async function generateStaticParams() {
  // Option A: Return empty array nếu không biết trước IDs
  return [];
  
  // Option B: Return một số IDs cố định nếu biết trước
  // return [
  //   { id: '1' },
  //   { id: '2' },
  //   { id: '3' },
  // ];
  
  // Option C: Fetch từ database (nếu có thể trong build time)
  // try {
  //   const products = await getProductsFromDB(); // implement function này
  //   return products.map(product => ({ id: product.id.toString() }));
  // } catch (error) {
  //   return [];
  // }
}