FROM node:20

WORKDIR /app

# Instalar herramientas de cliente de PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

COPY package*.json ./

RUN npm install

COPY . .

COPY hospital_appointment_schema.sql /app/
COPY wait-for-postgres.sh /app/
RUN chmod +x /app/wait-for-postgres.sh

EXPOSE 3000

CMD ["sh", "-c", "/app/wait-for-postgres.sh $DB_HOST node setupDb.js && npm start"]
