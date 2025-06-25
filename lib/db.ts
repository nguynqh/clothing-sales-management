import { D1Database } from '@cloudflare/workers-types';

// Cloudflare D1 database instance will be available in runtime
declare global {
  const DB: D1Database;
}

export function getDb(): D1Database {
  if (typeof DB === 'undefined') {
    throw new Error('Database not available. Make sure you are running in Cloudflare environment.');
  }
  return DB;
}

// Database helper functions
export class DatabaseHelper {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async executeQuery<T = any>(query: string, params?: any[]): Promise<T[]> {
    try {
      const result = await this.db.prepare(query).bind(...(params || [])).all();
      return result.results as T[];
    } catch (error) {
      console.error('Database query error:', error);
      throw new Error(`Database query failed: ${error}`);
    }
  }

  async executeInsert(query: string, params?: any[]): Promise<number> {
    try {
      const result = await this.db.prepare(query).bind(...(params || [])).run();
      return result.meta.last_row_id || 0;
    } catch (error) {
      console.error('Database insert error:', error);
      throw new Error(`Database insert failed: ${error}`);
    }
  }

  async executeUpdate(query: string, params?: any[]): Promise<number> {
    try {
      const result = await this.db.prepare(query).bind(...(params || [])).run();
      return result.meta.changes || 0;
    } catch (error) {
      console.error('Database update error:', error);
      throw new Error(`Database update failed: ${error}`);
    }
  }

  async beginTransaction(): Promise<void> {
    await this.db.exec('BEGIN TRANSACTION');
  }

  async commitTransaction(): Promise<void> {
    await this.db.exec('COMMIT');
  }

  async rollbackTransaction(): Promise<void> {
    await this.db.exec('ROLLBACK');
  }
}