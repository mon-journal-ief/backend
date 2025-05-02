# Prisma Deno Demo

This package demos the use of Prisma 6.6.0's ESM output with Deno.

It requires a special version of [`@prisma/client`](https://www.npmjs.com/package/@axiia/prisma-client-denofix). Changes I applied to the official backend is documented [in this issue](https://github.com/prisma/prisma/issues/26843), but of course you shall not trust me and create your own modified package instead.

We do not use Deno to do Prisma generation or schema management. Instead, we install Prisma into the `prisma/` folder via pnpm. We only use the generated client in Deno.

To get started, you need to first add an `.env` file to `prisma/`:

```
DATABASE_URL="postgresql://xxx@localhost:5432/test"
```

Then, run the following Deno tasks:

```
# This installs prisma via pnpm
deno task prisma:init
# This performs prisma db push which automatically calls prisma generate
deno task prisma:sync
# This runs the demo script
deno task demo
```
