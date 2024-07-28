#!/bin/sh

# Espera a que PostgreSQL esté listo
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - executing command"

# Ejecuta el script para crear la base de datos y tablas si no existen
node setupDb.js

# Inicia la aplicación
exec node src/index.js
