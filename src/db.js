import Dexie from "dexie";

// Create a new Dexie database
const db = new Dexie("MyReactAppDatabase");

// Define a version and a table schema
db.version(1).stores({
  items: "++id, name, description", // Primary key and indexed properties
});

export default db;
