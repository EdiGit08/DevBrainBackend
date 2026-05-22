CREATE TABLE IF NOT EXISTS articles (
  id          SERIAL PRIMARY KEY,
  url         TEXT NOT NULL UNIQUE,
  titulo      TEXT NOT NULL,
  descripcion TEXT,
  imagen      TEXT,
  creado_en   TIMESTAMP DEFAULT NOW()
);