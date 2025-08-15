.PHONY: init-db dev kill migrate npm

DB_USER = admin
DB_NAME = assignment
DB_PASS = root
SQL_FILE = ./db/init.sql

npm:
	cd frontend && npm install

init-db:
	docker compose up -d postgresdb postgres-client

kill:
	docker compose down

dev:
	docker compose up --build -d postgresdb backend frontend

migrate: init-db
	@until docker compose exec -T postgres-client pg_isready -h postgresdb -U $(DB_USER); do sleep 1; done
	docker compose exec postgres-client mkdir -p /sql
	docker cp $(SQL_FILE) postgres-client:/sql/init.sql
	docker compose exec -e PGPASSWORD=$(DB_PASS) -T postgres-client psql -h postgresdb -U $(DB_USER) -d $(DB_NAME) -f /sql/init.sql
	docker compose down

