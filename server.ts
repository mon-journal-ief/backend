import { PrismaClient } from "./generated/prisma/index.ts";

const prisma = new PrismaClient();

console.log("Starting key-value operations demo...");

// Define sample data
const scope = "demo";
const key = "sample-key2";
const randomValue = `Random value: ${
  Math.random().toString(36).substring(2, 15)
}`;

console.log(
  `Saving value: "${randomValue}" with key: "${key}" in scope: "${scope}"`,
);

// Convert string to Uint8Array (Bytes in Prisma)
const encoder = new TextEncoder();
const valueBytes = encoder.encode(randomValue);

// Create or update the key-value pair
await prisma.keyValuePairs.upsert({
  where: {
    scope_key: {
      scope,
      key,
    },
  },
  update: {
    value: valueBytes,
  },
  create: {
    scope,
    key,
    value: valueBytes,
  },
});

// Retrieve the saved value
const result = await prisma.keyValuePairs.findUnique({
  where: {
    scope_key: {
      scope,
      key,
    },
  },
});

if (result) {
  // Convert Uint8Array back to string  const decoder = new TextDecoder();
  const retrievedValue = decoder.decode(result.value);

  console.log(
    `Retrieved value: "${retrievedValue}" for key: "${result.key}" in scope: "${result.scope}"`,
  );
} else {
  console.log("No value found");
}
