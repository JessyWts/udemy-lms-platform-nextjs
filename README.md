This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Required

- Node.js version "^18.18.0 || ^19.8.0 || >= 20.0.0" is required.
- Docker
- Clerk account [Clerk](https://dashboard.clerk.com/)
- Prisma [docs](https://www.prisma.io/docs/getting-started)
- Uploadthing account https://uploadthing.com/
- Mux account https://www.mux.com - [Mux Api Doc](https://docs.mux.com/)
- Stripe account https://dashboard.stripe.com/

## Getting Started

Create .env file
att root folder create .env

```bash
nano .env

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_APP_URL=http://localhost:3000

DATABASE_URL="postgresql://root:secret@localhost:5432/udemy_clone?sslmode=disable"
DATABASE_NAME=udemy_clone
DATABASE_USER=root
DATABASE_PASSWORD=secret
DATABASE_HOST=localhost
DATABASE_PORT=5432

UPLOADTHING_TOKEN='xxxxxxxxxxxxxxxxx'

MUX_TOKEN_ID=xxxxxxxxxxxxxxxxx
MUX_TOKEN_SECRET=xxxxxxxxxxxxxxxxx

STRIPE_API_KEY=sk_test_XXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxx
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Setup & Commands

### Makefile

start_postgres

```bash
make start_postgres
```

stop_postgres

```bash
make stop_postgres
```

Prisma studio

```bash
make prismastudio
```

db_generate

```bash
make db_generate
```

db_push

```bash
make db_push
```

migratereset

```bash
make migratereset
```

### Prisma Setup

**Install Prisma & prisma client**

```bash
npm install -D prisma

npm i @prisma/client
```

Init prisma folder

```bash
npx prisma init
```

This command reads your Prisma schema and generates your Prisma Client library

```bash
npx prisma generate
```

List prisma models and datas at => http://localhost:5555/

```bash
npx prisma studio
```

**Prisma DB interactions**

Apply prisma/schema.prisma to database

```bash
npx prisma db push
```

Update prisma/schema.prisma from database

```bash
npx prisma db pull
```

**Prisma Migrate**

To apply your Prisma schema changes to your database, use the prisma migrate dev CLI command

```bash
npx prisma migrate dev
```

This command did three things:

It created a new SQL migration file for this migration in the prisma/migrations directory.
It executed the SQL migration file against the database.
It ran prisma generate under the hood (which installed the @prisma/client package and generated a tailored Prisma Client API based on your models).

```bash
npx prisma migrate dev --name "name of migration"
```

create only the migration up change not apply to db

```bash
npx prisma migrate dev --name add_chapter --create-only
```

Skip triggering seed

```bash
npx prisma migrate dev --skip-seed"
```

Reset Database delete all datas and tables and execute
migration/00_init/migration.sql if you have one

```bash
npx prisma migrate reset
```

**Prisma Migrate diff** => [Learn more](https://fig.io/manual/prisma/migrate/diff)

Migration up empty schema model to completed schema model

```bash
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/00_init/migration.sql
```

Migration up to update schema model from database to prisma/schema.prisma

```bash
npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/db_update/migration.sql
```

Migration down - Init - Compare le(s) schema(s) présent dans le fichier prisma/schema.prisma à un schema vide pour créer prisma/migrations/00_init/migration_down.sql

```bash
npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-empty --script > prisma/migrations/00_init/migration_down.sql
```

Exemple Down

```bash
npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma --script > prisma/migrations/01_add_chapter/migration_down.sql
```

### Clerk

Synch data to DB after signup
[Overview](https://clerk.com/docs/webhooks/overview)
[Sync Clerk data to your app with webhooks](https://clerk.com/docs/webhooks/sync-data)

Install ngrok

```bash
brew install ngrok
```

Install in your project svix

```bash
npm install svix
```

Launch comand in terminal domain cleate on ngrok website

```bash
ngrok http --url=handy-amazingly-doe.ngrok-free.app 3000
```

### Stripe

install [Stripe cli](https://stripe.com/docs/stripe-cli)

```bash
brew install stripe/stripe-cli/stripe
```

Login to stripe cli

```bash
stripe login
```

Transfer events to webhook
test webhook with local endpoint
after exec this command you will see

> Ready! You are using Stripe API Version [2024-12-18.acacia]. Your webhook signing secret is whsec_xxxxxxxxxxxxxxxxxxxxxxx
> copy whsec_xxxxxxxxxxxxxxxxxxxxxxx to the .env file

STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxx

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Trigger events

```bash
stripe trigger payment_intent.succeeded
# or
stripe trigger subscription_schedule.canceled
# or
stripe trigger invoice.upcoming
# or
stripe trigger charge.captured
# or
stripe trigger invoice.payment_succeeded
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
