-- PostgreSQL Schema for Prokateka Rental Platform

CREATE TABLE IF NOT EXISTS branches (
  id VARCHAR(50) PRIMARY KEY,
  name_ru VARCHAR(255) NOT NULL,
  name_kz VARCHAR(255) NOT NULL,
  address_ru VARCHAR(255) NOT NULL,
  address_kz VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  schedule VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  tier VARCHAR(20) NOT NULL CHECK (tier IN ('tool', 'equipment', 'heavy')),
  name_ru VARCHAR(255) NOT NULL,
  name_kz VARCHAR(255) NOT NULL,
  icon VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS equipment (
  id VARCHAR(100) PRIMARY KEY,
  category_id VARCHAR(50) REFERENCES categories(id),
  branch_id VARCHAR(50) REFERENCES branches(id),
  tier VARCHAR(20) NOT NULL CHECK (tier IN ('tool', 'equipment', 'heavy')),
  name_ru VARCHAR(255) NOT NULL,
  name_kz VARCHAR(255) NOT NULL,
  power_type VARCHAR(50) DEFAULT '220v',
  image VARCHAR(500) NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  price_day INT NOT NULL,
  price_shift INT,
  deposit INT NOT NULL DEFAULT 0,
  in_stock BOOLEAN DEFAULT TRUE,
  stock_count INT DEFAULT 1,
  popular BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  operator_included BOOLEAN DEFAULT FALSE,
  specs JSONB DEFAULT '[]'::jsonb,
  description_ru TEXT,
  description_kz TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accessories (
  id VARCHAR(100) PRIMARY KEY,
  equipment_id VARCHAR(100) REFERENCES equipment(id) ON DELETE CASCADE,
  name_ru VARCHAR(255) NOT NULL,
  name_kz VARCHAR(255) NOT NULL,
  price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  equipment_id VARCHAR(100) REFERENCES equipment(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  days_count INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  delivery_type VARCHAR(20) NOT NULL CHECK (delivery_type IN ('pickup', 'delivery')),
  delivery_address TEXT,
  total_price INT NOT NULL,
  deposit_amount INT NOT NULL,
  with_operator BOOLEAN DEFAULT FALSE,
  status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
