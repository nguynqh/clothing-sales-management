// pages/api/products/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getDb, DatabaseHelper } from '@/lib/db';
import { Product, ApiResponse, CreateProductRequest } from '@/lib/types/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<any>>
) {
  const { id } = req.query;
  const productId = parseInt(id as string);

  if (req.method === 'GET') {
    try {
      const db = getDb();
      const helper = new DatabaseHelper(db);
      
      const query = 'SELECT * FROM Product WHERE ProductID = ?';
      const products = await helper.executeQuery<Product>(query, [productId]);
      
      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: products[0]
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  if (req.method === 'PUT') {
    try {
      const db = getDb();
      const helper = new DatabaseHelper(db);
      const body: Partial<CreateProductRequest> = req.body;
      
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
        return res.status(400).json({
          success: false,
          error: 'No fields to update'
        });
      }
      
      const query = `UPDATE Product SET ${updates.join(', ')} WHERE ProductID = ?`;
      values.push(productId);
      
      const changedRows = await helper.executeUpdate(query, values);
      
      if (changedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: { message: 'Product updated successfully' }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const db = getDb();
      const helper = new DatabaseHelper(db);
      
      const query = 'DELETE FROM Product WHERE ProductID = ?';
      const changedRows = await helper.executeUpdate(query, [productId]);
      
      if (changedRows === 0) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: { message: 'Product deleted successfully' }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} not allowed`
  });
}