import { ConflictException, Injectable } from '@nestjs/common';
import { ConnectionPool } from 'mssql';
import { DataSource } from 'typeorm';

import { Product } from './interfaces';

@Injectable()
export class ProductService {
  constructor(private dataSource: DataSource) {}

  private readonly databaseConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

  async create(product: Product) {
    const { code, description } = product;
    let pool;

    try {
      pool = new ConnectionPool(this.databaseConfig);
      await pool.connect();

      const resultByCode = await pool.request().input('CodProd', code).execute('SpSe1Produto');

      const exists = resultByCode.recordset.some(
        (item: any) => item.DescrProd.trim().toLowerCase() === description.trim().toLowerCase(),
      );

      if (exists) {
        throw new ConflictException(
          `Product with code ${code} and name "${description}" already exists.`,
        );
      }

      const resultCreate = await pool
        .request()
        .input('CodProd', code)
        .input('DescrProd', description)
        .execute('SpGrProduto');

      return resultCreate.recordset;
    } finally {
      if (pool && pool.connected) {
        await pool.close();
      }
    }
  }

  async findOne(code: number) {
    let pool;

    try {
      const pool = new ConnectionPool(this.databaseConfig);
      await pool.connect();

      const result = await pool.request().input('CodProd', code).execute('SpSe1Produto');

      if (result.recordset.length === 0) {
        throw new ConflictException(`Product with code ${code} not found.`);
      }

      const [product] = result.recordset;

      return {
        code: product.CodProd,
        description: product.DescrProd,
      };
    } catch (error) {
      throw error;
    } finally {
      if (pool && pool.connected) {
        await pool.close();
      }
    }
  }

  async findAll() {
    const query = `EXEC SpSeProduto`;
    const result = await this.dataSource.query(query);

    const formattedResult = result.map((item: any) => ({
      code: item.CodProd,
      description: item.DescrProd,
    }));

    return formattedResult;
  }

  async remove(code: number) {
    let pool;

    try {
      pool = new ConnectionPool(this.databaseConfig);
      await pool.connect();

      const result = await pool.request().input('id', code).execute('SpExProduto');

      return result.recordset;
    } finally {
      if (pool && pool.connected) {
        await pool.close();
      }
    }
  }
}
