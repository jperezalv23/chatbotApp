import { db } from './db'; // your mysql2 pool connection

export const initializeDatabase = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id_message INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        sender ENUM('user', 'bot') NOT NULL,
        timestamps DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabla messages creada.');
  } catch (error) {
    console.error(error);
  }
};
