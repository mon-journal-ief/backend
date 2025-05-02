// import { PrismaClient } from "./generated/client/index.js";
// Prisma cannot uses ESM, see https://github.com/prisma/prisma/issues/4816
// This is a workaround, see https://github.com/prisma/prisma/issues/5030#issuecomment-2415199176
import { Application, Router } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import { PrismaClient } from "./generated/prisma/index.ts";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
const app = new Application();
const router = new Router();

/**
 * Setup routes.
 */

router
  .get("/", (context) => {
    context.response.body = "Welcome to the Program API!";
  })
  .get("/program", async (context) => {
    // Get all programs.
    const programs = await prisma.program.findMany();
    context.response.body = programs;
  })
  .get("/program/:id", async (context) => {
    // Get one program by id.
    const { id } = context.params;
    const program = await prisma.program.findUnique({
      where: {
        id: id,
      },
    });
    context.response.body = program;
  })
  .post("/program", async (context) => {
    const body = context.request.body; // Get the body object
  if (body.type() === "json") { // Ensure the body type is JSON
    const { name, description } = await body.json(); // Extract data from the parsed JSON
    const result = await prisma.program.create({
      data: {
        name,
        grade: "CP"
      }
    });
    context.response.body = result; // Respond with the created record
  } else {
    context.response.status = 400; // Bad Request
    context.response.body = { error: "Invalid content type, expected JSON." };
  }
  })
  .delete("/program/:id", async (context) => {
    // Delete a program by id.
    const { id } = context.params;
    const program = await prisma.program.delete({
      where: {
        id: id,
      },
    });
    context.response.body = program;
  });

/**
 * Setup middleware.
 */

app.use(router.routes());
app.use(router.allowedMethods());

/**
 * Start server.
 */

await app.listen({ port: 8000 });