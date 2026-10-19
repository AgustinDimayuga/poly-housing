# Poly Housing API

FastAPI + SQLAlchemy 2 + Alembic, backed by Supabase Postgres.
Dependencies are managed with [uv](https://docs.astral.sh/uv/).

## Layout

```
backend/
  app/
    main.py        FastAPI app; all routes live under /api
    config.py      settings loaded from backend/.env
    db.py          engine, session, Base, DbSession dependency
    models.py      SQLAlchemy tables
    routers/       one module per resource (add with api.include_router)
  alembic/         migrations (versions/ is committed)
  alembic.ini
```

## Setup

```bash
cd backend
cp .env.example .env   # defaults to the local Docker database
docker compose up -d   # start local Postgres on localhost:5433
uv sync
uv run alembic upgrade head
uv run fastapi dev app/main.py   # http://127.0.0.1:8000/docs
```

From the repo root you can use `pnpm dev:api` and
`pnpm db:migrate` instead. Run `pnpm dev` alongside it; Next.js
proxies `/api/*` to the backend (override the target with
`BACKEND_URL`).

### Local database (Docker)

`docker-compose.yml` runs Postgres 17 on `localhost:5433` with
user/password/db all set to `polyhousing`; data persists in the
`pgdata` volume.

```bash
docker compose up -d        # start  (pnpm db:up)
docker compose stop         # stop, keep data (pnpm db:down)
docker compose down -v      # delete the container AND all data
docker compose exec db psql -U polyhousing -d polyhousing   # SQL shell
```

### Supabase connection string

Supabase dashboard → **Connect** → use the **Session pooler**
(port 5432) or **Direct connection** URI, and change the scheme
to `postgresql+psycopg://`. URL-encode special characters in the
password. Never commit `.env`.

## Migrations

After changing `app/models.py`:

```bash
uv run alembic revision --autogenerate -m "add favorites table"
# review the generated file in alembic/versions/, then
uv run alembic upgrade head
```

Autogenerate only looks at the `public` schema, so Supabase's
`auth`/`storage` schemas are left alone. Always read the
generated migration before applying it.
