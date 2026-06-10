CREATE TABLE IF NOT EXISTS tags (
  id     SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS articles (
  id          SERIAL PRIMARY KEY,
  url         TEXT NOT NULL UNIQUE,
  titulo      TEXT NOT NULL,
  descripcion TEXT,
  imagen      TEXT,
  tag_id      INTEGER REFERENCES tags(id) ON DELETE SET NULL,
  creado_en   TIMESTAMP DEFAULT NOW()
);