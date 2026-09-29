   CREATE TABLE IF NOT EXISTS users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE IF NOT EXISTS notes (
     id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
     title VARCHAR(200) NOT NULL,
     content TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );