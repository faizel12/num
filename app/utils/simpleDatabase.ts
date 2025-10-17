// app/utils/simpleDatabase.ts
import * as SQLite from 'expo-sqlite';

// Open or create database - NEW SYNTAX
const db = SQLite.openDatabaseSync('simple.db');

// Initialize database - create table if it doesn't exist
export const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );
    `);
    console.log('Table created successfully');
  } catch (error) {
    console.log('Error creating table:', error);
  }
};

// Add a new item
export const addItem = async (name: string): Promise<number> => {
  try {
    const result = db.runSync('INSERT INTO items (name) VALUES (?)', [name]);
    console.log('Item added successfully, ID:', result.lastInsertRowId);
    return result.lastInsertRowId;
  } catch (error) {
    console.log('Error adding item:', error);
    throw error;
  }
};

// Get all items
export const getAllItems = (): any[] => {
  try {
    const result = db.getAllSync('SELECT * FROM items ORDER BY id DESC');
    console.log('Items retrieved:', result);
    return result;
  } catch (error) {
    console.log('Error getting items:', error);
    throw error;
  }
};

// Get item by ID
export const getItemById = (id: number): any => {
  try {
    const result = db.getFirstSync('SELECT * FROM items WHERE id = ?', [id]);
    return result;
  } catch (error) {
    console.log('Error getting item:', error);
    throw error;
  }
};

// Update item
export const updateItem = (id: number, newName: string): void => {
  try {
    db.runSync('UPDATE items SET name = ? WHERE id = ?', [newName, id]);
    console.log('Item updated successfully');
  } catch (error) {
    console.log('Error updating item:', error);
    throw error;
  }
};

// Delete item
export const deleteItem = (id: number): void => {
  try {
    db.runSync('DELETE FROM items WHERE id = ?', [id]);
    console.log('Item deleted successfully');
  } catch (error) {
    console.log('Error deleting item:', error);
    throw error;
  }
};

// Delete all items
export const deleteAllItems = (): void => {
  try {
    db.runSync('DELETE FROM items');
    console.log('All items deleted');
  } catch (error) {
    console.log('Error deleting all items:', error);
    throw error;
  }
};