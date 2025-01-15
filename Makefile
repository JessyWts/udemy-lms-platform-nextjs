# Docker

start_postgres:
	docker compose up -d

stop_postgres:
	docker compose down

# Prisma

prismastudio: #open url to see created models and data
	npx prisma studio

db_generate:
	 npx prisma generate

db_push: # push schema to DB
	 npx prisma db push

db_pull: # rescue from DB
	 npx prisma db pull
	 
migratereset: # reset all datas and tables and use init seed script
	 npx prisma migrate reset

.PHONY: start_postgres stop_postgres prismastudio db_generate db_push db_pull migratereset