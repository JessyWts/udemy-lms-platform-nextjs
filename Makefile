# Docker

start_postgres:
	docker compose up -d

stop_postgres:
	docker compose down

# Prisma

db_generate:
	 npx prisma generate

db_push: # push schema to DB
	 npx prisma db push

db_pull: # rescue from DB
	 npx prisma db pull
	 
migratereset: # reset all datas and tables
	 npx prisma migrate reset

.PHONY: start_postgres stop_postgres db_generate db_push db_pull migratereset