import dotenv from 'dotenv';
import path from 'path';

// TODO: Сделать так, чтобы dotenv работал
const filePath = path.resolve(__dirname, '.env');
dotenv.config({ path: filePath });

export default function getEnv() {
  const port = process.env['PORT'] || 1000;
  const host = process.env['HOST'] || '127.0.0.1';  
  
  if (!process.env['PORT'] || !process.env['HOST']) {
    console.warn(`
      Warning: Environment variables for PORT = ${port} or HOST = ${host} are not set.
      Default values will be used.  
    `);
  }

  return { port, host };
}
