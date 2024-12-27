This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

create a signin page with [Clerk](https://dashboard.clerk.com/)
att root folder create .env

```bash
nano .env

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxx
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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Prisma setup

Install Prisma

```bash
npm install -D prisma

```

Init prisma

```bash
npx prisma init
```

Install prisma client

```bash
npm i @prisma/client
```

This command reads your Prisma schema and generates your Prisma Client library

```bash
npx prisma generate
```

To apply your Prisma schema changes to your database, use the prisma migrate dev CLI command

```bash
npx prisma migrate dev --name "tags-model"
```

Reset

```bash
npx prisma migrate reset
```

[Migrate diff](https://fig.io/manual/prisma/migrate/diff)

```bash

npx prisma migrate diff --from-empty --to-schema-datasource prisma/schema.prisma --script > prisma/migrations/00_init/migration_down.sql
```

```bash
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/00_init/migration_up.sql
```

npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-empty --script > prisma/migrations/00_init/migration_down.sql
