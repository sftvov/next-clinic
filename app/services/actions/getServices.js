'use server';

import Database from 'better-sqlite3';
import path from 'path';

export async function getServices(offset, limit) {
  const db = new Database(path.join(process.cwd(), 'dev.db'));

  const services = db.prepare(`
    SELECT * FROM services
    LIMIT ? OFFSET ?
  `).all(limit, offset);

  db.close();

  return services;
}